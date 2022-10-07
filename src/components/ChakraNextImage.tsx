import theme from "@/utils/theme";
import { chakra, Flex, FlexProps } from "@chakra-ui/react";
import type { ImageProps } from "next/future/image";
import NextImage from "next/image";

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
      "loader",
      "layout",
    ].includes(prop),
});

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const shimmer = (w: number, h: number) => {
  const shimmerColor = theme.colors.leanders[600];

  return `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <rect width="${w}" height="${h}" fill={${shimmerColor}}  />
      <rect id="r" width="${w}" height="${h}" fill={${shimmerColor}}  />
      <animate xlinkHref="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;
};

function ChakraNextImage(
  props: ImageProps &
    FlexProps & {
      layout?: "fill" | "fixed" | "intrinsic" | "responsive" | undefined;
    }
) {
  const { src, width, height, alt, layout, quality = 50, ...rest } = props;

  return (
    <Flex
      pos="relative"
      cursor={props.onClick ? "pointer" : "unset"}
      className="group"
      overflow="hidden"
      {...rest}
    >
      <ChakraNextUnwrappedImage
        w={props.w ?? "auto"}
        h={props.h ?? "auto"}
        bg={props.bg ?? "leanders.600"}
        layout={layout}
        width={width}
        height={height}
        quality={quality}
        objectFit={props.objectFit ?? "cover"}
        // placeholder="blur"
        // blurDataURL={`data:image/svg+xml;base64,${toBase64(
        //   shimmer(+width!, +height!)
        // )}`}
        src={src}
        alt={alt}
        transition={props.transition ?? "all 0.2s"}
      />
    </Flex>
  );
}

export default ChakraNextImage;
