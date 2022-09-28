import { Link } from "@chakra-ui/react";
import NextImage from "next/image";

export function OekoLogo({
  width = 52,
  height = 50,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <Link
      href="https://www.findsmiley.dk/719019"
      width={`${width}px`}
      height={`${height}px`}
    >
      <NextImage src={"/logoer/oeko_roed.svg"} width={width} height={height} />
    </Link>
  );
}
