import * as React from "react";

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

// <input type="color"> only accepts #rrggbb, so expand #rgb
function toSixDigit(v: string) {
  if (/^#[0-9a-f]{3}$/i.test(v)) return "#" + v.slice(1).split("").map((c) => c + c).join("");
  return v;
}

type Props = {
  value?: string | null;
  onChange: (value: string) => void;
  label?: string;
  id?: string;
  required?: boolean;
  minimal?: boolean;
};

function ColorField({ value, onChange, label, id, required, minimal }: Props) {
  const current = typeof value === "string" ? value : "";
  const [text, setText] = React.useState(current);
  React.useEffect(() => setText(current), [current]);

  const valid = HEX.test(text.trim());
  const swatch = HEX.test(current) ? toSixDigit(current) : "#000000";
  const inputId = id ?? "phc-color";

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {!minimal && label && (
        <label htmlFor={inputId} style={{ fontSize: 14, fontWeight: 500 }}>
          {label}{required ? " *" : ""}
        </label>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input
          type="color"
          aria-label={`${label ?? "Color"} picker`}
          value={swatch}
          onChange={(e) => { setText(e.target.value.toUpperCase()); onChange(e.target.value.toUpperCase()); }}
          style={{ width: 44, height: 36, padding: 0, border: "1px solid rgba(0,0,0,.25)", borderRadius: 8, background: "none", cursor: "pointer" }}
        />
        <input
          id={inputId}
          type="text"
          value={text}
          placeholder="#183D34"
          spellCheck={false}
          onChange={(e) => {
            let v = e.target.value.trim();
            if (v && !v.startsWith("#")) v = "#" + v;
            setText(v);
            if (v === "" || HEX.test(v)) onChange(v.toUpperCase());
          }}
          style={{ width: 120, height: 36, padding: "0 10px", fontFamily: "ui-monospace, monospace", fontSize: 14, border: `1px solid ${valid || text === "" ? "rgba(0,0,0,.25)" : "#c0392b"}`, borderRadius: 8, background: "transparent", color: "inherit" }}
        />
        {text !== "" && !valid && <span style={{ fontSize: 12, color: "#c0392b" }}>Use a hex code like #183D34</span>}
      </div>
    </div>
  );
}

export const fields = {
  color: ColorField,
};
