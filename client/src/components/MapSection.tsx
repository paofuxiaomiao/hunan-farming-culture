import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Minus, Search, X, Navigation, ExternalLink, Share2 } from 'lucide-react';
import { mapPoints, hunanCities, type MapPoint } from '@/data/mapData';

interface MapSectionProps {
  selectedPoint: string | null;
  setSelectedPoint: (id: string | null) => void;
  layers: { ancient: boolean; modern: boolean; red: boolean };
  setLayers: (layers: { ancient: boolean; modern: boolean; red: boolean }) => void;
}

// 坐标转换：经纬度 -> SVG坐标
function lngLatToSvg(lng: number, lat: number): { x: number; y: number } {
  const minLng = 108.6;
  const maxLng = 114.5;
  const minLat = 24.6;
  const maxLat = 30.5;
  const svgWidth = 560;
  const svgHeight = 540;
  const padding = 30;
  const x = padding + ((lng - minLng) / (maxLng - minLng)) * (svgWidth - padding * 2);
  const y = padding + ((maxLat - lat) / (maxLat - minLat)) * (svgHeight - padding * 2);
  return { x, y };
}

export default function MapSection({ selectedPoint, setSelectedPoint, layers, setLayers }: MapSectionProps) {
  const [filterPanelOpen, setFilterPanelOpen] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [zoom, setZoom] = useState(1);

  const visiblePoints = mapPoints.filter((p) => {
    if (p.type === 'ancient' && !layers.ancient) return false;
    if (p.type === 'modern' && !layers.modern) return false;
    if (p.type === 'red' && !layers.red) return false;
    if (searchText && !p.name.includes(searchText)) return false;
    return true;
  });

  const selected = mapPoints.find((p) => p.id === selectedPoint);

  const getPointColor = (type: string) => {
    switch (type) {
      case 'ancient': return '#8B6914';
      case 'modern': return '#4A8C5C';
      case 'red': return '#C44545';
      default: return '#8B6914';
    }
  };

  const getPointBg = (type: string) => {
    switch (type) {
      case 'ancient': return 'bg-[#8B6914]';
      case 'modern': return 'bg-[#4A8C5C]';
      case 'red': return 'bg-[#C44545]';
      default: return 'bg-[#8B6914]';
    }
  };

  // 湖南省真实轮廓路径（简化版，基于实际地理边界）
  const hunanPath = `M 248 32 C 258 28, 272 30, 285 28 C 298 26, 308 32, 322 30 
    C 336 28, 348 25, 362 30 C 376 35, 388 32, 400 38 C 412 44, 422 40, 435 48 
    C 448 56, 458 52, 468 60 C 478 68, 486 72, 492 82 C 498 92, 502 100, 506 112 
    C 510 124, 508 136, 512 148 C 516 160, 520 170, 518 184 C 516 198, 510 210, 506 222 
    C 502 234, 505 246, 500 258 C 495 270, 490 280, 486 292 C 482 304, 485 316, 480 328 
    C 475 340, 468 350, 462 362 C 456 374, 452 384, 444 394 C 436 404, 426 412, 416 420 
    C 406 428, 395 432, 384 438 C 373 444, 362 448, 350 452 C 338 456, 326 458, 314 460 
    C 302 462, 290 460, 278 462 C 266 464, 254 466, 242 464 C 230 462, 220 456, 210 450 
    C 200 444, 190 436, 180 428 C 170 420, 162 410, 154 400 C 146 390, 138 380, 132 368 
    C 126 356, 122 344, 118 332 C 114 320, 110 308, 108 296 C 106 284, 108 272, 105 260 
    C 102 248, 98 238, 98 226 C 98 214, 102 202, 100 190 C 98 178, 94 168, 96 155 
    C 98 142, 104 132, 108 120 C 112 108, 118 98, 124 86 C 130 74, 136 64, 142 56 
    C 148 48, 158 42, 170 38 C 182 34, 195 32, 208 30 C 221 28, 235 30, 248 32 Z`;

  return (
    <section id="section-0" className="flex-1 relative">
      <div className="max-w-[1440px] mx-auto px-4 py-4 flex gap-4" style={{ height: '560px' }}>
        {/* 左侧筛选面板 */}
        <div className={`transition-all duration-300 ${filterPanelOpen ? 'w-[220px]' : 'w-0 overflow-hidden'} flex-shrink-0`}>
          <div className="bg-white rounded-lg border border-[#E8DCC8] h-full p-4 flex flex-col shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-title text-sm text-[#3D2B0F] flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="2">
                  <path d="M3 6h18M6 12h12M9 18h6" />
                </svg>
                图层筛选
              </h3>
              <button onClick={() => setFilterPanelOpen(false)} className="text-[#8B6914] hover:text-[#5C4520] transition-colors">
                <ChevronLeft className="w-4 h-4" />
                <ChevronLeft className="w-4 h-4 -ml-2.5" />
              </button>
            </div>

            {/* 图层控制 */}
            <div className="mb-5">
              <p className="text-xs text-[#7A5C2E] mb-3 font-medium">图层控制</p>
              <div className="space-y-3">
                <LayerToggle
                  color="#8B6914"
                  label="古代农耕遗址"
                  active={layers.ancient}
                  onToggle={() => setLayers({ ...layers, ancient: !layers.ancient })}
                />
                <LayerToggle
                  color="#4A8C5C"
                  label="现代农耕地标"
                  active={layers.modern}
                  onToggle={() => setLayers({ ...layers, modern: !layers.modern })}
                />
                <LayerToggle
                  color="#C44545"
                  label="红色农耕旧址"
                  active={layers.red}
                  onToggle={() => setLayers({ ...layers, red: !layers.red })}
                />
              </div>
            </div>

            {/* 搜索 */}
            <div className="mb-5">
              <p className="text-xs text-[#7A5C2E] mb-2 font-medium">点位搜索</p>
              <div className="flex items-center border border-[#E8DCC8] rounded-md px-2 py-1.5 bg-[#FDFBF7]">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="搜索点位名称..."
                  className="flex-1 text-xs bg-transparent outline-none text-[#3D2B0F] placeholder-[#B8A07A]"
                />
                <Search className="w-3.5 h-3.5 text-[#8B6914]" />
              </div>
            </div>

            {/* 图例说明 */}
            <div className="mt-auto pt-4 border-t border-[#E8DCC8]">
              <p className="text-xs text-[#7A5C2E] mb-2 font-medium">图例说明</p>
              <div className="space-y-2 text-xs text-[#5C4520]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#8B6914] flex-shrink-0" />
                  <span>古代农耕遗址（远古—清代）</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#4A8C5C] flex-shrink-0" />
                  <span>现代农耕地标（近现代—至今）</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#C44545] flex-shrink-0" />
                  <span>红色农耕旧址（革命时期）</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 折叠按钮 */}
        {!filterPanelOpen && (
          <button
            onClick={() => setFilterPanelOpen(true)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#E8DCC8] rounded-r-md px-1 py-4 shadow-sm hover:bg-[#FAF7F0]"
          >
            <ChevronRight className="w-4 h-4 text-[#8B6914]" />
          </button>
        )}

        {/* 中央地图 */}
        <div className="flex-1 map-container overflow-hidden relative bg-[#FDFCF8]">
          {/* 缩放控制 */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
            <button onClick={() => setZoom(Math.min(zoom + 0.15, 1.8))} className="w-7 h-7 bg-white border border-[#E8DCC8] rounded flex items-center justify-center hover:bg-[#FAF7F0] shadow-sm">
              <Plus className="w-3.5 h-3.5 text-[#5C4520]" />
            </button>
            <button onClick={() => setZoom(Math.max(zoom - 0.15, 0.7))} className="w-7 h-7 bg-white border border-[#E8DCC8] rounded flex items-center justify-center hover:bg-[#FAF7F0] shadow-sm">
              <Minus className="w-3.5 h-3.5 text-[#5C4520]" />
            </button>
            <button className="w-7 h-7 bg-white border border-[#E8DCC8] rounded flex items-center justify-center hover:bg-[#FAF7F0] shadow-sm mt-1">
              <Navigation className="w-3.5 h-3.5 text-[#5C4520]" />
            </button>
          </div>

          {/* SVG地图 */}
          <div className="w-full h-full flex items-center justify-center overflow-hidden" style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.3s ease' }}>
            <svg viewBox="0 0 560 540" className="w-full h-full" style={{ maxWidth: '520px', maxHeight: '500px' }}>
              {/* 省份轮廓 */}
              <path
                d={hunanPath}
                fill="#F8F4EC"
                stroke="#C4A86B"
                strokeWidth="1.5"
                className="drop-shadow-sm"
              />
              
              {/* 内部等高线纹理 */}
              <g opacity="0.06">
                <path d="M 150 180 Q 250 160 350 180 T 480 170" fill="none" stroke="#8B6914" strokeWidth="0.6" />
                <path d="M 140 240 Q 250 220 360 240 T 490 230" fill="none" stroke="#8B6914" strokeWidth="0.6" />
                <path d="M 160 300 Q 270 280 370 300 T 470 290" fill="none" stroke="#8B6914" strokeWidth="0.6" />
                <path d="M 170 360 Q 280 340 380 360 T 460 350" fill="none" stroke="#8B6914" strokeWidth="0.6" />
                <path d="M 180 120 Q 280 100 380 120 T 490 110" fill="none" stroke="#8B6914" strokeWidth="0.6" />
              </g>

              {/* 河流 - 湘江、资水、沅江、澧水 */}
              <g opacity="0.35">
                {/* 湘江 */}
                <path d="M 380 460 Q 370 400 360 350 Q 350 300 360 260 Q 370 220 380 180 Q 390 140 395 100" fill="none" stroke="#7BAAB8" strokeWidth="1.8" strokeLinecap="round" />
                {/* 资水 */}
                <path d="M 200 350 Q 240 320 280 300 Q 320 280 350 270" fill="none" stroke="#7BAAB8" strokeWidth="1.2" strokeLinecap="round" />
                {/* 沅江 */}
                <path d="M 120 260 Q 180 250 240 240 Q 300 230 340 220 Q 380 210 400 200" fill="none" stroke="#7BAAB8" strokeWidth="1.2" strokeLinecap="round" />
                {/* 澧水 */}
                <path d="M 160 100 Q 200 95 240 90 Q 280 85 320 80" fill="none" stroke="#7BAAB8" strokeWidth="1" strokeLinecap="round" />
                {/* 洞庭湖 */}
                <ellipse cx="370" cy="85" rx="30" ry="18" fill="#7BAAB8" opacity="0.2" stroke="#7BAAB8" strokeWidth="0.5" />
              </g>

              {/* 城市标注 */}
              {hunanCities.map((city) => {
                const { x, y } = lngLatToSvg(city.lng, city.lat);
                return (
                  <g key={city.name}>
                    {city.isCapital ? (
                      <>
                        <circle cx={x} cy={y} r="3.5" fill="none" stroke="#333" strokeWidth="1" />
                        <circle cx={x} cy={y} r="1.5" fill="#C44545" />
                      </>
                    ) : (
                      <circle cx={x} cy={y} r="2" fill="#666" opacity="0.5" />
                    )}
                    <text x={x + 6} y={y + 3} fontSize="9" fill="#555" opacity="0.8" fontFamily="Noto Sans SC">{city.name}</text>
                  </g>
                );
              })}

              {/* 文化点位标注 */}
              {visiblePoints.map((point) => {
                const { x, y } = lngLatToSvg(point.lng, point.lat);
                const color = getPointColor(point.type);
                const isSelected = point.id === selectedPoint;
                return (
                  <g
                    key={point.id}
                    onClick={() => setSelectedPoint(point.id)}
                    className="cursor-pointer"
                  >
                    {/* 选中光晕 */}
                    {isSelected && (
                      <circle cx={x} cy={y} r="14" fill={color} opacity="0.12">
                        <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.12;0.04;0.12" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}
                    {/* 标注图标 */}
                    <g transform={`translate(${x - 8}, ${y - 16})`}>
                      <path
                        d="M8 0C4.5 0 1.5 3 1.5 6.5C1.5 11 8 16 8 16S14.5 11 14.5 6.5C14.5 3 11.5 0 8 0Z"
                        fill={color}
                        stroke="white"
                        strokeWidth="1.5"
                        opacity={isSelected ? 1 : 0.85}
                      />
                      <circle cx="8" cy="6.5" r="2.5" fill="white" />
                    </g>
                    {/* 名称标签 - 仅选中时显示 */}
                    {isSelected && (
                      <g>
                        <rect x={x - 45} y={y - 34} width="90" height="16" rx="3" fill={color} opacity="0.95" />
                        <text x={x} y={y - 23} textAnchor="middle" fontSize="9" fill="white" fontWeight="500" fontFamily="Noto Sans SC">
                          {point.name.length > 9 ? point.name.slice(0, 9) + '…' : point.name}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* 比例尺 */}
              <g transform="translate(60, 510)">
                <line x1="0" y1="0" x2="80" y2="0" stroke="#666" strokeWidth="1" />
                <line x1="0" y1="-4" x2="0" y2="4" stroke="#666" strokeWidth="1" />
                <line x1="40" y1="-3" x2="40" y2="3" stroke="#666" strokeWidth="0.8" />
                <line x1="80" y1="-4" x2="80" y2="4" stroke="#666" strokeWidth="1" />
                <text x="0" y="14" fontSize="8" fill="#666">0</text>
                <text x="35" y="14" fontSize="8" fill="#666">50</text>
                <text x="68" y="14" fontSize="8" fill="#666">100km</text>
              </g>
            </svg>
          </div>
        </div>

        {/* 右侧详情面板 */}
        <div className="w-[280px] flex-shrink-0 bg-white rounded-lg border border-[#E8DCC8] shadow-sm overflow-hidden flex flex-col">
          {selected ? (
            <>
              {/* 面板头部 */}
              <div className="px-4 py-3 border-b border-[#E8DCC8] flex items-center justify-between">
                <h3 className="font-serif-title text-sm text-[#3D2B0F] flex items-center gap-2">
                  <MapPinIcon type={selected.type} />
                  点位详情
                </h3>
                <button onClick={() => setSelectedPoint(null)} className="text-[#B8A07A] hover:text-[#5C4520]">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 内容 */}
              <div className="flex-1 overflow-y-auto px-4 py-3">
                {/* 标题 + 导航 */}
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-serif-title text-[15px] text-[#3D2B0F] leading-tight">{selected.name}</h4>
                  <div className="flex gap-1">
                    <button className="w-6 h-6 border border-[#E8DCC8] rounded flex items-center justify-center hover:bg-[#FAF7F0]">
                      <ChevronLeft className="w-3 h-3 text-[#8B6914]" />
                    </button>
                    <button className="w-6 h-6 border border-[#E8DCC8] rounded flex items-center justify-center hover:bg-[#FAF7F0]">
                      <ChevronRight className="w-3 h-3 text-[#8B6914]" />
                    </button>
                  </div>
                </div>

                {/* 类型标签 */}
                <span className={`inline-block px-2 py-0.5 rounded text-[11px] text-white mb-3 ${getPointBg(selected.type)}`}>
                  {selected.type === 'ancient' ? '古代农耕遗址' : selected.type === 'modern' ? '现代农耕地标' : '红色农耕旧址'}
                </span>

                {/* 图片 */}
                {selected.image && (
                  <div className="rounded-md overflow-hidden mb-3 border border-[#E8DCC8]">
                    <img src={selected.image} alt={selected.name} className="w-full h-32 object-cover" />
                  </div>
                )}

                {/* 描述 */}
                <p className="text-xs text-[#5C4520] leading-relaxed mb-3">{selected.description}</p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-[#F5F0E8] text-[#7A5C2E] text-[11px] rounded border border-[#E8DCC8]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 底部操作 */}
              <div className="px-3 py-2.5 border-t border-[#E8DCC8] flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-[#FAF7F0] border border-[#E8DCC8] rounded text-[11px] text-[#5C4520] hover:bg-[#F5F0E8] transition-colors">
                  <ExternalLink className="w-3 h-3" />
                  查看详情
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-[#FAF7F0] border border-[#E8DCC8] rounded text-[11px] text-[#5C4520] hover:bg-[#F5F0E8] transition-colors">
                  <Navigation className="w-3 h-3" />
                  路线规划
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-[#FAF7F0] border border-[#E8DCC8] rounded text-[11px] text-[#5C4520] hover:bg-[#F5F0E8] transition-colors">
                  <Share2 className="w-3 h-3" />
                  一键分享
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-[#B8A07A]">
              请在地图上选择一个点位
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function LayerToggle({ color, label, active, onToggle }: { color: string; label: string; active: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
        <span className="text-xs text-[#3D2B0F]">{label}</span>
      </div>
      <button
        onClick={onToggle}
        className={`toggle-switch ${active ? 'active' : 'inactive'}`}
        style={active ? { backgroundColor: color } : undefined}
      />
    </div>
  );
}

function MapPinIcon({ type }: { type: string }) {
  const color = type === 'ancient' ? '#8B6914' : type === 'modern' ? '#4A8C5C' : '#C44545';
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="9" r="2.5" fill={color} />
    </svg>
  );
}
