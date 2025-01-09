import { CSSProperties } from "react";
import { Css, isKeyFrames, Keyframes } from "./css";
import { createUID } from '../math/uid'

export enum Ease {
  In,
  InOut,
  Out,
  Linear,
  Bezier,
}

export class Style {
  private static css = new Css();
  private pseudo = new Map<string, Style>();

  get props(): CSSProperties {
    return { ...this.cssProps }
  }

  get class(): string {
    return this.selector.replace('.', '')
  }

  constructor(private cssProps: CSSProperties | Keyframes, private selector = `.${createUID()}`) {
    this.setProps(cssProps);
  }

  clone(): Style {
    return new Style(this.props)
  }

  setProps(props: CSSProperties | Keyframes, reset = false) {
    if (isKeyFrames(props)) {
      this.cssProps = props;
    } else {
      Object.keys(props).forEach(key => {
        //@ts-ignore
        var prop = props[key];
        if (prop !== '') {
          //@ts-ignore
          this.cssProps[key] = prop;
        }
      });
    }
    Style.css.upsertCSS(this.selector, this.cssProps, reset);
    return this;
  }

  active(props: CSSProperties) {
    return this.setPseudo('active', props)
  }
  focus(props: CSSProperties) {
    return this.setPseudo('focus', props)
  }
  hover(props: CSSProperties) {
    return this.setPseudo('hover', props)
  }
  focusVisible(props: CSSProperties) {
    return this.setPseudo('focus-visible', props)
  }
  focusWithin(props: CSSProperties) {
    return this.setPseudo('focus-within', props)
  }
  target(props: CSSProperties) {
    return this.setPseudo('target', props)
  }
  keyframe(name: string, keyframes: Keyframes, reset = false) {
    return this.setPseudo(`@keyframes ${name}`, keyframes, reset)
  }
  animateSequence(frames: [Ease, CSSProperties, number, number[]?][]) {
    var ids: number[] = []
    return () => {
      ids.forEach(clearTimeout)
      ids = []
      var timelapse = 0
      frames.forEach(frame => {
        let [ease, props, dt, c] = frame
        //@ts-ignore
        ids.push(setTimeout(() => {
          switch (ease) {
            case Ease.In: return this.animateEaseIn(dt, props)
            case Ease.Out: return this.animateEaseOut(dt, props)
            case Ease.InOut: return this.animateEaseInOut(dt, props)
            case Ease.Linear: return this.animateLinear(dt, props)
            case Ease.Bezier:
              var [c1, c2, c3, c4] = c ?? [0, 0.3, 0.6, 1]
              return this.animateBezier(dt, props, c1, c2, c3, c4)
          }
        }, timelapse))
        timelapse += dt
      })
    }
  }
  animateEaseOut(dtMs: number, cssProps: CSSProperties) {
    this.animateCssProps('ease-out', dtMs, cssProps)
  }
  animateEaseIn(dtMs: number, cssProps: CSSProperties) {
    this.animateCssProps('ease-in', dtMs, cssProps)
  }
  animateEaseInOut(dtMs: number, cssProps: CSSProperties) {
    this.animateCssProps('ease-in-out', dtMs, cssProps)
  }
  animateLinear(dtMs: number, cssProps: CSSProperties) {
    this.animateCssProps('linear', dtMs, cssProps)
  }
  animateBezier(dtMs: number, cssProps: CSSProperties, c1: number, c2: number, c3: number, c4: number) {
    this.animateCssProps(`cubic-bezier(${c1},${c2},${c3},${c4})`, dtMs, cssProps)
  }
  private animateCssProps(ease: string, durationMs: number, cssProps: CSSProperties) {
    this._setTransition(ease, durationMs, Object.keys(cssProps));
    requestAnimationFrame(() => this.setProps(cssProps));
  }

  private _setTransition(ease: string, dtMs: number, cssProps: string[]) {
    return this.setProps({
      transitionTimingFunction: ease,
      transition: cssProps.map((key) => `${key} ${dtMs}ms`).join(","),
    });
  }

  private setPseudo(name: string, props: CSSProperties | Keyframes, reset = false) {
    var pseudo = this.pseudo.get(name);
    if (!pseudo) {
      this.pseudo.set(name, new Style(props, isKeyFrames(props) ? name : `${this.selector}:${name}`))
    } else {
      pseudo.setProps(props, reset)
    }
    return this
  }

  removeCssProps(cssProps: string[]) {
    //@ts-ignore
    for (var prop of cssProps) this.cssProps[prop] = '';
    Style.css.removeCSSProps(this.selector, cssProps);
    return this;
  }
}
