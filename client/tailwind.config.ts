import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "solidblack": "#26292A",
      },
      dropShadow: {
        'button': '0 4px 20px rgba(0, 0, 0, 0.8)',
        'heading': '3px 3px 8px rgba(0, 0, 0, 0.7)',
        'vignette': '0 0 144px rgba(0, 0, 0, 1)',
      }
    },
  },
  plugins: [],
};
export default config;
