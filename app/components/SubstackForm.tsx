"use client";

import { FormEvent } from "react";

export default function SubstackForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    
    // Always redirect to Substack, with email if provided
    const url = email 
      ? `https://shibusays.substack.com/subscribe?email=${encodeURIComponent(email)}`
      : `https://shibusays.substack.com/subscribe`;
    window.open(url, "_blank");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "0.25rem",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <input
        type="email"
        name="email"
        placeholder="your@email.com"
        style={{
          padding: "0.7rem 1.2rem",
          borderRadius: "11px 4px 4px 11px",
          border: "1px solid #d1d1d1",
          background: "#fff",
          fontSize: "0.9rem",
          outline: "none",
          minWidth: "228px",
          maxWidth: "100%",
          transition: "all 0.2s ease",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#ff3a3a";
          e.target.style.boxShadow = "0 0 0 3px rgba(255, 58, 58, 0.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#d1d1d1";
          e.target.style.boxShadow = "none";
        }}
      />
      <button
        type="submit"
        style={{
          padding: "0.7rem 1.4rem",
          borderRadius: "4px 11px 11px 4px",
          border: "none",
          background: "#111",
          color: "#fff",
          fontSize: "0.9rem",
          fontWeight: 500,
          cursor: "pointer",
          transition: "opacity 0.2s ease",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "0.85";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
      >
        Join ↗
      </button>
    </form>
  );
}
