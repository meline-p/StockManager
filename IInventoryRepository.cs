using System.Collections.Generic;

namespace StockManager
{
    public interface IInventoryRepository
    {
        List<Product> GetAll();
        Product GetById(int id);
        Product Add(Product p);
        bool Update(Product p);
        bool Delete(int id);
        void Save();
    }
}