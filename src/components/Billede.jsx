import { Box, chakra } from "@chakra-ui/react";
import NextImage from "next/image";

export const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const CoverImg = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    ["width", "height", "src", "alt", "layout", "quality", "loader"].includes(
      prop
    ),
});

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality}`;
};

export const Billede = (props) => {
  const { src, alt, ...rest } = props;
  return (
    <Box
      pos="relative"
      cursor="pointer"
      className="group"
      {...rest}
      transition="all 0.2s"
      _hover={{
        transform: "scale(1.05)",
      }}
    >
      <CoverImg
        w="auto"
        h="auto"
        loader={myLoader}
        layout="fill"
        width={600}
        quality={50}
        src={src}
        alt={alt}
        rounded="md"
      />
    </Box>
  );
};
