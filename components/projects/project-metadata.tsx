interface ProjectMetadataProps {
  year: string;
  position: string;
  category: string;
  location: string;
}

export default function ProjectMetadata({
  year,
  position,
  category,
  location,
}: ProjectMetadataProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 rounded-lg bg-gray-900/50 p-8">
      <div>
        <h3 className="text-lg text-gray-400 mb-2">Year</h3>
        <p className="text-xl text-white">{year}</p>
      </div>
      <div>
        <h3 className="text-lg text-gray-400 mb-2">Position</h3>
        <p className="text-xl text-white">{position}</p>
      </div>
      <div>
        <h3 className="text-lg text-gray-400 mb-2">Category</h3>
        <p className="text-xl text-white">{category}</p>
      </div>
      <div>
        <h3 className="text-lg text-gray-400 mb-2">Location</h3>
        <p className="text-xl text-white">{location}</p>
      </div>
    </div>
  );
}
