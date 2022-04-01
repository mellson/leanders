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
import React, { PropsWithChildren } from "react";

interface CenterModalProps {
  titel: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CenterModal({
  isOpen,
  onClose,
  titel,
  children,
}: PropsWithChildren<CenterModalProps>) {
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
}
