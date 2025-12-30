import type { ReactNode, CSSProperties } from "react";

type EssayThemeProps = {
  children: ReactNode;
  h2Color?: string;
  className?: string;
};

export function EssayTheme({ children, h2Color, className }: EssayThemeProps) {
  const style = h2Color
    ? ({ "--essay-h2-color": h2Color } as CSSProperties)
    : undefined;

  return (
    <section className={`essay-theme ${className ?? ""}`.trim()} style={style}>
      {children}
    </section>
  );
}
