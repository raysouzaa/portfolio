import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  // A única imagem do site é a foto, servida já no tamanho certo (/public).
  // Sem otimização em tempo real, o sharp (~46 MB) fica fora da imagem Docker.
  images: { unoptimized: true },
  outputFileTracingExcludes: {
    "*": ["node_modules/@img/**", "node_modules/sharp/**", "node_modules/@emnapi/**"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
