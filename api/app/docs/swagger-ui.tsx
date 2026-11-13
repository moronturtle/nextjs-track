"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    SwaggerUIBundle?: (config: { url: string; dom_id: string }) => unknown;
  }
}

// Swagger UI dimuat dari CDN supaya app ini tetap ringan — tidak perlu
// memasang swagger-ui-react beserta dependensinya.
export default function SwaggerUi() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js";
    script.onload = () => {
      window.SwaggerUIBundle?.({ url: "/api/openapi.json", dom_id: "#swagger-ui" });
    };
    document.body.appendChild(script);
  }, []);

  return <div id="swagger-ui" />;
}
