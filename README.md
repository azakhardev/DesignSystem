# @artemdev04/design-system

A modern, accessible, and strongly typed React Design System built with **Vite**, **TypeScript**, and **Storybook**.

![Version](https://img.shields.io/github/package-json/v/azakhardev/DesignSystem/main?label=version&color=blue)
![License](https://img.shields.io/badge/license-MIT-green)

### 🚀 Features

- ⚛️ **React 19+** ready (compatible with React 18).
- 📘 **TypeScript** first approach with full type definitions.
- ⚡ **Vite** powered build for blazing fast performance.
- 🎨 **Storybook** included for component isolation and documentation.
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
import { Button } from "@artemdev04/design-system";

function App() {
  return (
    <Button variant="primary" onClick={() => console.log("Clicked!")}>
      Click me
    </Button>
  );
}
```

### 🛠 Development

Clone the repository and install dependencies:

```bash
git clone [https://github.com/azakhardev/design-system.git](https://github.com/azakhardev/design-system.git)
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
