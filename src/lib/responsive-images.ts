export type ResponsiveImageInput = {
  src: string;
  widths: number[];
  sizes: string;
};

export function buildSrcSet({ src, widths }: Pick<ResponsiveImageInput, "src" | "widths">) {
  return widths.map((width) => `${src}?w=${width} ${width}w`).join(", ");
}

export function buildResponsiveImage(input: ResponsiveImageInput) {
  return {
    src: input.src,
    srcset: buildSrcSet(input),
    sizes: input.sizes,
  };
}
