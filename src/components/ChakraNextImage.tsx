import theme from '@/utils/theme';
import { chakra, Flex, FlexProps } from '@chakra-ui/react';
import type { ImageLoaderProps, ImageProps } from 'next/image';
import NextImage from 'next/image';

const ChakraNextUnwrappedImage = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      'width',
      'height',
      'src',
      'alt',
      'quality',
      'placeholder',
      'blurDataURL',
      'loader ',
    ].includes(prop),
});

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
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

const myLoader = (resolverProps: ImageLoaderProps): string => {
  return `${resolverProps.src}?w=${resolverProps.width}&q=${resolverProps.quality}`;
};

function ChakraNextImage(props: ImageProps & FlexProps) {
  const { src, width, height, alt, quality = 50, ...rest } = props;

  return (
    <Flex
      pos="relative"
      cursor={props.onClick ? 'pointer' : 'unset'}
      className="group"
      overflow="hidden"
      rounded="md"
      {...rest}
    >
      <ChakraNextUnwrappedImage
        w="auto"
        h="auto"
        bg={props.bg ?? 'leanders.600'}
        loader={myLoader}
        width={width}
        quality={quality}
        height={height}
        objectFit="cover"
        // placeholder="blur"
        // blurDataURL={`data:image/svg+xml;base64,${toBase64(
        //   shimmer(+width!, +height!)
        // )}`}
        src={src}
        alt={alt}
        transition={props.transition ?? 'all 0.2s'}
      />
    </Flex>
  );
}

export default ChakraNextImage;
