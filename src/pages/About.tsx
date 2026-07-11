import { Link } from "react-router-dom";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { About } from "@/components/site/About";
import { PageMeta } from "@/components/site/PageMeta";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-foreground">
      <PageMeta
        title="About John Leonetti — Mars Hill Apologetics"
        description="John Leonetti has walked with Christ since 1985 and devoted himself to Christian apologetics. Founder of Theology on Tap and Mars Hill Apologetics."
        path="/about"
      />
      <Nav />
      <section className="heaven-bg pt-36 pb-10 lg:pt-44">
        <Breadcrumbs items={[{ label: "About" }]} />
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
          <p className="eyebrow">The Founder</p>
          <h1 className="mt-5 font-display text-5xl font-light leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
            About<span className="italic text-gold"> John Leonetti.</span>
          </h1>
          <div className="gold-rule mx-auto my-7 max-w-[8rem]" />
        </div>
      </section>
      <About />
      <div className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-gold hover:text-navy"
        >
          Get in touch →
        </Link>
      </div>
      <Footer />
    </main>
  );
}
