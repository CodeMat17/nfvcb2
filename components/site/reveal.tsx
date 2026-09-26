import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
  /**
   * Above-the-fold content: plays a CSS-only rise on load instead of waiting for
   * the scroll observer, so it is visible from the very first paint (LCP).
   */
  eager?: boolean;
};

/**
 * Scroll reveal with no client JavaScript of its own. `revealScript` (inlined in
 * the root layout's <head>) adds `is-in` as each `.reveal` enters the viewport,
 * so the effect never waits for React to hydrate and adds nothing to it. With
 * scripts disabled or reduced motion requested, content is simply shown.
 */
export function Reveal({ children, delay = 0, className, as = "div", eager = false }: Props) {
  const Tag = as;
  const style = delay
    ? ({ [eager ? "animationDelay" : "transitionDelay"]: `${delay}ms` } as CSSProperties)
    : undefined;

  return (
    <Tag
      className={cn(eager ? "rise" : "reveal", className)}
      style={style}
      // The head script adds `is-in` before React hydrates this node.
      suppressHydrationWarning
    >
      {children}
    </Tag>
  );
}

/**
 * Observes every `.reveal` as it is parsed or later inserted by client-side
 * navigation, and marks it `is-in` once it scrolls into view.
 */
export const revealScript = `(function(){var d=document.documentElement;if(!("IntersectionObserver"in window)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("rv");var io=new IntersectionObserver(function(es){for(var i=0;i<es.length;i++){var e=es[i];if(e.isIntersecting){e.target.classList.add("is-in");io.unobserve(e.target)}}},{rootMargin:"0px 0px -8% 0px",threshold:0.08});function scan(n){if(n.nodeType!==1)return;if(n.classList.contains("reveal")&&!n.classList.contains("is-in"))io.observe(n);var l=n.querySelectorAll(".reveal:not(.is-in)");for(var i=0;i<l.length;i++)io.observe(l[i])}new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var a=ms[i].addedNodes;for(var j=0;j<a.length;j++)scan(a[j])}}).observe(d,{childList:true,subtree:true})})();`;
