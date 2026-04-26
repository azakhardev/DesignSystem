# @artemdev04/design-system

A modern, accessible, and strongly typed React Design System built with **Vite**, **TypeScript**, and **Storybook**.

![Version](https://img.shields.io/github/package-json/v/azakhardev/DesignSystem/main?label=version&color=blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Progress](https://progress-bar.xyz/75?title=Progress)

### 🚀 Features

- ⚛️ **React 19+** projects support.
- 📘 **TypeScript** first approach with full type definitions.
- ⚡ **Vite** powered build for blazing fast performance.
- 🎨 **Storybook** included for component isolation and documentation.
- 🧪 **Vitest** integrated through Storybook also with Playwright.
- 🌳 **Tree-shakable** exports (ESM & UMD support).

### 📦 Installation

```bash
# Using npm
npm install @artemdev04/design-system

# Using yarn
yarn add @artemdev04/design-system

# Using pnpm
pnpm add @artemdev04/design-system
```

### 🔨 Usage

Import components directly into your React application:

```tsx
//Your imports

//!IMPORTANT: Import my Stylesheet
import "@artemdev04/design-system/style.css";
//And now you are ready to use my comopnents
import { Button } from "@artemdev04/design-system";

function App() {
  return (
    <Button variant="primary" onClick={() => console.log("Clicked!")}>
      Click me
    </Button>
  );
}
```

#### 🖌️ Tailwind Styles Usage

To use tailwind variables edit your `tailwind.config` file:

```js
/** @type {import('tailwindcss').Config} **/

//Import my tailwind preset
import designSystemPreset from "@artemdev04/design-system/tailwind.preset";

export default {
  //Insert it into the presets array
  presets: [designSystemPreset],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      //Feel free to use your own styles
    },
  },
  plugins: [],
};
```

**Tailwind v4.0** imports:

```js
//Your App.css or index.css
@import "tailwindcss";

//Or try this:
//@layer theme, base, components, utilities;
//@import "tailwindcss/theme.css" layer(theme);
//@import "tailwindcss/utilities.css" layer(utilities);

@import "@artemdev04/design-system/style.css";
@config "@artemdev04/design-system/tailwind.preset";
@source "@artemdev04/design-system/dist";

//The rest of your styles
@theme {
  --color-avocado: oklch(0.84 0.18 117.33);
  //...
}
```

```tsx
//Your App.tsx
//Previous imports
import "./App.css";
import "@artemdev04/design-system/style.css";

function App() {
  return <div className="flex flex-col bg-background">{/*Children*/}</div>;
}
```

### 🛠 Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/azakhardev/design-system.git
cd design-system
npm install
```

### Commands

| **Command**         | **Description**                                    |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Starts Vite in development mode.                   |
| `npm run storybook` | Starts the Storybook documentation server locally. |
| `npm run build`     | Builds the library for production (`dist` folder). |
| `npm run lint`      | Runs ESLint to check code quality.                 |

### Concepts in Figma

Link to figma: [Artem's Design System](https://www.figma.com/design/NRVDKidwFggutZuAZS52ek/DesignSystem?node-id=0-1&p=f&t=Y3IpAdGEQm6fIDgw-0)
