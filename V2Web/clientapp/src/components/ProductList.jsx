import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api";

export default function ProductList({onEdit}){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        const data = await getProducts();
        setProducts(data);
    }

    async function handleDelete(id) {
        await deleteProduct(id);
        loadProducts();
    }

    return (
        <div>
            <h2>Liste des produits</h2>
            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        {p.name} - {p.quantity} unités
                        <button onClick={() => onEdit(p)}>Editer</button>
                        <button onClick={() => handleDelete(p.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}