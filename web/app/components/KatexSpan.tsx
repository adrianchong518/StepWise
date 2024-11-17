"use client";

import renderMathInElement from "katex/contrib/auto-render";
import Head from "next/head";
import { useEffect, useRef } from "react";

import "katex/dist/katex.min.css";

export default function KatexSpan({ children }: { children: React.ReactNode }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      renderMathInElement(contentRef.current, {});
    }
  }, [children]);

  return (
    <>
      <div ref={contentRef}>{children}</div>
    </>
  );
}
