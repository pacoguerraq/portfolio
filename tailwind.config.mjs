const config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                lightHover: '#fcf4ff',
                darkHover: '#2a004a',
                darkTheme: '#11001F',
            },
            // fontFamily: {
            //     Outfit: ['Outfit', 'sans-serif'],
            //     Ovo: ['Ovo', 'serif'],
            // },
        },
    },
    darkMode: 'selector',
    plugins: [],
};

export default config;