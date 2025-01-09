import { lerp } from "../math";
import { animate } from "../math/animation";

export function overflowScrollInto(params: { container: HTMLElement, content: HTMLElement, fps?: number, total_time_in_ms?: number, animationToOverride?: number }) {
    var { container, content } = params;
    var scrollFrom = container.scrollTop;
    var scrollTo = content.offsetTop - container.offsetTop - Math.max(content.clientHeight, content.offsetHeight) * 2;
    if (params.animationToOverride)
        clearInterval(params.animationToOverride)
    return animate(params.fps ?? 120, params.total_time_in_ms ?? 200, (t) => container.scrollTop = lerp(t, scrollFrom, scrollTo));
}

export function overflowYVisible(container: HTMLElement, content: HTMLElement): boolean {
    var contentPos = content.offsetTop;
    var containerPos = container.scrollTop + container.offsetTop;
    return containerPos <= contentPos && contentPos + content.clientHeight <= containerPos + container.clientHeight
}

export function overflowXVisible(container: HTMLElement, content: HTMLElement): boolean {
    var contentPos = content.offsetLeft;
    return container.scrollLeft <= contentPos && contentPos <= container.scrollLeft + container.clientWidth
}
