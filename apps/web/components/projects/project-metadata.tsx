import StatsCard from '@/components/ui/stats-card';

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
  const stats = [
    { value: year, label: 'Year' },
    { value: position, label: 'Position' },
    { value: category, label: 'Category' },
    { value: location, label: 'Location' },
  ];

  return <StatsCard stats={stats} className="w-full" />;
}
