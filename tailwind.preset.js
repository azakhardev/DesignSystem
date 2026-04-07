import defaultTheme from "tailwindcss/defaultTheme";

export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--app-background) / <alpha-value>)",
        surface: {
          DEFAULT: "hsl(var(--surface) / <alpha-value>)",
          subtle: "hsl(var(--surface-subtle) / <alpha-value>)",
          secondary: "hsl(var(--surface-secondary) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          focus: "hsl(var(--primary-focus) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          focus: "hsl(var(--secondary-focus) / <alpha-value>)",
        },
        text: {
          DEFAULT: "hsl(var(--text-main) / <alpha-value>)",
          secondary: "hsl(var(--text-secondary) / <alpha-value>)",
        },
        border: {
          DEFAULT: "hsl(var(--border-main) / <alpha-value>)",
          subtle: "hsl(var(--border-subtle) / <alpha-value>)",
          strong: "hsl(var(--border-strong) / <alpha-value>)",
        },
        input: {
          background: "hsl(var(--input-background) / <alpha-value>)",
          focus: "hsl(var(--input-focus) / <alpha-value>)",
          hover: "hsl(var(--input-hover) / <alpha-value>)",
        },
        accent: "hsl(var(--accent) / <alpha-value>)",
        overlay: "hsl(var(--overlay) / <alpha-value>)",
        on: {
          primary: "hsl(var(--on-primary) / <alpha-value>)",
          secondary: "hsl(var(--on-secondary) / <alpha-value>)",
          surface: "hsl(var(--on-surface) / <alpha-value>)",
        },
        disabled: {
          surface: "hsl(var(--disabled-surface) / <alpha-value>)",
          text: "hsl(var(--disabled-text) / <alpha-value>)",
          border: "hsl(var(--disabled-border) / <alpha-value>)",
        },
        info: {
          DEFAULT: "hsl(var(--info-main) / <alpha-value>)",
          surface: "hsl(var(--info-surface) / <alpha-value>)",
          border: "hsl(var(--info-border) / <alpha-value>)",
          text: "hsl(var(--info-text) / <alpha-value>)",
        },
        success: {
          DEFAULT: "hsl(var(--success-main) / <alpha-value>)",
          surface: "hsl(var(--success-surface) / <alpha-value>)",
          border: "hsl(var(--success-border) / <alpha-value>)",
          text: "hsl(var(--success-text) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning-main) / <alpha-value>)",
          surface: "hsl(var(--warning-surface) / <alpha-value>)",
          border: "hsl(var(--warning-border) / <alpha-value>)",
          text: "hsl(var(--warning-text) / <alpha-value>)",
        },
        error: {
          DEFAULT: "hsl(var(--error-main) / <alpha-value>)",
          surface: "hsl(var(--error-surface) / <alpha-value>)",
          border: "hsl(var(--error-border) / <alpha-value>)",
          text: "hsl(var(--error-text) / <alpha-value>)",
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
