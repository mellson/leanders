import type { FlexProps } from "@chakra-ui/react";
import { chakra, Flex } from "@chakra-ui/react";
import type { ImageLoaderProps, ImageProps } from "next/image";
import NextImage from "next/image";
import theme from "../theme";

const ChakraNextUnwrappedImage = chakra(NextImage, {
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

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const shimmer = (w: number, h: number) => {
  const shimmerColor = theme.colors.gray[300];
  return `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <rect width="${w}" height="${h}" fill={shimmerColor}  />
      <rect id="r" width="${w}" height="${h}" fill={shimmerColor}  />
      <animate xlinkHref="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;
};

const myLoader = (resolverProps: ImageLoaderProps): string => {
  return `${resolverProps.src}?w=${resolverProps.width}&q=${resolverProps.quality}`;
};

interface ChakraNextImageProps {
  hoverEffect?: boolean;
}

const ChakraNextImage = (
  props: ImageProps & FlexProps & ChakraNextImageProps
) => {
  const {
    src,
    width,
    height,
    alt,
    quality = 50,
    hoverEffect = true,
    ...rest
  } = props;

  return (
    <Flex
      pos="relative"
      cursor={props.onClick ? "pointer" : "unset"}
      className="group"
      overflow="hidden"
      rounded="md"
      transition="all 0.2s"
      _hover={
        hoverEffect
          ? {
              transform: "scale(1.05)",
              shadow: "md",
            }
          : {}
      }
      {...rest}
    >
      <ChakraNextUnwrappedImage
        w="auto"
        h="auto"
        loader={myLoader}
        width={width}
        quality={quality}
        height={height}
        placeholder="blur"
        objectFit="cover"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
          shimmer(+width!, +height!)
        )}`}
        src={src}
        alt={alt}
        transition="all 0.2s"
      />
    </Flex>
  );
};

export default ChakraNextImage;
