import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors:{
        'gray115': '#737373',
        '#EFEFEF' : '#EFEFEF',
        '#0096F6' : '#0096F6',
        '#1877F2' : '#1877F2',
      },
      
      height: {
        '160': '40rem',
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        LoadingBarProgress: {
          '0%': { backgroundPosition: '0% 0' },
          '100%': { backgroundPosition: '125% 0' },
        },
        LoadingBarEnter: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        LoadingBarProgress: 'LoadingBarProgress 2s linear infinite',
        LoadingBarEnter: 'LoadingBarEnter .5s ease-out',
      },
      backgroundSize: {
        '500%': '500%',
      },
      transformOrigin: {
        'left': 'left',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    nextui()
  ],
} satisfies Config;

export default config;
