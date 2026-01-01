/// <reference types="vite/client" />

declare module '*.mdx' {
  import type React from 'react';
  export const meta: unknown;
  const Component: React.ComponentType;
  export default Component;
}
