import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  variants: {
    extend: {
      typography: ['responsive'],
    },
  },
  theme: {
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      mono: ['Source Code Pro', 'monospace'],
    },
    extend: {
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.green.600'),
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.900'),
              fontWeight: 'bold',
              letterSpacing: '-0.025em',
              marginTop: '1em',
              marginBottom: '0.5em',
            },
            ul: {
              lineHeight: '1',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
