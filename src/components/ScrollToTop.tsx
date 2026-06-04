import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Temporarily override CSS scroll-behavior so the jump is instant
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    // Restore on next frame (after scroll completes)
    requestAnimationFrame(() => {
      html.style.scrollBehavior = prev;
    });
  }, [pathname]);

  return null;
}
