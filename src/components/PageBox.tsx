import { Box } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

export const PageBox: React.FC<PropsWithChildren> = ({ children }) => (
  <Box
    pt={{ base: 4, sm: 8, lg: 12 }}
    pb={{ base: 12, lg: 24 }}
    px={{ base: 0, sm: 4, md: 8 }}
  >
    {children}
  </Box>
);
