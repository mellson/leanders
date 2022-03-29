import { Box, chakra } from "@chakra-ui/react";
import NextImage from "next/image";

const ChakraWrappedNextImage = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    ["width", "height", "src", "alt", "layout", "objectFit"].includes(prop),
});

interface VareBilledeProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const ChakraNextImage = (props: VareBilledeProps) => {
  const { src, alt, ...rest } = props;
  return (
    <Box
      {...rest}
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
        layout="fill"
        objectFit="cover"
        src={src}
        alt={alt}
      />
    </Box>
  );
};
