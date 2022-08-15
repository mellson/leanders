import { theme as proTheme } from '@/components/chakra-ui-pro-theme';
import { extendTheme } from '@chakra-ui/react';
import { CalendarDefaultTheme } from '@uselessdev/datepicker';
import { mergeDeep } from './general';

const leanders = {
  50: '#f1efea', // TODO
  100: '#f1efea',
  200: '#f1efea', // TODO
  300: '#fef7dc', // TODO
  400: '#fef7dc',
  500: '#e7e0d4',
  600: '#beab8b',
  700: '#825919',
  800: '#825d47', // TODO
  900: '#321704',
};

const theme = extendTheme(
  {
    initialColorMode: 'light',
    useSystemColorMode: false,
    colors: {
      ...proTheme.colors,
      leanders,
    },
    styles: {
      global: {
        body: {
          letterSpacing: '1px',
          bg: leanders[500],
        },
      },
    },
    components: {
      Button: {
        defaultProps: {
          rounded: 'none',
        },
      },
      // Button: {
      //   variants: {
      //     outline: (props: StyleFunctionProps) => {
      //       if (props.colorScheme === 'gray') {
      //         return {
      //           color: 'emphasized',
      //           bg: mode('white', 'gray.800')(props),
      //           _hover: {
      //             bg: mode(
      //               darken('gray.50', 1)(props.theme),
      //               transparentize('gray.700', 0.4)(props.theme)
      //             )(props),
      //           },
      //           _checked: {
      //             bg: mode('gray.100', 'gray.700')(props),
      //           },
      //           _active: {
      //             bg: mode('gray.100', 'gray.700')(props),
      //           },
      //         };
      //       }

      //       // Tilføj resterende farver fra det almindelige tema
      //       return variantOutline(props);
      //     },
      //   },
      // },
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
            bgColor: leanders[800],

            _hover: {
              bgColor: leanders[300],
            },
          },
        },
      },
    },
    fonts: {
      body: 'Pragati Narrow, sans-serif',
      heading: 'Pragati Narrow, sans-serif',
      mono: 'Menlo, monospace',
    },
  },
  mergeDeep(CalendarDefaultTheme, proTheme)
);

export default theme;
