import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        arena: {
          bg: "#0a0a0f",
          creative: "#fb923c",
          logical: "#a78bfa",
          realist: "#38bdf8",
        },
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
