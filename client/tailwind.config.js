/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                paddy: '#2E7D32',
                turmeric: '#FBC02D',
                earth: '#6D4C41',
                sky: '#81D4FA',
                cream: '#dffdcfff'
            },
            fontFamily: {
                tamil: ['"Noto Sans Tamil"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
