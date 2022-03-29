import { Box } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/react";
import NextImage from "next/image";

const ChakraWrappedNextImage = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    ["width", "height", "src", "alt", "layout", "loader", "quality"].includes(
      prop
    ),
});

interface VareBilledeProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const ChakraNextImage = (props: VareBilledeProps) => {
  return (
    <Box
      width={props.width}
      height={props.height}
      pos="relative"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{
        transform: "scale(1.05)",
        shadow: "md",
      }}
    >
      <ChakraWrappedNextImage
        rounded="md"
        objectFit="cover"
        layout="raw"
        quality={50}
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
      />
    </Box>
  );
};
