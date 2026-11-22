import {
  loadQuartzConfig,
  loadQuartzLayout,
} from "./quartz/plugins/loader/config-loader";
import { applyUkrainianLocalization } from "./quartz/localization";
// @ts-ignore: Quartz bundles inline scripts as text.
import localizationScript from "./quartz/localization/ui.inline";

const config = applyUkrainianLocalization(
  await loadQuartzConfig(),
  localizationScript,
);
export default config;
export const layout = await loadQuartzLayout();
