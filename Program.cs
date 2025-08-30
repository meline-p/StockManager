using System;

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
            }
        }
    }
}
