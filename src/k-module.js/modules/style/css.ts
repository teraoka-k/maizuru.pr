import { CSSProperties } from "react";
import { removeAt } from '../list'

export interface Keyframes {
  [seletor: number]: CSSProperties
}

export class Css {
  private _existingSelectors: string[] = [];
  private _sheet: CSSStyleSheet;

  constructor() {
    var _style = document.createElement("style");
    document.head.append(_style);
    this._sheet = _style.sheet as CSSStyleSheet;
  }

  public upsertCSS(selector: string, props: CSSProperties | Keyframes, reset = false) {
    this.ifStyleExists(
      selector,
      (rule) => {
        if (isKeyFramesSrule(rule) && isKeyFrames(props)) {
          updateKeyframes(rule, props, reset)
          // @ts-ignore
        } else updateCSS(rule.style, props, reset)
      },
      () => this.addCSS(selector, props)
    );
  }

  public removeCSSProps(selector: string, props: string[]) {
    this.ifStyleExists(selector, (rule) => {
      props.forEach((prop) => {
        if (!isKeyFramesSrule(rule))
          rule.style.setProperty(prop, "");
      });
    });
  }

  private ifStyleExists(selector: string, callback: (style: CSSStyleRule | CSSKeyframesRule) => void, otherwise?: () => void) {
    if (this._existingSelectors.includes(selector)) {
      var styleIndex = this._existingSelectors.indexOf(selector);
      //@ts-ignore
      if (styleIndex >= 0) callback?.(this._sheet.cssRules[styleIndex]);
    } else otherwise?.();
  }

  private i = 0;
  private addCSS(selector: string, props: CSSProperties | Keyframes) {
    this._existingSelectors.unshift(selector);
    this._sheet.insertRule(isKeyFrames(props) ? keyframesToCss(selector, props) : toCSS(selector, props), 0);
  }

  private remove(selector: string) {
    var styleIndex = this._existingSelectors.indexOf(selector);
    if (styleIndex >= 0) {
      this._sheet.deleteRule(styleIndex);
      removeAt(this._existingSelectors, styleIndex);
    }
  }

}

function toCSS(selector: string, props: CSSProperties) {
  var css = `${selector}{`;
  for (var key of Object.keys(props)) css += `${mapCamelCasetoKebabCase(key)}:${(props as { [key: string]: string | number })[key]};`;
  css += "}";
  return css;
}

function mapCamelCasetoKebabCase(camelCase: string): string {
  return camelCase.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export function isKeyFrames(props: CSSProperties | Keyframes): props is Keyframes {
  return Object.keys(props).every(prop => /^\d{1,3}$/.test(prop))
}
function isKeyFramesSrule(rule: CSSStyleRule | CSSKeyframesRule): rule is CSSKeyframesRule {
  return rule instanceof CSSKeyframesRule
}
function keyframesToCss(name: string, keyframes: Keyframes): string {
  var css = `${name}{`;
  for (var progress of Object.keys(keyframes)) {
    css += toCSS(`${progress}%`, keyframes[Number(progress)])
  }
  css += "}";
  return css
}


function updateCSS(cssStyleDeclaration: CSSStyleDeclaration, props: CSSProperties, reset = false) {
  Object.keys(props).forEach((prop) => {
    var key = mapCamelCasetoKebabCase(prop);
    //@ts-ignore
    var value = props[prop]
    cssStyleDeclaration.setProperty(key, value);
  });
  if (reset) {
    for (let i = 0; i < cssStyleDeclaration.length; i++) {
      var key = cssStyleDeclaration[i];
      //@ts-ignore
      var value = props[key]
      if (value === undefined) {
        cssStyleDeclaration.removeProperty(key);
      }
    }
  }
}

function updateKeyframes(rule: CSSKeyframesRule, keyframes: Keyframes, reset = false) {
  Object.keys(keyframes).forEach((progress) => {
    let progressWithUnit = `${progress}%`;
    //@ts-ignore
    var styleIndex = Object.keys(rule).find(i => rule[i].keyText === progressWithUnit)
    if (styleIndex) {
      //@ts-ignore
      updateCSS(rule[styleIndex].style, keyframes[Number(progress)], reset);
    }
  });
}
