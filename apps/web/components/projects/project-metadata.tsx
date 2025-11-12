import StatsCard from '@/components/ui/stats-card';

interface ProjectMetadataProps {
  year: string;
  position: string;
  tagline: string;
  location: string;
}

export default function ProjectMetadata({
  year,
  position,
  tagline,
  location,
}: ProjectMetadataProps) {
  const stats = [
    { value: year, label: 'Year' },
    { value: position, label: 'Position' },
    { value: tagline, label: 'Category' },
    { value: location, label: 'Location' },
  ];

  return <StatsCard stats={stats} className="w-full" />;
}
