import { CenterModal } from '@/components/CenterModal';
import ChakraNextImage from '@/components/ChakraNextImage';
import { VareInput } from '@/components/VareInput';
import { definitions } from '@/types/supabase';
import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { PrisText } from './ordre/Pris';

interface VareComponentProps {
  vare: definitions['varer'];
  dato?: Date;
  visPris: boolean;
}

export function Vare({ vare, dato, visPris }: VareComponentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack spacing={2} maxWidth={200}>
        <VStack align="center" spacing={0}>
          <Text noOfLines={1} fontSize="xl" fontWeight="bold">
            {vare.navn}
          </Text>
          {visPris && <PrisText pris={vare.pris} />}
        </VStack>

        <ChakraNextImage
          alt={vare.navn}
          src={`/billeder/${vare.billede}.jpeg`}
          width={200}
          height={200}
          onClick={onOpen}
          transition="all 0.2s"
          _hover={{
            transform: 'scale(1.05)',
            shadow: 'md',
          }}
        />

        <VareInput vareId={vare.id} dato={dato} />
      </VStack>
      <CenterModal titel={vare.navn} isOpen={isOpen} onClose={onClose}>
        <VStack spacing={2}>
          <ChakraNextImage
            alt={vare.navn}
            src={`/billeder/${vare.billede}.jpeg`}
            width={600}
            height={400}
          />
          <Text>{vare.beskrivelse}</Text>
        </VStack>
      </CenterModal>
    </>
  );
}
