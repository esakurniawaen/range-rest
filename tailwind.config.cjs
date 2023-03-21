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
        extend: {
            animation: {
                'reverse-spin': 'reverse-spin 1s linear infinite',
            },
            keyframes: {
                'reverse-spin': {
                    from: {
                        transform: 'rotate(360deg)',
                    },
                },
            },
        },
    },
    plugins: [],
};

module.exports = config;
