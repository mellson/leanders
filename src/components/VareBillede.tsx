import { Box, chakra } from "@chakra-ui/react";
import NextImage from "next/image";

const CoverImg = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    ["width", "height", "src", "alt", "layout", "quality", "loader"].includes(
      prop
    ),
});

const myLoader = ({ src, width, quality }) => {
  console.log(width);
  return `${src}?w=${width}&q=${quality || 75}`;
};

export const VareBillede = (props) => {
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
