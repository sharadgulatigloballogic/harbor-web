import React from "react";
import "../styles/layout.css";

export default function AppLayout({ title, subtitle, children }) {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ marginBottom: 4 }}>{title}</h1>
        {subtitle ? <p className="muted" style={{ marginTop: 0 }}>{subtitle}</p> : null}
      </header>
      <main>{children}</main>
    </div>
  );
}
