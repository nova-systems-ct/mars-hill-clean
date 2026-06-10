import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { TheologyOnTap } from "@/components/site/TheologyOnTap";
import { PageMeta } from "@/components/site/PageMeta";

export default function TheologyOnTapPage() {
  return (
    <main className="min-h-screen bg-white text-foreground">
      <PageMeta
        title="Theology on Tap — Mars Hill Apologetics"
        description="A monthly gathering of men devoted to the rigorous, fraternal pursuit of Biblical theology. Founded October 2017 in Connecticut. In person."
        path="/theology-on-tap"
      />
      <Nav />
      <section className="heaven-bg pt-36 pb-6 lg:pt-44">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
          <p className="eyebrow">Est. October 2017</p>
          <h1 className="mt-5 font-display text-5xl font-light leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
            Theology<span className="italic text-gold"> on Tap.</span>
          </h1>
        </div>
      </section>
      <TheologyOnTap />
      <Footer />
    </main>
  );
}
