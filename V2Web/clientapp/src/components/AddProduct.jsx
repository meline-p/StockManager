import { useState } from "react";
import { addProduct } from "../api";

export default function AddProduct({ onAdded }){
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");

    async function handleSubmit(e){
        e.preventDefault();
        await addProduct({name, quantity: parseInt(quantity)});
        setName("");
        setQuantity("");
        onAdded();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Ajouter un produit</h2>
            <input
                type="text"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Quantité"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
            />
            <button type="submit">Ajouter</button>
        </form>
    )
}