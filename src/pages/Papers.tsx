import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Papers } from "@/components/site/Papers";
import { PageMeta } from "@/components/site/PageMeta";

export default function PapersPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <PageMeta
        title="Seminary Papers — Mars Hill Apologetics"
        description="A working archive of graduate-level theological writing by John Leonetti — open to the church, freely given for study, prayer, and conversation."
        path="/papers"
      />
      <Nav />
      <div className="pt-24">
        <Papers />
      </div>
      <Footer />
    </main>
  );
}
