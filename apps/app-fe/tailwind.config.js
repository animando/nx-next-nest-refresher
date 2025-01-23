const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { nextui } = require('@nextui-org/react');

const nextuiTheme = join(
  __dirname,
  '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
);
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    nextuiTheme,
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      keyframes: {
        flash: {
          '0%, 100%': { background: 'white' },
          '50%': { background: 'yellow' },
        },
      },
      animation: {
        flash: 'flash 0.5s ease-in-out',
      },
      animationIterationCount: {
        3: '3',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography'), nextui()],
};
