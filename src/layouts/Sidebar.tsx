import { Flex, Link, Stack, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { routes } from "../utils/routes";
import { Logo } from "./Logo";
import { NavButton } from "./NavButton";
import { UserProfile } from "./UserProfile";

interface SidebarProps {
  onClose: () => void;
}

export const Sidebar = (props: SidebarProps) => {
  const router = useRouter();

  return (
    <Flex as="section" minH="100vh" bg="bg-canvas">
      <Flex
        flex="1"
        bg="bg-surface"
        overflowY="auto"
        boxShadow={useColorModeValue("sm", "sm-dark")}
        maxW={{ base: "full", sm: "xs" }}
        py={{ base: "6", sm: "8" }}
        px={{ base: "4", sm: "6" }}
      >
        <Stack justify="space-between" spacing="1">
          <Stack spacing={{ base: "5", sm: "6" }} shouldWrapChildren>
            <Logo />
            <Stack spacing="1">
              {routes.map((route) => (
                <NavButton
                  onClick={props.onClose}
                  key={route.href}
                  href={route.href}
                  label={route.label}
                  icon={route.icon}
                  aria-current={
                    router.asPath === route.href ? "page" : undefined
                  }
                />
              ))}
            </Stack>
          </Stack>
          <Stack spacing={{ base: "5", sm: "6" }}>
            <NextLink href="/profil" passHref>
              <Link>
                <UserProfile
                  name="Christoph Winston"
                  image="https://tinyurl.com/yhkm2ek8"
                  email="chris@chakra-ui.com"
                />
              </Link>
            </NextLink>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};
