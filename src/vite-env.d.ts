/// <reference types="vite/client" />
// ↑ Gives TypeScript knowledge of import.meta.env, import.meta.hot, etc.

// CSS Modules — tell TypeScript that *.module.css files export a class-name map
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}
