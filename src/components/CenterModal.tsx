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
} from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

interface CenterModalProps {
  titel?: string;
  undertitel?: string;
  isOpen: boolean;
  small?: boolean;
  onClose: () => void;
  acceptText?: string;
  onAccept?: () => void;
  deleteText?: string;
  onDelete?: () => void;
}

export function CenterModal({
  isOpen,
  onClose,
  acceptText,
  onAccept,
  deleteText,
  onDelete,
  titel,
  undertitel,
  small = false,
  children,
}: PropsWithChildren<CenterModalProps>) {
  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        preserveScrollBarGap
        size={small ? 'sm' : 'md'}
      >
        <ModalOverlay />
        <ModalContent
          rounded="none"
          border="1px solid"
          borderColor="leanders.800"
        >
          {titel && (
            <ModalHeader pb={0} fontSize="md">
              {titel}
            </ModalHeader>
          )}
          {undertitel && (
            <ModalHeader fontSize="sm" fontWeight="thin" py={0}>
              {undertitel}
            </ModalHeader>
          )}
          <ModalCloseButton zIndex={1} />
          <ModalBody p={0}>{children}</ModalBody>
          <ModalFooter>
            <ButtonGroup
              variant="outline"
              justifyContent={onDelete ? 'space-between' : 'flex-end'}
              w="full"
            >
              {onDelete && (
                <Button colorScheme="red" onClick={onDelete}>
                  {deleteText ?? 'Slet'}
                </Button>
              )}
              {onAccept && (
                <Button onClick={onAccept}>{acceptText ?? 'Ok'}</Button>
              )}
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
