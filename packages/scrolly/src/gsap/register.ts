import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
// Optional “formerly bonus” plugins can be imported when used in examples:
// import { SplitText } from "gsap/SplitText";
// import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

let registered = false;

export function ensureGSAP() {
  if (registered) return;
  if (typeof window === "undefined") return; // SSR guard
  gsap.registerPlugin(ScrollTrigger, Flip);
  registered = true;
}
