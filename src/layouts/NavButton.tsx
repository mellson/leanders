import { Button, ButtonProps, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
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
    <Link href={props.href} passHref>
      <Button variant="ghost" justifyContent="start" {...buttonProps}>
        <HStack spacing="3">
          {icon}
          <Text>{label}</Text>
        </HStack>
      </Button>
    </Link>
  );
}
