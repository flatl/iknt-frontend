declare module '*.svg' {
  const filePath: string;
  export default filePath;
}

declare module '*.svg?inline' {
  const filePath: string;
  export default filePath;
}

declare module 'vue-carousel' {
  export const Carousel: Vue;
  export const Slider: Vue;
}
