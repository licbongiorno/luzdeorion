import React from "react";
type Props = { name: "arrow" | "menu" | "close" | "spark" | "whatsapp" | "leaf" | "sun" };
export default function Icon({ name }: Props) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  const paths: Record<Props["name"], React.ReactNode> = {
    arrow: <><path d="M4 12h15M13 5l7 7-7 7"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    spark: <><path d="m12 2 1.8 7.2L21 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2Z"/></>,
    whatsapp: <><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.6A8.5 8.5 0 1 1 20.5 11.5Z"/><path d="M8.5 8.5c.5 3 2.5 5 5.5 6"/></>,
    leaf: <><path d="M20 4C10 4 5 8 5 14a6 6 0 0 0 6 6c6 0 9-7 9-16Z"/><path d="M4 21c3-5 7-8 13-12"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}