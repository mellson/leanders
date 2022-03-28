import { Box, chakra } from "@chakra-ui/react";
import { ImageLoaderProps } from "next/dist/client/image";
import NextImage from "next/image";

const CoverImg = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    ["width", "height", "src", "alt", "layout", "quality", "loader"].includes(
      prop
    ),
});

const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

interface VareBilledeProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const VareBillede = (props: VareBilledeProps) => {
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
        rounded="md"
        layout="fill"
        quality={50}
        loader={myLoader}
        {...props}
      />
    </Box>
  );
};
