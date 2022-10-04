import { Link } from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";

export function Cittaslow() {
  return (
    <NextLink href="https://cittaslow.svendborg.dk/" passHref>
      <Link>
        <NextImage src={"/logoer/cittaslow.svg"} width={60} height={60} />
      </Link>
    </NextLink>
  );
}
