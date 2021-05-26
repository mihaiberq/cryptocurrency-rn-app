import "styled-components";
import { COLORS, SIZES, FONTS } from "./constants";

declare module "styled-components" {
  export interface DefaultTheme {
    COLORS;
    SIZES;
    FONTS;
  }
}
