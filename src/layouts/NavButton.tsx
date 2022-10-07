import { Button, ButtonProps, Link } from "@chakra-ui/react";
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
      <Link _hover={{ textDecoration: "none" }}>
        <Button
          variant="ghost"
          justifyContent="start"
          leftIcon={icon}
          {...buttonProps}
        >
          {label}
        </Button>
      </Link>
    </NextLink>
  );
}
