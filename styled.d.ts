import "styled-components";
import { COLORS, SIZES, FONTS } from "./constants";

declare module "*.png";
declare module "styled-components" {
  export interface DefaultTheme {
    COLORS: typeof COLORS;
    SIZES: typeof SIZES;
    FONTS: typeof FONTS;
  }
}
