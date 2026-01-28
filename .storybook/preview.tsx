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
      disabled: true,
    },

    layout: "fullscreen",

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
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
