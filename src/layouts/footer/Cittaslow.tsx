import { Link } from "@chakra-ui/react";
import NextImage from "next/image";

export function Cittaslow() {
  return (
    <Link href="https://cittaslow.svendborg.dk/">
      <NextImage src={"/logoer/cittaslow.svg"} width={60} height={60} />
    </Link>
  );
}
