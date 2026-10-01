/**
 * Original presentation boards, brought over unchanged.
 *
 * Each board was sliced into vertical sections before upload so browsers render
 * them at full resolution instead of downsampling one very tall image.
 */
import mri01 from "@/assets/boards/diagnostic-imaging/01.jpg.asset.json";
import mri02 from "@/assets/boards/diagnostic-imaging/02.jpg.asset.json";
import mri03 from "@/assets/boards/diagnostic-imaging/03.jpg.asset.json";
import mri04 from "@/assets/boards/diagnostic-imaging/04.jpg.asset.json";

import bc01 from "@/assets/boards/blockchain-platform/01.jpg.asset.json";
import bc02 from "@/assets/boards/blockchain-platform/02.jpg.asset.json";
import bc03 from "@/assets/boards/blockchain-platform/03.jpg.asset.json";

import fc01 from "@/assets/boards/flight-connectivity/01.jpg.asset.json";
import fc02 from "@/assets/boards/flight-connectivity/02.jpg.asset.json";
import fc03 from "@/assets/boards/flight-connectivity/03.jpg.asset.json";

import clove01 from "@/assets/boards/clove/01.jpg.asset.json";
import clove02 from "@/assets/boards/clove/02.jpg.asset.json";
import clove03 from "@/assets/boards/clove/03.jpg.asset.json";

import dots01 from "@/assets/boards/connecting-the-dots/01.jpg.asset.json";
import dots02 from "@/assets/boards/connecting-the-dots/02.jpg.asset.json";
import dots03 from "@/assets/boards/connecting-the-dots/03.jpg.asset.json";
import dots04 from "@/assets/boards/connecting-the-dots/04.jpg.asset.json";
import dots05 from "@/assets/boards/connecting-the-dots/05.jpg.asset.json";
import dots06 from "@/assets/boards/connecting-the-dots/06.jpg.asset.json";
import dots07 from "@/assets/boards/connecting-the-dots/07.jpg.asset.json";
import dots08 from "@/assets/boards/connecting-the-dots/08.jpg.asset.json";

import autism01 from "@/assets/boards/autism-friendly/01.jpg.asset.json";
import autism02 from "@/assets/boards/autism-friendly/02.jpg.asset.json";
import autism03 from "@/assets/boards/autism-friendly/03.jpg.asset.json";
import autism04 from "@/assets/boards/autism-friendly/04.jpg.asset.json";
import autism05 from "@/assets/boards/autism-friendly/05.jpg.asset.json";
import autism06 from "@/assets/boards/autism-friendly/06.jpg.asset.json";
import autism07 from "@/assets/boards/autism-friendly/07.jpg.asset.json";
import autism08 from "@/assets/boards/autism-friendly/08.jpg.asset.json";
import autism09 from "@/assets/boards/autism-friendly/09.jpg.asset.json";

export const PROJECT_BOARDS: Record<string, Array<{ url: string }>> = {
  "diagnostic-imaging-mri": [mri01, mri02, mri03, mri04],
  "blockchain-based-platform": [bc01, bc02, bc03],
  "flight-connectivity-simulation-system": [fc01, fc02, fc03],
  clove: [clove01, clove02, clove03],
  "connecting-the-dots": [dots01, dots02, dots03, dots04, dots05, dots06, dots07, dots08],
  "autism-friendly-environment": [
    autism01,
    autism02,
    autism03,
    autism04,
    autism05,
    autism06,
    autism07,
    autism08,
    autism09,
  ],
};
