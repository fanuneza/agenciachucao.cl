module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      url: [
        "/",
        "/blog/",
        "/blog/por-que-no-aparezco-en-google/",
        "/servicios/",
        "/servicios/desarrollo-web/",
        "/portafolio/",
        "/sobre-nosotros/",
        "/contacto/",
      ],
      numberOfRuns: 1,
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "categories:performance": ["warn", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 3500 }],
        "cumulative-layout-shift": ["warn", { maxNumericValue: 0.1 }],
        "total-blocking-time": ["warn", { maxNumericValue: 200 }],
        // Insights are informational, not failures
        "network-dependency-tree-insight": "off",
        "image-delivery-insight": "off",
        "dom-size-insight": "off",
        "lcp-discovery-insight": "off",
        "render-blocking-insight": "off",
        // Minor image optimizations — monitor but don't block
        "uses-responsive-images": "warn",
        "modern-image-formats": "warn",
        "render-blocking-resources": "warn",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
