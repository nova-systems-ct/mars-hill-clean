import { useEffect } from "react";

interface PageMetaProps {
  title: string;
  description: string;
  path?: string;
}

export function PageMeta({ title, description, path = "" }: PageMetaProps) {
  const fullTitle = title.includes("Mars Hill") ? title : `${title} — Mars Hill Apologetics`;
  const url = `https://marshillapologetics.com${path}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const [key, val] = selector.replace("meta[", "").replace("]", "").split("=");
        el.setAttribute(key.trim(), val.replace(/"/g, ""));
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[name="twitter:card"]', "content", "summary");
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", description);
  }, [fullTitle, description, url]);

  return null;
}
