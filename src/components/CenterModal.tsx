import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { FC } from "react";

interface CenterModalProps {
  titel: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CenterModal: FC<CenterModalProps> = ({
  isOpen,
  onClose,
  titel,
  children,
}) => {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{titel}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Luk</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
