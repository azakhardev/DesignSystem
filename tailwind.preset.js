import defaultTheme from "tailwindcss/defaultTheme";

export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--app-background)",
        surface: {
          DEFAULT: "var(--surface)",
          secondary: "var(--surface-secondary)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          focus: "var(--primary-focus)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          focus: "var(--secondary-focus)",
        },
        text: {
          DEFAULT: "var(--text-main)",
          secondary: "var(--text-secondary)",
        },
        border: {
          DEFAULT: "var(--border-main)",
          subtle: "var(--border-subtle)",
          strong: "var(--border-strong)",
        },
        input: {
          background: "var(--input-background)",
        },
        accent: "var(--accent)",
        overlay: "var(--overlay)",
        on: {
          primary: "var(--on-primary)",
          secondary: "var(--on-secondary)",
          surface: "var(--on-surface)",
        },
        disabled: {
          surface: "var(--disabled-surface)",
          text: "var(--disabled-text)",
          border: "var(--disabled-border)",
        },
        info: {
          DEFAULT: "var(--info-main)",
          surface: "var(--info-surface)",
          border: "var(--info-border)",
          text: "var(--info-text)",
        },
        success: {
          DEFAULT: "var(--success-main)",
          surface: "var(--success-surface)",
          border: "var(--success-border)",
          text: "var(--success-text)",
        },
        warning: {
          DEFAULT: "var(--warning-main)",
          surface: "var(--warning-surface)",
          border: "var(--warning-border)",
          text: "var(--warning-text)",
        },
        error: {
          DEFAULT: "var(--error-main)",
          surface: "var(--error-surface)",
          border: "var(--error-border)",
          text: "var(--error-text)",
        },
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
