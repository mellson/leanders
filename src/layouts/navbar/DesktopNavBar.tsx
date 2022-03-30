import { Button, ButtonGroup, HStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { routes } from "../../utils/routes";
import { Logo } from "../Logo";
import { UserLink } from "../UserLink";

export function DesktopNavBar() {
  const router = useRouter();

  return (
    <>
      <HStack spacing="4">
        <Logo />
        <ButtonGroup variant="ghost" spacing="1">
          {routes.map((route) => (
            <NextLink href={route.href} key={route.href} passHref>
              <Button
                aria-current={router.asPath === route.href ? "page" : undefined}
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
  );
}
