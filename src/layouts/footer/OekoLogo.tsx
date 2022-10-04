import { Link } from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";

export function OekoLogo({
  width = 52,
  height = 50,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <NextLink href="https://www.findsmiley.dk/719019" passHref>
      <Link width={`${width}px`} height={`${height}px`}>
        <NextImage
          src={"/logoer/oeko_roed.svg"}
          width={width}
          height={height}
        />
      </Link>
    </NextLink>
  );
}
