import type { Preview } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // sets the background of the component DEMO
    backgrounds: {
      disable: true, // disables default grid
    },
    layout: "fullscreen",
  },

  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
      parentSelector: "body",
    }),
    (Story) => (
      <div className="w-full font-sans text-text antialiased text-text bg-background p-8 transition-colors duration-200">
        <Story />
      </div>
    ),
  ],
};

export default preview;
