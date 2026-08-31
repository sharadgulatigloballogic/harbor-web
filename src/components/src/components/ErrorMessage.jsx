import React from "react";

export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <p style={{ color: "#B71C1C" }} role="alert">
      Error: {message}
    </p>
  );
}
