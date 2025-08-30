using System.Collections.Generic;
using System.Linq;

namespace StockManager
{
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