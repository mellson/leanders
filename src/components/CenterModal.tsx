import {
  Button,
  ButtonGroup,
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
  acceptText?: string;
  onAccept?: () => void;
  onDelete?: () => void;
}

export function CenterModal({
  isOpen,
  onClose,
  acceptText,
  onAccept,
  onDelete,
  titel,
  children,
}: PropsWithChildren<CenterModalProps>) {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered preserveScrollBarGap>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{titel}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <ButtonGroup
              variant="outline"
              justifyContent={onDelete ? "space-between" : "flex-end"}
              w="full"
            >
              {onDelete && (
                <Button colorScheme="red" onClick={onDelete}>
                  Fjern dato
                </Button>
              )}
              {onAccept && (
                <Button onClick={onAccept}>{acceptText ?? "Ok"}</Button>
              )}
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
