import { Avatar, Flex, Icon, Stack, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";
import { routes } from "../utils/routes";
import { Logo } from "./Logo";
import { NavButton } from "./NavButton";

interface SidebarProps {
  onClose: () => void;
}

export function Sidebar(props: SidebarProps) {
  const router = useRouter();

  return (
    <Flex
      flex="1"
      bg="bg-surface"
      overflowY="auto"
      boxShadow={useColorModeValue("sm", "sm-dark")}
      maxW={{ base: "full", sm: "xs" }}
      py={{ base: "6", sm: "8" }}
      px={{ base: "4", sm: "6" }}
    >
      <Stack spacing={{ base: "5", sm: "6" }} width="100%" shouldWrapChildren>
        <Logo />
        <Stack spacing="1">
          {routes.map((route) => (
            <NavButton
              onClick={props.onClose}
              key={route.href}
              href={route.href}
              label={route.label}
              icon={<Icon as={route.icon} boxSize="6" color="subtle" />}
              aria-current={router.asPath === route.href ? "page" : undefined}
            />
          ))}
          <NavButton
            onClick={props.onClose}
            href="/profil"
            label="Min Side"
            icon={<Avatar src="https://tinyurl.com/yhkm2ek8" boxSize={6} />}
            aria-current={router.asPath === "/profil" ? "page" : undefined}
          />
        </Stack>
      </Stack>
    </Flex>
  );
}
