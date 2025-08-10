interface StatItem {
  value: string | number;
  label: string;
}

interface StatsCardProps {
  stats: StatItem[];
  className?: string;
}

export default function StatsCard({ stats, className = '' }: StatsCardProps) {
  const gridCols = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
  }[stats.length] || 'md:grid-cols-3';

  return (
    <div className={`inline-grid grid-cols-1 ${gridCols} gap-8 perplexity-card ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={index > 0 ? 'md:border-l border-dotted border-gray-400 md:pl-8' : ''}
        >
          <h2 className="text-2xl font-bold text-white mb-2">{stat.value}</h2>
          <p className="text-gray-400 text-lg">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}