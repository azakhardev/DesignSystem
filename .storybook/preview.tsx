import type { Preview } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    docs: {
      codePanel: true,
    },
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
    (Story, context) => {
      const isFullscreen = context.parameters.layout === "fullscreen";

      return (
        <div
          className={`w-full font-sans text-text antialiased bg-background transition-colors duration-200 ${
            isFullscreen ? "p-0" : "p-8"
          }`}
        >
          <Story />
        </div>
      );
    },
  ],
  tags: ["autodocs"],
};

export default preview;
