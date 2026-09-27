import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F3F4F7",
        surface: "#FFFFFF",
        ink: "#14171F",
        "ink-muted": "#5B6270",
        border: "#E1E3E9",
        accent: {
          DEFAULT: "#245A52",
          soft: "#E3EEEB",
          hover: "#1B4740",
        },
        priority: {
          high: "#B3402A",
          "high-soft": "#F7E7E3",
          medium: "#B8790A",
          "medium-soft": "#F7EEDC",
          low: "#3E7A48",
          "low-soft": "#E5F0E6",
        },
        status: {
          pending: "#5B6270",
          "pending-soft": "#E9EAEE",
          progress: "#245A52",
          "progress-soft": "#E3EEEB",
          completed: "#3E7A48",
          "completed-soft": "#E5F0E6",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20, 23, 31, 0.04)",
        modal: "0 20px 50px rgba(20, 23, 31, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
