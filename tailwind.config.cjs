/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: 'class',
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Roboto', 'sans-serif'],
            serif: ['"Roboto Serif"', 'serif'],
            mono: ['"Roboto Mono"', 'monospace'],
        },
        extend: {},
    },
    plugins: [],
};

module.exports = config;
