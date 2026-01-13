/** @type {import('tailwindcss').Config} */

import myDesingSystemPreset from "./tailwind.preset.js";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./.storybook/**/*.{js,ts,jsx,tsx}"],
  presets: [myDesingSystemPreset],
  theme: {
    extend: {},
  },
  plugins: [],
};
