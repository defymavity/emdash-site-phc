// PHC color picker plugin: adds a "Color picker" field widget to the EmDash admin.
// Any string field with widget "phc-colors:color" gets a swatch + hex input instead of a text box.
import { definePlugin } from "emdash";

export const fieldWidgets = [{ name: "color", label: "Color picker", fieldTypes: ["string"] as const }];

export function createPlugin() {
  return definePlugin({
    id: "phc-colors",
    version: "1.0.0",
    displayName: "PHC Color Picker",
    description: "Color picker for theme color fields.",
    admin: {
      fieldWidgets: fieldWidgets.map((w) => ({ ...w, fieldTypes: [...w.fieldTypes] })),
    },
  });
}
