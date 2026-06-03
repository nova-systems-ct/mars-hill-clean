import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { TheologyOnTap } from "@/components/site/TheologyOnTap";
import { PageMeta } from "@/components/site/PageMeta";

export default function TheologyOnTapPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <PageMeta
        title="Theology on Tap — Mars Hill Apologetics"
        description="A monthly gathering of men devoted to the rigorous, fraternal pursuit of Biblical theology. Founded October 2017 in Connecticut. In person and via Zoom."
        path="/theology-on-tap"
      />
      <Nav />
      <div className="pt-24">
        <TheologyOnTap />
      </div>
      <Footer />
    </main>
  );
}
