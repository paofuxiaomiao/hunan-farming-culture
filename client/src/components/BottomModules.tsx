import { ChevronRight } from 'lucide-react';
import { themeRoutes, timeline, solarTerms, artifacts } from '@/data/mapData';

export default function BottomModules() {
  return (
    <section className="bg-[#FAF7F0] border-t border-[#E8DCC8]">
      <div className="max-w-[1440px] mx-auto px-4 py-4">
        <div className="grid grid-cols-12 gap-3" style={{ minHeight: '220px' }}>
          {/* 主题线路 - 3列 */}
          <div className="col-span-3">
            <ThemeRoutesModule />
          </div>
          {/* 发展脉络 - 4列 */}
          <div className="col-span-4">
            <TimelineModule />
          </div>
          {/* 二十四节气 - 2.5列 */}
          <div className="col-span-2">
            <SolarTermsModule />
          </div>
          {/* 重要文物 - 2.5列 */}
          <div className="col-span-3">
            <ArtifactsModule />
          </div>
        </div>
      </div>
    </section>
  );
}

function ThemeRoutesModule() {
  return (
    <div className="bg-white rounded-lg border border-[#E8DCC8] p-3.5 h-full shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-serif-title text-[13px] text-[#3D2B0F] flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="2" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
          </svg>
          主题线路
        </h3>
        <a href="#" className="text-[11px] text-[#8B6914] flex items-center hover:underline">
          更多线路 <ChevronRight className="w-3 h-3" />
        </a>
      </div>

      <div className="grid grid-cols-3 gap-2 flex-1">
        {themeRoutes.map((route) => (
          <div key={route.id} className="group cursor-pointer flex flex-col">
            <div className="rounded overflow-hidden mb-1.5 border border-[#E8DCC8] flex-shrink-0">
              <img
                src={route.image}
                alt={route.title}
                className="w-full h-[60px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h4 className="text-[11px] font-medium text-[#3D2B0F] mb-0.5 leading-tight">{route.title}</h4>
            <p className="text-[9px] text-[#7A5C2E] line-clamp-2 leading-relaxed">{route.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineModule() {
  return (
    <div className="bg-white rounded-lg border border-[#E8DCC8] p-3.5 h-full shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-serif-title text-[13px] text-[#3D2B0F] flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          湖湘农耕文化发展脉络
        </h3>
        <a href="#" className="text-[11px] text-[#8B6914] flex items-center hover:underline">
          查看完整脉络 <ChevronRight className="w-3 h-3" />
        </a>
      </div>

      {/* 时间轴 */}
      <div className="flex-1 flex items-center">
        <div className="flex items-start gap-0 w-full relative">
          {/* 连接线 */}
          <div className="absolute top-[18px] left-[36px] right-[36px] h-[1px] bg-[#D4C4A0]" />
          
          {timeline.map((item) => (
            <div key={item.id} className="flex flex-col items-center flex-1 relative group cursor-pointer">
              {/* 图标 */}
              <div className="w-9 h-9 rounded-full bg-[#F8F4EC] border border-[#E8DCC8] flex items-center justify-center text-sm mb-2 relative z-10 group-hover:bg-[#F5F0E8] group-hover:border-[#C4A86B] transition-colors">
                {item.icon}
              </div>
              {/* 文字 */}
              <p className="text-[10px] font-medium text-[#3D2B0F] text-center leading-tight px-0.5">{item.era}</p>
              <p className="text-[9px] text-[#7A5C2E] text-center mt-0.5 leading-tight">{item.period}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SolarTermsModule() {
  const displayTerms = solarTerms.slice(0, 8);
  
  return (
    <div className="bg-white rounded-lg border border-[#E8DCC8] p-3.5 h-full shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-serif-title text-[13px] text-[#3D2B0F]">二十四节气</h3>
        <a href="#" className="text-[11px] text-[#8B6914] flex items-center hover:underline">
          查看全部 <ChevronRight className="w-3 h-3" />
        </a>
      </div>

      <div className="grid grid-cols-4 gap-x-2 gap-y-3 flex-1 content-start">
        {displayTerms.map((term) => (
          <div key={term.id} className="flex flex-col items-center cursor-pointer group">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#E8DCC8] mb-1 group-hover:border-[#8B6914] transition-colors bg-[#F8F4EC]">
              <img src={term.icon} alt={term.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-[10px] text-[#3D2B0F] leading-tight">{term.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArtifactsModule() {
  return (
    <div className="bg-white rounded-lg border border-[#E8DCC8] p-3.5 h-full shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-serif-title text-[13px] text-[#3D2B0F]">重要文物</h3>
        <a href="#" className="text-[11px] text-[#8B6914] flex items-center hover:underline">
          查看更多 <ChevronRight className="w-3 h-3" />
        </a>
      </div>

      <div className="grid grid-cols-3 gap-2 flex-1 content-start">
        {artifacts.slice(0, 6).map((artifact) => (
          <div key={artifact.id} className="group cursor-pointer">
            <div className="rounded overflow-hidden border border-[#E8DCC8] mb-1">
              <img
                src={artifact.image}
                alt={artifact.name}
                className="w-full h-[50px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-[10px] text-[#3D2B0F] truncate leading-tight">{artifact.name}</p>
            <p className="text-[9px] text-[#7A5C2E] leading-tight">{artifact.period}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
