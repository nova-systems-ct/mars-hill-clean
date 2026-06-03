export function PodcastPlayer({
  showId = "4xnDbJFrb1gpwHfyEabZoG",
  height = 352,
}: {
  showId?: string;
  height?: number;
}) {
  return (
    <div className="overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[var(--shadow-luxe)]">
      <iframe
        title="Reformed Reference Podcast — Spotify Player"
        src={`https://open.spotify.com/embed/show/${showId}?utm_source=generator&theme=0`}
        width="100%"
        height={height}
        frameBorder={0}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="block"
      />
    </div>
  );
}
