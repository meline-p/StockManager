const API_URL = "http://localhost:5260/api/products";

export async function getProducts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erreur lors du chargement des produits");
  return res.json();
}

export async function addProduct(product) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function updateProduct(id, product) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Erreur lors de la mise à jour du produit");
}

export async function deleteProduct(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
