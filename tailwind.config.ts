import type { Config } from "tailwindcss";

function withOpacity(variable: string) {
  return `rgb(var(${variable}) / <alpha-value>)`;
}

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: withOpacity("--color-bg"),
        surface: withOpacity("--color-surface"),
        ink: withOpacity("--color-ink"),
        "ink-muted": withOpacity("--color-ink-muted"),
        border: withOpacity("--color-border"),
        accent: {
          DEFAULT: withOpacity("--color-accent"),
          soft: withOpacity("--color-accent-soft"),
          hover: withOpacity("--color-accent-hover"),
        },
        priority: {
          high: withOpacity("--color-priority-high"),
          "high-soft": withOpacity("--color-priority-high-soft"),
          medium: withOpacity("--color-priority-medium"),
          "medium-soft": withOpacity("--color-priority-medium-soft"),
          low: withOpacity("--color-priority-low"),
          "low-soft": withOpacity("--color-priority-low-soft"),
        },
        status: {
          pending: withOpacity("--color-status-pending"),
          "pending-soft": withOpacity("--color-status-pending-soft"),
          progress: withOpacity("--color-status-progress"),
          "progress-soft": withOpacity("--color-status-progress-soft"),
          completed: withOpacity("--color-status-completed"),
          "completed-soft": withOpacity("--color-status-completed-soft"),
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