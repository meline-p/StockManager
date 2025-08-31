import {useState} from "react";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct"; 

export default function App() {
  const [editingProduct, setEditingProduct] = useState(null);
  const [refresh, setRefresh] = useState(false);

  function triggerRefresh(){
    setRefresh(!refresh);
    setEditingProduct(null);
  }

  return (
    <div>
      <h1>Stock Manager</h1>
      <AddProduct onAdded={triggerRefresh} />
      <ProductList key={refresh} onEdit={(p) => setEditingProduct(p)} />
        {editingProduct && (
          <UpdateProduct 
            product={editingProduct}
            onUpdated={triggerRefresh}
            onCancel={() => setEditingProduct(null)}
          />
        )}
    </div>
  );
}
