import { CSSProperties } from "react";
import { Style } from "./style.ts";

export function style(...props: CSSProperties[]): Style {
  return new Style(join(...props))
}

const SCROLL_BAR = '::-webkit-scrollbar'
export function scrollbar(bar: CSSProperties, track: CSSProperties, thumb: CSSProperties) {
  return {
    bar: new Style(bar, SCROLL_BAR),
    track: new Style(track, `${SCROLL_BAR}-track`),
    thumb: new Style(thumb, `${SCROLL_BAR}-thumb`),
  }
}
export function window() {
  return join({
    position: "fixed",
    width: "100vw",
    height: "100vh",
  })
}

export function flex() {
  return join({
    display: "flex",
    padding: "1%",
    gap: "1%",
  })
}

export function row() {
  return join(flex(), {
    width: "100%",
    flexDirection: "row",
    overflowX: "auto",
  })
}

export function column() {
  return join(flex(), {
    height: "100%",
    flexDirection: "column",
    overflowY: "auto",
  })
}

export function button() {
  return join({
    width: "10%",
    borderRadius: "20%",
    border: "none",
    cursor: "pointer",
  })
}

export function center(cx: number, cy: number, w: number, h: number, padding = 0) {
  var w = w - padding * 2;
  var h = h - padding * 2;
  return join({
    width: `${w}%`,
    height: `${h}%`,
    padding: `${padding}%`,
    left: `${cx - w * 0.5}%`,
    bottom: `${cy - h * 0.5}%`,
  })
}

export function centerizeContent() {
  return join({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
}


export function image(src: string) {
  return join({
    backgroundColor: 'transparent',
    backgroundImage: `url("${src}")`,
    backgroundSize: "cover",
    backgroundPosition: "top",
  });
}

export function label() {
  return join({
    justifyContent: "center",
  })
}


export function c(color: string, opacity?: number) {
  var alpha = Math.round((opacity ?? 1) * 255).toString(16).padStart(2, '0');
  return `${color}${alpha}`
}
export function bg(color: string, opacity?: number) {
  return { backgroundColor: c(color, opacity) }
}
export function grad(color: string, opacity?: number, left?: number, right?: number, dir?: string) {
  var base = c(color, opacity)
  left = left ?? 21
  right = right ?? (100 - left)
  return { backgroundImage: `linear-gradient(to ${dir ?? 'right'}, transparent, ${base} ${left}%, ${base} ${right}%,transparent`, backgroundColor: 'transparent' }
}
export function gradRadial(color: string, opacity?: number, end?: number) {
  var base = c(color, opacity)
  return { backgroundImage: `radial-gradient(${base} 0%, transparent ${end ?? 79}%`, backgroundColor: 'transparent' }
}
export function blur(px: number) {
  return { filter: `blur(${px}px)` }
}
export function message(color: string) {
  return join(centerizeContent(), { fontSize: '1.5em', left: '110vw', height: 'fit-content', fontWeight: 'bold', color })
}
export function overflowHidden(): CSSProperties {
  return { overflowX: 'hidden', overflowY: 'hidden' }
}


// export function Hover {
//   /** @param {DOM} dom */
//   constructor(dom, cssProps) {
//     var currentProps = { ...dom.style.cssProps };
//     var newProps = Object.keys(cssProps);
//     dom.element.addEventListener("pointerenter", () =>
//       dom.style.setCSSProps(cssProps)
//     );
//     dom.element.addEventListener("pointerleave", () => {
//       dom.style.removeCssProps(newProps);
//       dom.style.setCSSProps(currentProps);
//     });
//   }
// }

function join(...props: CSSProperties[]): CSSProperties {
  return props.reduce((prop1, prop2) => ({ ...prop1, ...prop2 }))
}
