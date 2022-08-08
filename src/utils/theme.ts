import { theme as proTheme } from '@/components/chakra-ui-pro-theme';
import { extendTheme, StyleFunctionProps } from '@chakra-ui/react';
import { darken, mode, transparentize } from '@chakra-ui/theme-tools';
import { CalendarDefaultTheme } from '@uselessdev/datepicker';
import { mergeDeep } from './general';
import { variantOutline } from './theme-button';

const theme = extendTheme(
  {
    initialColorMode: 'light',
    useSystemColorMode: false,
    colors: {
      ...proTheme.colors,
      brand: proTheme.colors.orange,
    },
    components: {
      Button: {
        variants: {
          outline: (props: StyleFunctionProps) => {
            if (props.colorScheme === 'gray') {
              return {
                color: 'emphasized',
                bg: mode('white', 'gray.800')(props),
                _hover: {
                  bg: mode(
                    darken('gray.50', 1)(props.theme),
                    transparentize('gray.700', 0.4)(props.theme)
                  )(props),
                },
                _checked: {
                  bg: mode('gray.100', 'gray.700')(props),
                },
                _active: {
                  bg: mode('gray.100', 'gray.700')(props),
                },
              };
            }

            // Tilføj resterende farver fra det almindelige tema
            return variantOutline(props);
          },
        },
      },
      Calendar: {
        parts: ['calendar'],

        baseStyle: {
          calendar: {
            borderWidth: '0',
            shadow: 'none',
          },
        },
      },

      CalendarDay: {
        variants: {
          selected: {
            bgColor: proTheme.colors.orange[500],
            color: 'white',

            _hover: {
              bgColor: proTheme.colors.orange[300],
            },
          },
        },
      },
    },
    // fonts: {
    //   body: "Roboto, sans-serif",
    //   heading: "Roboto, sans-serif",
    //   mono: "Menlo, monospace",
    // },
  },
  mergeDeep(CalendarDefaultTheme, proTheme)
);

export default theme;
