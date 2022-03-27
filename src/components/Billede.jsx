import { Box, chakra } from "@chakra-ui/react";
import NextImage from "next/image";
import { shimmer } from "./shimmer";

export const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const CoverImg = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      "width",
      "height",
      "src",
      "alt",
      "quality",
      "placeholder",
      "blurDataURL",
      "loader ",
    ].includes(prop),
});

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality}`;
};

export const Billede = (props) => {
  const { src, alt, ...rest } = props;
  return (
    <Box pos="relative" cursor="pointer" className="group" {...rest}>
      <CoverImg
        w="auto"
        h="auto"
        loader={myLoader}
        width={600}
        quality={50}
        height={384}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(60, 60))}`}
        src={src}
        alt={alt}
        transition="all 0.2s"
        _groupHover={{
          transform: "scale(1.05)",
        }}
      />
    </Box>
  );
};
