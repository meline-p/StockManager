namespace StockManager
{
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
}