import { useState, useEffect, use } from "react";    
import { updateProduct } from "../api";
import {FormControl,FormLabel,Input,Button,Stack,Box,Heading, Textarea,} from "@chakra-ui/react";

export default function UpdateProduct({ product, onUpdated, onCancel}){
    const [name, setName] = useState(product?.name || "");
    const [description, setDescription] = useState(product?.description || "");
    const [quantity, setQuantity] = useState(product?.quantity || 0);
    const [unitPrice, setUnitPrice] = useState(product?.unitPrice || 0);
    const [reorderThreshold, setReorderThreshold] = useState(product?.reorderThreshold || 0);

    useEffect(() => {
        setName(product?.name || "");
        setDescription(product?.description || "");
        setQuantity(product?.quantity || 0);
        setUnitPrice(product?.unitPrice || 0);
        setReorderThreshold(product?.reorderThreshold || 0);
    }, [product]);

    async function handleSubmit(e) {
        e.preventDefault();
        await updateProduct(product.id, {
            id: product.id,
            name,
            description,
            quantity,
            unitPrice,
            reorderThreshold
        });
        onUpdated();
    }

    if(!product) return null;

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
                Modifier un produit
            </Heading>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>

                    <FormControl isRequired>
                        <FormLabel>Nom</FormLabel>
                        <Input 
                            type="text"
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
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value === "" ? "" : parseInt(e.target.value))}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Prix Unitaire (€)</FormLabel>
                        <Input
                        type="number"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(e.target.value === "" ? "" : parseFloat(e.target.value))}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Seuil de réapprovisionnement</FormLabel>
                        <Input 
                        type="number"
                        value={reorderThreshold}
                        onChange={(e) => setReorderThreshold(e.target.value === "" ? "" : parseInt(e.target.value))}
                        />
                    </FormControl>

                    <Button colorScheme="teal" type="submit">Mettre à jour</Button>
                    <Button type="button" onClick={onCancel}>Annuler</Button>
                </Stack>
            </form>
        </Box>
    )
}