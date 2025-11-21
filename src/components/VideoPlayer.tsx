interface VideoPlayerProps {
  embedCode: string;
  title: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ embedCode, title }) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
      <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
        <div dangerouslySetInnerHTML={{ __html: embedCode }} />
      </div>
    </div>
  );
};