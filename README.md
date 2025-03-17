# Bank Aggregation Platform

A modern web application for bank account aggregation and management.

## Features

- Modern React with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Error boundary handling
- Responsive design
- Component library with Radix UI

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd bank-agg
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
VITE_TEMPO=false
VITE_BASE_PATH=/
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # React components
├── lib/           # Utility functions and shared logic
├── types/         # TypeScript type definitions
├── stories/       # Storybook stories
└── App.tsx        # Main application component
```

## Development Tools

- **Tempo DevTools**: A development tool for component development and testing
  - Enabled when `VITE_TEMPO=true` in environment variables
  - Provides additional development features and debugging capabilities

## Error Handling

The application includes:
- Global error boundary for catching runtime errors
- Graceful fallback UI for error states
- Loading states for async operations

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

[Your License]

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
