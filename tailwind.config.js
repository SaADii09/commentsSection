/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                dark: {
                    100: "#1a1b1e",
                    200: "#26282c",
                    300: "#2e3238",
                    400: "#373a40",
                },
                accent: {
                    primary: "#3b82f6", // blue-500
                    danger: "#ef4444", // red-500
                },
            },
            backgroundImage: {
                "gradient-glass":
                    "linear-gradient(135deg, rgba(38,40,44,0.8), rgba(38,40,44,0.4))",
            },
            boxShadow: {
                glass: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
            },
        },
    },
    plugins: [],
};
