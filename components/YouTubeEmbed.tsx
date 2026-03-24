interface YouTubeEmbedProps {
  embedId: string;
}

export default function YouTubeEmbed({ embedId }: YouTubeEmbedProps) {
  return (
    <div className="video-responsive relative overflow-hidden pb-[56.25%] h-0 rounded-[var(--radius-2xl)] shadow-lg">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
}
