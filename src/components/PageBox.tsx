import { Box } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export const PageBox: React.FC<PropsWithChildren> = ({ children }) => (
  <Box pt={{ base: 8, lg: 12 }} pb={{ base: 12, lg: 24 }} px={2}>
    {children}
  </Box>
);
