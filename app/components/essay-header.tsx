export function EssayHeader({ title, date }: { title: string; date: string }) {
  return (
    <div style={{ textAlign: "left", marginTop: "40px" }}>
      <h1
        className="hero-heading"
        style={{
          marginTop: "0",
          fontSize: "36px", // Smaller than 42px, more like h2
          lineHeight: "1.2",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          color: "#2f2f2f",
          fontFamily: "var(--font-plex-sans)",
          fontWeight: "600",
        }}
      >
        {date}
      </p>
    </div>
  );
}
