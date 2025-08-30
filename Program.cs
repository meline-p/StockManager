namespace StockManager
{
    class Program
    {
        static void Main(string[] args)
        {
            IInventoryRepository repo = new InMemoryInventoryRepository();

            while (true)
            {
                Console.WriteLine("\n=== Gestion de stock — V1 ===");
                Console.WriteLine("1) Ajouter un produit");
                Console.WriteLine("2) Mettre à jour quantité");
                Console.WriteLine("3) Supprimer un produit");
                Console.WriteLine("4) Lister l'inventaire");
                Console.WriteLine("0) Quitter");
                Console.Write("Choix: ");
                var c = Console.ReadLine();

                switch (c)
                {
                    case "1": AddProduct(repo); break;
                    case "2": UpdateQuantity(repo); break;
                    case "3": DeleteProduct(repo); break;
                    case "4": ListInventory(repo); break;
                    case "0": return;
                    default: Console.WriteLine("Choix inconnu"); break;
                }
            }
        }

        static void AddProduct(IInventoryRepository repo)
        {
            Console.Write("Nom: ");
            var name = Console.ReadLine();

            Console.Write("Description: ");
            var desc = Console.ReadLine();

            Console.Write("Prix unitaire (ex 12.50): ");
            decimal price = ParseDecimalOrDefault(Console.ReadLine(), 0m);

            Console.Write("Quantité: ");
            int qty = ParseIntOrDefault(Console.ReadLine(), 0);

            Console.Write("Seuil d'alerte: ");
            int threshold = ParseIntOrDefault(Console.ReadLine(), 0);

            var p = new Product
            {
                Name = name,
                Description = desc,
                UnitPrice = price,
                Quantity = qty,
                ReorderThreshold = threshold
            };
            repo.Add(p);
            repo.Save();
            Console.WriteLine($"Produit ajouté (Id={p.Id}).");
        }

        static void UpdateQuantity(IInventoryRepository repo)
        {
            Console.Write("Id produit à modifier: ");

            if (!int.TryParse(Console.ReadLine(), out int id))
            {
                Console.WriteLine("Id invalide");
                return;
            }

            var p = repo.GetById(id);

            if (p == null)
            {
                Console.WriteLine("Produit non trouvé");
                return;
            }

            Console.Write($"Quantité actuelle = {p.Quantity}. Nouvelle quantité: ");

            if (!int.TryParse(Console.ReadLine(), out int NewQty))
            {
                Console.WriteLine("Quantité invalide.");
                return;
            }

            p.Quantity = NewQty;

            repo.Update(p);
            repo.Save();

            Console.WriteLine("Quantité mise à jour.");

            if (p.ReorderThreshold > 0 && p.Quantity < p.ReorderThreshold)
            {
                Console.WriteLine($"--- ALERTE: la quantité ({p.Quantity}) est en dessous du seuil ({p.ReorderThreshold}) !");
            }

        }

        static void DeleteProduct(IInventoryRepository repo)
        {
            Console.Write("Id produit à supprimer: ");

            if (!int.TryParse(Console.ReadLine(), out int id))
            {
                Console.WriteLine("Id invalide");
                return;
            }

            if (repo.Delete(id))
            {
                repo.Save();
                Console.WriteLine("Supprimé");
            }
            else
            {
                Console.WriteLine("Produit non trouvé");
            }

        }

        static void ListInventory(IInventoryRepository repo)
        {
            var all = repo.GetAll();

            Console.WriteLine("\nListe des produits:");
            foreach (var p in all)
            {
                Console.WriteLine(p);
            }

            var totalValue = all.Sum(p => p.UnitPrice * p.Quantity);
            Console.WriteLine($"Valeur totale inventaire: {totalValue:C}");

        }

        // helpers
        static decimal ParseDecimalOrDefault(string s, decimal d) => decimal.TryParse(s, out var v) ? v : d;
        static int ParseIntOrDefault(string s, int d) => int.TryParse(s, out var v) ? v : d;
    }

    // modèle
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public int ReorderThreshold { get; set; }
        public override string ToString()
            => $"Id:{Id} | {Name} | Qte:{Quantity} | Prix:{UnitPrice:C} | Seuil:{ReorderThreshold}";
    }

    // interface repository 
    public interface IInventoryRepository
    {
        List<Product> GetAll();
        Product GetById(int id);
        Product Add(Product p);
        bool Update(Product p);
        bool Delete(int id);
        void Save();
    }

    // implémentation en mémoire
    public class InMemoryInventoryRepository : IInventoryRepository
    {
        private readonly List<Product> products = new List<Product>();
        private int nextId = 1;

        public List<Product> GetAll() => products.ToList();

        public Product GetById(int id) => products.FirstOrDefault(p => p.Id == id);

        public Product Add(Product p)
        {
            p.Id = nextId++;
            products.Add(p);
            return p;
        }

        public bool Update(Product p)
        {
            var ex = GetById(p.Id);

            if (ex == null) return false;

            ex.Name = p.Name;
            ex.Description = p.Description;
            ex.UnitPrice = p.UnitPrice;
            ex.Quantity = p.Quantity;
            ex.ReorderThreshold = p.ReorderThreshold;

            return true;
        }
        public bool Delete(int id) => products.RemoveAll(p => p.Id == id) > 0;

        public void Save() { }
    }
}