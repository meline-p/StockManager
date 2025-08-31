import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api";
import {Table,Thead,Tbody,Tr,Th,Td,TableContainer,Button} from "@chakra-ui/react";

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
        <TableContainer mt={4} overflowX="auto">
            <Table variant="striped" colorScheme="teal" width="100%">
                <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Nom</Th>
                    <Th>Description</Th>
                    <Th>Prix Unitaire</Th>
                    <Th>Quantité</Th>
                    <Th>Seuil de Réappro</Th>
                    <Th>Actions</Th>
                </Tr>
                </Thead>
                <Tbody>
                {products.map((p) => (
                    <Tr key={p.id}>
                        <Td>#{p.id}</Td>
                        <Td><strong>{p.name}</strong></Td>
                        <Td>{p.description}</Td>
                        <Td>{p.unitPrice} €</Td>
                        <Td>{p.quantity}</Td>
                        <Td>{p.reorderThreshold}</Td>
                        <Td>
                            <Button size="sm" colorScheme="blue" onClick={() => onEdit(p)}>
                            Editer
                            </Button>
                            <Button
                            size="sm"
                            colorScheme="red"
                            ml={2}
                            onClick={() => handleDelete(p.id)}
                            >
                            Supprimer
                            </Button>
                        </Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}