import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        deepBlue: "#1E3A8A",
        aiTeal: "#14B8A6",
        cyanAccent: "#06B6D4"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      }
    }
  }
};

export default config;
