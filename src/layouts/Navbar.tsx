import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { routes } from "../utils/routes";
import { Logo } from "./Logo";
import { Sidebar } from "./Sidebar";
import { ToggleButton } from "./ToggleButton";
import { UserLink } from "./UserLink";

export const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isOpen, onToggle, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <Box
      as="nav"
      bg="bg-surface"
      boxShadow={useColorModeValue("sm", "sm-dark")}
    >
      <Container py={{ base: "3", lg: "4" }}>
        <Flex justify="space-between" alignItems="center">
          {isDesktop ? (
            <>
              <HStack spacing="4">
                <Logo />
                <ButtonGroup variant="ghost" spacing="1">
                  {routes.map((route) => (
                    <NextLink href={route.href} key={route.href} passHref>
                      <Button
                        aria-current={
                          router.asPath === route.href ? "page" : undefined
                        }
                      >
                        {route.label}
                      </Button>
                    </NextLink>
                  ))}
                </ButtonGroup>
              </HStack>
              <HStack spacing="4">
                <UserLink />
              </HStack>
            </>
          ) : (
            <>
              <ToggleButton
                isOpen={isOpen}
                aria-label="Open Menu"
                onClick={onToggle}
              />
              <Logo />
              <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                isFullHeight
                preserveScrollBarGap
              >
                <DrawerOverlay />
                <DrawerContent>
                  <Sidebar onClose={onClose} />
                </DrawerContent>
              </Drawer>
            </>
          )}
        </Flex>
      </Container>
    </Box>
  );
};
