import { useState } from "react";
import { addProduct } from "../api";
import {FormControl,FormLabel,Input,Button,Stack,Box,Heading, Textarea,} from "@chakra-ui/react";

export default function AddProduct({ onAdded }){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [reorderThreshold, setReorderThreshold] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await addProduct({
            name,
            description,
            quantity: parseInt(quantity),
            unitPrice: parseFloat(unitPrice),
            reorderThreshold: parseInt(reorderThreshold),
            });
            setName("");
            setDescription("");
            setQuantity("");
            setUnitPrice("");
            setReorderThreshold("");
            onAdded();
        } catch (err) {
            console.error(err);
            alert("Impossible d'ajouter le produit !");
        }
    }

    return (
        <Box
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="sm"
            maxW="400px"
            w="100%"
            mb={6}
            mx="auto"
            >
            <Heading as="h2" size="md" mb={4}>
                Ajouter un produit
            </Heading>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                <FormControl isRequired>
                    <FormLabel>Nom</FormLabel>
                    <Input
                    type="text"
                    placeholder="Nom du produit"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ></Textarea>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Quantité</FormLabel>
                    <Input
                    type="number"
                    placeholder="Quantité"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Prix Unitaire (€)</FormLabel>
                    <Input
                    type="number"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Seuil de réapprovisionnement</FormLabel>
                    <Input 
                    type="number"
                    value={reorderThreshold}
                    onChange={(e) => setReorderThreshold(e.target.value)}
                    />
                </FormControl>

                <Button colorScheme="teal" type="submit">
                    Ajouter
                </Button>
                </Stack>
            </form>
        </Box>
    )
}