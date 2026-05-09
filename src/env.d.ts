/// <reference path="../.astro/types.d.ts" />

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export {};
