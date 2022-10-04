import { Button, ButtonProps, HStack, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import { ReactElement } from "react";

interface NavButtonProps extends ButtonProps {
  icon: ReactElement;
  label: string;
  href: string;
}

export function NavButton(props: NavButtonProps) {
  const { icon, label, ...buttonProps } = props;
  return (
    <NextLink href={props.href} passHref>
      <Link>
        <Button variant="ghost" justifyContent="start" {...buttonProps}>
          <HStack spacing="3">
            {icon}
            <Text>{label}</Text>
          </HStack>
        </Button>
      </Link>
    </NextLink>
  );
}
