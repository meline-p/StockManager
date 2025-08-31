import { useState } from "react";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import {Box,Heading,VStack,Button,useDisclosure,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter,} from "@chakra-ui/react";

export default function App() {
  const [editingProduct, setEditingProduct] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // Modal AddProduct
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  // Modal UpdateProduct
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();

  function triggerRefresh() {
    setRefresh(!refresh);
    setEditingProduct(null);
  }

  function handleAdded() {
    triggerRefresh();
    onAddClose();
  }

  function handleEdit(product) {
    setEditingProduct(product);
    onUpdateOpen();
  }

  return (
    <Box p={6} mx="auto">
      <Heading mb={6} textAlign="center">
        Stock Manager
      </Heading>
      <VStack spacing={6} align="stretch">
        <Button colorScheme="teal" onClick={onAddOpen} w="fit-content" mx="auto">
          Ajouter un produit
        </Button>

        {/* Modal pour AddProduct */}
        <Modal isOpen={isAddOpen} onClose={onAddClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Ajouter un produit</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AddProduct onAdded={handleAdded} />
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Modal pour UpdateProduct */}
        <Modal isOpen={isUpdateOpen} onClose={onUpdateClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modifier un produit</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UpdateProduct
                product={editingProduct}
                onUpdated={() => {
                  triggerRefresh();
                  onUpdateClose();
                }}
                onCancel={onUpdateClose}
              />
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Liste des produits */}
        <ProductList key={refresh} onEdit={handleEdit} />
      </VStack>
    </Box>
  );
}