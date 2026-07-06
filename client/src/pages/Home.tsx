import { useState, useCallback } from 'react';
import LeafletMap from '@/components/LeafletMap';
import { mapPoints, type MapPoint } from '@/data/mapData';
import { ChevronRight, Search, X, ExternalLink, Navigation, Share2, Layers, Volume2 } from 'lucide-react';
import { Link } from 'wouter';

export default function Home() {
  const [selectedPoint, setSelectedPoint] = useState<string | null>('ancient-1');
  const [layers, setLayers] = useState({ ancient: true, modern: true, red: true });
  const [searchText, setSearchText] = useState('');
  const [showDetail, setShowDetail] = useState(true);
  const [mapTheme, setMapTheme] = useState<'green' | 'gold'>('gold');

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

  const flyToPoint = useCallback((point: MapPoint) => {
    setSelectedPoint(point.id);
    setShowDetail(true);
  }, []);



  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#141210]">
      {/* 顶部导航条 */}
      <header className="h-14 bg-[#1C1A17] flex items-center px-5 gap-4 flex-shrink-0 border-b border-[#2A2720] z-50">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded overflow-hidden border border-[#C4A86B]/30">
            <img src="/manus-storage/logo-seal_af439230.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-serif-title text-sm text-[#E8D5A8] leading-tight">湖南省农耕文化地图</h1>
            <p className="text-[10px] text-[#8B8070]">万年稻作，始于湖湘</p>
          </div>
        </div>

        {/* 导航链接 */}
        <nav className="hidden lg:flex items-center gap-5 ml-8">
          {[
            { label: '主题线路', href: '/routes' },
            { label: '发展脉络', href: '/timeline' },
            { label: '重要文物', href: '/artifacts' },
            { label: '节气日历', href: '/solar-terms' },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <span className="text-xs text-[#B8AFA8] hover:text-[#E8D5A8] transition-colors cursor-pointer">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* 统计数据 */}
        <div className="ml-auto flex items-center gap-5">
          {[
            { value: '128', unit: '处', label: '文化点位' },
            { value: '3', unit: '条', label: '主题线路' },
            { value: '24', unit: '件', label: '重要文物' },
            { value: '24', unit: '个', label: '节气' },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-1">
              <span className="font-num text-base font-semibold text-[#E8D5A8]">{s.value}</span>
              <span className="text-[10px] text-[#8B8070]">{s.unit}</span>
              <span className="text-[10px] text-[#6B6560] ml-0.5">{s.label}</span>
            </div>
          ))}
        </div>
      </header>

      {/* 主内容区 - 全屏地图 + 左侧面板 */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* 左侧面板 */}
        <aside className="w-[260px] flex-shrink-0 bg-[#1A1815]/95 backdrop-blur-md border-r border-[#2A2720] flex flex-col z-40">
          {/* 图层控制 */}
          <div className="p-4 border-b border-[#2A2720]">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-3.5 h-3.5 text-[#8B6914]" />
              <span className="text-xs text-[#C4A86B] font-medium">图层控制</span>
            </div>
            <div className="space-y-2.5">
              <LayerItem color="#8B6914" label="古代农耕遗址" count={10} active={layers.ancient} onToggle={() => setLayers({...layers, ancient: !layers.ancient})} />
              <LayerItem color="#4A8C5C" label="现代农耕地标" count={10} active={layers.modern} onToggle={() => setLayers({...layers, modern: !layers.modern})} />
              <LayerItem color="#C44545" label="红色农耕旧址" count={10} active={layers.red} onToggle={() => setLayers({...layers, red: !layers.red})} />
            </div>
          </div>

          {/* 搜索 */}
          <div className="px-4 py-3 border-b border-[#2A2720]">
            <div className="flex items-center bg-[#0D0C0A] border border-[#2A2720] rounded px-2.5 py-1.5">
              <Search className="w-3.5 h-3.5 text-[#6B6560]" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="搜索点位名称..."
                className="flex-1 ml-2 text-xs bg-transparent outline-none text-[#D8D0C8] placeholder-[#4A5A4A]"
              />
            </div>
          </div>

          {/* 点位列表 */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-3 space-y-1">
              {visiblePoints.map((point) => (
                <button
                  key={point.id}
                  onClick={() => flyToPoint(point)}
                  className={`w-full text-left px-3 py-2.5 rounded-md flex items-center gap-2.5 transition-all duration-200 group ${
                    selectedPoint === point.id
                      ? 'bg-[#2A2720] border border-[#5A4A30]'
                      : 'hover:bg-[#1E1C18] border border-transparent'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-2 ring-offset-1 ring-offset-[#1A1815]" style={{ backgroundColor: getPointColor(point.type) }} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs truncate ${selectedPoint === point.id ? 'text-[#E8D5A8]' : 'text-[#B8AFA8] group-hover:text-[#D8D0C8]'}`}>{point.name}</p>
                    <p className="text-[10px] text-[#5A5550] truncate">{point.period}</p>
                  </div>
                  <ChevronRight className={`w-3 h-3 flex-shrink-0 transition-opacity ${selectedPoint === point.id ? 'text-[#8B6914] opacity-100' : 'opacity-0 group-hover:opacity-50 text-[#6B6560]'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* 底部信息 */}
          <div className="p-3 border-t border-[#2A2720] text-[9px] text-[#4A4540] text-center">
            数据来源：湖南省文化和旅游厅
          </div>
        </aside>

        {/* 地图区域 */}
        <div className="flex-1 relative">
          <LeafletMap
            layers={layers}
            selectedPoint={selectedPoint}
            onSelectPoint={(id) => { setSelectedPoint(id); setShowDetail(true); }}
            theme={mapTheme}
          />

          {/* 图例 - 底部左侧 */}
          <div className="absolute bottom-4 left-4 bg-[#1A1815]/90 backdrop-blur-sm border border-[#2A2720] rounded-lg px-4 py-2.5 flex items-center gap-4 z-30">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8B6914]" />
              <span className="text-[10px] text-[#B8AFA8]">古代遗址</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4A8C5C]" />
              <span className="text-[10px] text-[#B8AFA8]">现代地标</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C44545]" />
              <span className="text-[10px] text-[#B8AFA8]">红色旧址</span>
            </div>
          </div>

          {/* 主题切换按钮 */}
          <div className="absolute top-4 right-4 flex gap-2 z-30">
            <button
              onClick={() => setMapTheme('gold')}
              className={`px-3 py-1.5 rounded text-xs border transition-all ${mapTheme === 'gold' ? 'bg-[#C4A86B] text-white border-[#C4A86B]' : 'bg-[#1A1815]/90 text-[#B8AFA8] border-[#2A2720] hover:border-[#5A4A30]'}`}
            >
              暖色
            </button>
            <button
              onClick={() => setMapTheme('green')}
              className={`px-3 py-1.5 rounded text-xs border transition-all ${mapTheme === 'green' ? 'bg-[#2A4A2C] text-white border-[#4A6B4A]' : 'bg-[#1A1815]/90 text-[#B8AFA8] border-[#2A2720] hover:border-[#5A4A30]'}`}
            >
              墨绿
            </button>
          </div>

          {/* 右侧详情面板 - 带动画过渡 */}
          {selected && showDetail && (
            <div
              className="absolute top-4 right-4 bottom-4 w-[300px] bg-[#1A1815]/95 backdrop-blur-md border border-[#2A2720] rounded-xl overflow-hidden flex flex-col z-40 shadow-2xl"
              style={{ animation: 'slideInRight 0.35s cubic-bezier(0.23,1,0.32,1) both' }}
            >
              {/* 头部 */}
              <div className="px-4 py-3 border-b border-[#2A2720] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: getPointColor(selected.type) }} />
                  <h3 className="font-serif-title text-sm text-[#E8D5A8]">点位详情</h3>
                </div>
                <button onClick={() => setShowDetail(false)} className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#2A2720] text-[#6B6560] hover:text-[#B8AFA8] transition-all">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 内容 */}
              <div className="flex-1 overflow-y-auto p-4">
                <h4 className="font-serif-title text-lg text-[#E8D5A8] mb-1.5">{selected.name}</h4>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] text-white" style={{ backgroundColor: getPointColor(selected.type) }}>
                    {selected.type === 'ancient' ? '古代农耕遗址' : selected.type === 'modern' ? '现代农耕地标' : '红色农耕旧址'}
                  </span>
                  <span className="text-[10px] text-[#6B6560]">{selected.period}</span>
                </div>

                {selected.image && (
                  <div className="rounded-lg overflow-hidden mb-4 border border-[#2A2720] group cursor-pointer">
                    <img src={selected.image} alt={selected.name} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}

                <p className="text-xs text-[#B8AFA8] leading-[1.8] mb-4">{selected.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-[#2A2720] text-[#8B8070] text-[10px] rounded-full border border-[#3A3530] hover:border-[#5A4A30] hover:text-[#C4A86B] transition-all cursor-pointer">{tag}</span>
                  ))}
                </div>
              </div>

              {/* 操作 */}
              <div className="px-3 py-3 border-t border-[#2A2720] flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#C4A86B] text-[#1A1815] rounded-lg text-[11px] font-medium hover:bg-[#D4B87B] transition-all active:scale-[0.97]">
                  <ExternalLink className="w-3 h-3" />查看详情
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#2A2720] border border-[#3A3530] rounded-lg text-[11px] text-[#B8AFA8] hover:text-[#E8D5A8] hover:border-[#5A4A30] transition-all active:scale-[0.97]">
                  <Navigation className="w-3 h-3" />路线
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#2A2720] border border-[#3A3530] rounded-lg text-[11px] text-[#B8AFA8] hover:text-[#E8D5A8] hover:border-[#5A4A30] transition-all active:scale-[0.97]">
                  <Share2 className="w-3 h-3" />分享
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LayerItem({ color, label, count, active, onToggle }: { color: string; label: string; count: number; active: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="w-full flex items-center gap-2.5 group">
      <span className="w-3 h-3 rounded-full flex-shrink-0 transition-opacity" style={{ backgroundColor: color, opacity: active ? 1 : 0.3 }} />
      <span className={`text-xs flex-1 text-left transition-colors ${active ? 'text-[#D8D0C8]' : 'text-[#5A5550]'}`}>{label}</span>
      <span className="font-num text-[10px] text-[#6B6560]">{count}</span>
      <div className={`w-8 h-[18px] rounded-full relative transition-colors ${active ? 'bg-[#8B6914]' : 'bg-[#2A2720]'}`}>
        <div className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform ${active ? 'left-[18px]' : 'left-[2px]'}`} />
      </div>
    </button>
  );
}
