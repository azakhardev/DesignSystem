import type { Meta, StoryObj } from "@storybook/react-vite";
import { themes } from "prism-react-renderer";

import { CodeBlock, CodeSnippet } from "./Code";

/**
 * The **Code** component suite provides robust, accessible tools for rendering source code.
 *
 * It is built on top of `prism-react-renderer`, meaning it maps tokens directly to React elements
 * rather than dangerously injecting HTML. This guarantees a secure, lightweight footprint with zero DOM pollution.
 *
 * ### Key Features
 * - **Syntax Highlighting:** Supports comprehensive token highlighting for standard languages (TSX, Bash, JSON, Python, etc.) via the `language` prop.
 * - **Custom Theming:** Inject standard Prism themes (like `themes.github` or `themes.dracula`) directly into the `theme` prop. Defaults to `vsDark`.
 * - **Copy to Clipboard:** Features a built-in, animated copy button (`withCopyButton`) that provides visual feedback to users.
 * - **Line Numbers:** Optional gutter rendering (`showLineNumbers`) for longer configuration files or complex algorithms.
 * - **Sleek Scrolling:** Horizontal overflow is fully scrollable via trackpad or shift-scroll, but native scrollbars are hidden for a cleaner UI.
 */
const meta = {
  component: CodeBlock,
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    CodeSnippet,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Data Display/Code",
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Use `<CodeSnippet>` to wrap short identifiers, variable names, or terminal
 * commands directly inside standard paragraphs of text.
 */
export const InlineSnippet: Story = {
  args: { code: "" },
  render: () => (
    <p className="max-w-md text-text bg-surface p-2 rounded">
      To install the new design system, you should open your terminal and run{" "}
      <CodeSnippet>npm install @artemdev04/design-system</CodeSnippet>. Once
      installed, ensure you have updated your{" "}
      <CodeSnippet>index.css</CodeSnippet>
      to include my tailwind styles.
    </p>
  ),
};

/**
 * Use `<CodeBlock>` for multi-line scripts or component examples. It supports
 * syntax highlighting for almost every major language. Hover over the block
 * to test the floating Copy button!
 */
export const SyntaxHighlightedBlock: Story = {
  args: {
    code: `import { Button } from "@artemdev04/design-system";

export function App() {
  return (
    <Button variant="primary" onClick={() => alert('Hello!')}>
      Click Me
    </Button>
  );
}`,
    language: "tsx",
  },
  render: (args) => (
    <div className="w-100">
      <CodeBlock {...args} />
    </div>
  ),
};

/**
 * For longer configuration files or complex algorithms, you can enable
 * the `showLineNumbers` prop to render a gutter on the left side.
 */
export const WithLineNumbers: Story = {
  args: {
    code: `function fibonacci(n: number): number {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
    language: "typescript",
    showLineNumbers: true,
  },
  render: (args) => (
    <div className="w-125">
      <CodeBlock {...args} />
    </div>
  ),
};

/**
 * You can inject different themes directly from \`prism-react-renderer\` using the \`theme\` prop.
 */
export const CustomTheme: Story = {
  args: {
    code: `// Using the GitHub light theme
const greeting = "Hello, world!";
console.log(greeting);`,
    language: "typescript",
    theme: themes.github, // Imported from prism-react-renderer
  },
  render: (args) => (
    <div className="w-125">
      <CodeBlock {...args} className="bg-white border-gray-200" />
    </div>
  ),
};
