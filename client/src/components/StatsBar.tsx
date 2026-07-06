import { MapPin, Route, Landmark, Sun } from 'lucide-react';

const stats = [
  { icon: MapPin, label: '文化点位', value: '128', unit: '处' },
  { icon: Route, label: '主题线路', value: '3', unit: '条' },
  { icon: Landmark, label: '重要文物', value: '24', unit: '件' },
  { icon: Sun, label: '二十四节气', value: '24', unit: '个' },
];

export default function StatsBar() {
  return (
    <div className="bg-gradient-to-b from-[#FDFBF7] to-[#FAF7F0] border-b border-[#E8DCC8]">
      <div className="max-w-[1440px] mx-auto px-6 py-2.5 flex items-center justify-center">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center">
            <div className="flex items-center gap-2 px-6">
              <stat.icon className="w-4 h-4 text-[#8B6914]" strokeWidth={1.5} />
              <span className="text-[13px] text-[#5C4520]">{stat.label}</span>
              <span className="font-num text-xl font-semibold text-[#8B6914] ml-1">{stat.value}</span>
              <span className="text-[13px] text-[#8B6914]/70">{stat.unit}</span>
            </div>
            {i < stats.length - 1 && (
              <span className="w-px h-5 bg-[#D4C4A0]/60" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
