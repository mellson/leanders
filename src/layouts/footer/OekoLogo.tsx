import { Link } from "@chakra-ui/react";
import NextImage from "next/image";
import * as React from "react";

export function OekoLogo() {
  return (
    <Link href="https://www.findsmiley.dk/719019">
      <NextImage src={"/logoer/oeko_sort.svg"} width={52} height={50} />
    </Link>
  );
}
