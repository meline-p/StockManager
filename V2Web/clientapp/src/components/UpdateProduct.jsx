import { useState, useEffect } from "react";    
import { updateProduct } from "../api";

export default function UpdateProduct({ product, onUpdated, onCancel}){
    const [name, setName] = useState(product?.name || "");
    const [quantity, setQuantity] = useState(product?.quantity || 0);

    useEffect(() => {
        setName(product?.name || "");
        setQuantity(product?.quantity || 0);
    }, [product]);

    async function handleSubmit(e) {
        e.preventDefault();
        await updateProduct(product.id, {
            id: product.id,
            name,
            quantity
        });
        onUpdated();
    }

    if(!product) return null;

    return (
        <form onSubmit={handleSubmit}>
            <h2>Modifier le produit</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value === "" ? "" : parseInt(e.target.value))}
                required
            />
            <button type="submit">Mettre à jour</button>
            <button type="button" onClick={onCancel}>Annuler</button>
        </form>
    )
}