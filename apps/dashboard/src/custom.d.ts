// custom.d.ts (or images.d.ts)
declare module "*.png" {
  const value: string;
  export default value;
}
