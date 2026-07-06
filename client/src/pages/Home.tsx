import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LeafletMap from '@/components/LeafletMap';
import { mapPoints, type MapPoint } from '@/data/mapData';
import { ChevronRight, Search, X, ExternalLink, Navigation, Share2, Layers, MapPin, Palette, LayoutGrid, ThumbsUp } from 'lucide-react';
import { Link } from 'wouter';

export default function Home() {
  const [selectedPoint, setSelectedPoint] = useState<string | null>('ancient-1');
  const [layers, setLayers] = useState({ ancient: true, modern: true, red: true });
  const [searchText, setSearchText] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [mapTheme, setMapTheme] = useState<'green' | 'gold'>('gold');
  const [likes, setLikes] = useState<Record<string, number>>({});

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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'ancient': return '古代遗址';
      case 'modern': return '现代地标';
      case 'red': return '红色旧址';
      default: return '';
    }
  };

  const flyToPoint = useCallback((point: MapPoint) => {
    setSelectedPoint(point.id);
    setShowDetail(true);
  }, []);

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikes((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F5F2ED] flex flex-col">
      {/* 顶部Header - 金色渐变 */}
      <header className="relative z-10 shrink-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0" style={{
            background: mapTheme === 'gold'
              ? 'linear-gradient(135deg, #5C4520 0%, #8B6914 30%, #A67C30 60%, #3D2B0F 100%)'
              : 'linear-gradient(135deg, #1A2E20 0%, #2A4A30 30%, #3A5A40 60%, #0F1A12 100%)',
          }} />
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
          }} />
        </div>
        <div className="relative px-5 py-2.5 flex items-center justify-between">
          {/* Logo + 标题 */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <motion.div whileHover={{ scale: 1.05 }} className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer shadow-sm">
                <img src="/manus-storage/logo-seal_af439230.png" alt="" className="w-7 h-7 object-cover rounded" />
              </motion.div>
            </Link>
            <div>
              <h1 className="font-serif-title text-[15px] text-white tracking-wide">湖南省农耕文化地图</h1>
              <p className="text-[10px] text-white/50">万年稻作，始于湖湘</p>
            </div>
          </div>

          {/* 中间导航按钮组 - 核心功能入口 */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-white/[0.07] rounded-xl p-1 border border-white/10">
            {[
              { label: '地图浏览', href: '/map', icon: '🗺️', active: true },
              { label: '主题线路', href: '/routes', icon: '🛤️', active: false },
              { label: '发展脉络', href: '/timeline', icon: '📜', active: false },
              { label: '重要文物', href: '/artifacts', icon: '🏺', active: false },
              { label: '节气日历', href: '/solar-terms', icon: '🌾', active: false },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-medium transition-all ${
                    item.active
                      ? 'bg-white/15 text-white shadow-sm border border-white/15'
                      : 'text-white/55 hover:text-white/85 hover:bg-white/[0.06]'
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                </motion.button>
              </Link>
            ))}
          </nav>

          {/* 右侧：统计 + 切换 + 分享 */}
          <div className="flex items-center gap-3">
            {/* 统计数据 */}
            <div className="hidden xl:flex items-center gap-3 mr-2">
              {[
                { value: '128', unit: '处', label: '文化点位' },
                { value: '3', unit: '条', label: '线路' },
                { value: '24', unit: '件', label: '文物' },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-1">
                  <span className="font-num text-lg font-bold text-white">{s.value}</span>
                  <div>
                    <span className="text-[9px] text-white/50 block leading-tight">{s.unit}</span>
                    <span className="text-[8px] text-white/30 block leading-tight">{s.label}</span>
                  </div>
                  {i < 2 && <span className="w-px h-5 bg-white/10 ml-2" />}
                </div>
              ))}
            </div>

            {/* 颜色切换按钮 */}
            <div className="flex items-center gap-0.5 bg-white/[0.08] rounded-lg p-0.5 border border-white/10">
              <button
                onClick={() => setMapTheme('gold')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-[10px] font-medium transition-all ${mapTheme === 'gold' ? 'bg-[#C4A86B] text-white shadow-sm' : 'text-white/50 hover:text-white/80'}`}
              >
                <Palette className="w-3 h-3" />暖金
              </button>
              <button
                onClick={() => setMapTheme('green')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-[10px] font-medium transition-all ${mapTheme === 'green' ? 'bg-[#4A8C5C] text-white shadow-sm' : 'text-white/50 hover:text-white/80'}`}
              >
                <Palette className="w-3 h-3" />墨绿
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* 左侧面板 - 照搬xiangchao风格 */}
        <aside className="w-[260px] shrink-0 bg-white border-r border-[oklch(0.90_0.005_80)] flex flex-col z-40">
          {/* 图层控制 */}
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-sm flex items-center justify-center bg-[#8B6914]/8">
                <Layers className="w-3.5 h-3.5 text-[#8B6914]" />
              </div>
              <h3 className="text-sm font-bold tracking-wide text-[#2C2C2C]">图层控制</h3>
            </div>
            <div className="mt-3 space-y-2">
              <LayerToggle color="#8B6914" label="古代农耕遗址" count={10} active={layers.ancient} onToggle={() => setLayers({...layers, ancient: !layers.ancient})} />
              <LayerToggle color="#4A8C5C" label="现代农耕地标" count={10} active={layers.modern} onToggle={() => setLayers({...layers, modern: !layers.modern})} />
              <LayerToggle color="#C44545" label="红色农耕旧址" count={10} active={layers.red} onToggle={() => setLayers({...layers, red: !layers.red})} />
            </div>
            <div className="mt-3 h-px bg-gradient-to-r from-[#8B6914]/15 to-transparent" />
          </div>

          {/* 搜索 */}
          <div className="px-4 pb-3">
            <div className="flex items-center bg-[#F8F5F0] border border-[#E8E0D8] rounded-lg px-3 py-2">
              <Search className="w-3.5 h-3.5 text-[#A09080]" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="搜索点位名称..."
                className="flex-1 ml-2 text-xs bg-transparent outline-none text-[#3D2B0F] placeholder-[#B8A890]"
              />
            </div>
          </div>

          {/* 点位列表 - 照搬xiangchao卡片风格 */}
          <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-0.5" style={{ scrollbarWidth: 'thin' }}>
            {visiblePoints.map((point, index) => {
              const isSelected = selectedPoint === point.id;
              const color = getPointColor(point.type);
              return (
                <motion.button
                  key={point.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.03, type: 'spring', damping: 20 }}
                  onClick={() => flyToPoint(point)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-200 group text-left relative overflow-hidden ${
                    isSelected ? 'bg-[#FAF7F0] shadow-sm' : 'bg-transparent hover:bg-[#FDFBF8]'
                  }`}
                >
                  {/* 选中指示条 */}
                  {isSelected && (
                    <motion.div
                      layoutId="selectedIndicator"
                      className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r"
                      style={{ backgroundColor: color }}
                    />
                  )}

                  {/* 图标 */}
                  <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center" style={{ backgroundColor: color + '12', border: `1px solid ${color}20` }}>
                    <MapPin className="w-3.5 h-3.5" style={{ color }} />
                  </div>

                  {/* 信息 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold truncate transition-colors ${isSelected ? 'text-[#2C2C2C]' : 'text-[#4A4A4A] group-hover:text-[#2C2C2C]'}`}>
                        {point.name}
                      </span>
                      <span className="text-[8px] px-1.5 py-0.5 rounded-sm font-medium" style={{ backgroundColor: color + '12', color, border: `1px solid ${color}18` }}>
                        {getTypeLabel(point.type)}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#8B8070] mt-0.5 truncate">{point.period}</p>
                  </div>

                  {/* 点赞 */}
                  <button
                    onClick={(e) => handleLike(e, point.id)}
                    className="shrink-0 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold transition-all bg-[#F8F5F0] border border-[#E8E0D8] text-[#8B8070] hover:bg-[#FFF5E8] hover:border-[#C4A86B] hover:text-[#8B6914]"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    {(likes[point.id] ?? 0) > 0 && <span>{likes[point.id]}</span>}
                  </button>

                  {/* 箭头 */}
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-all duration-200 ${isSelected ? 'text-[#8B6914] opacity-100' : 'text-[#C4A86B] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                </motion.button>
              );
            })}
          </div>

          {/* 底部 */}
          <div className="px-4 py-2.5 border-t border-[#E8E0D8] text-[9px] text-[#B8A890] text-center">
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

          {/* 图例 */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-[#E8E0D8] rounded-lg px-4 py-2.5 flex items-center gap-4 z-30 shadow-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B6914]" />
              <span className="text-[10px] text-[#5C4520] font-medium">古代遗址</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4A8C5C]" />
              <span className="text-[10px] text-[#5C4520] font-medium">现代地标</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C44545]" />
              <span className="text-[10px] text-[#5C4520] font-medium">红色旧址</span>
            </div>
          </div>

          {/* 右侧详情面板 */}
          <AnimatePresence>
            {selected && showDetail && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="absolute top-3 right-3 w-[300px] max-h-[calc(100%-24px)] bg-white/98 backdrop-blur-md border border-[#E8E0D8] rounded-xl overflow-hidden flex flex-col z-40 shadow-xl"
              >
                {/* 头部 */}
                <div className="px-4 py-3 border-b border-[#E8E0D8] flex items-center justify-between bg-gradient-to-r from-[#FAF7F0] to-white">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: getPointColor(selected.type) }} />
                    <h3 className="font-serif-title text-sm text-[#3D2B0F]">点位详情</h3>
                  </div>
                  <button onClick={() => setShowDetail(false)} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#F5F0E8] text-[#B8A890] hover:text-[#5C4520] transition-all">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 内容 */}
                <div className="flex-1 overflow-y-auto p-4">
                  <h4 className="font-serif-title text-lg text-[#3D2B0F] mb-1.5">{selected.name}</h4>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] text-white font-medium" style={{ backgroundColor: getPointColor(selected.type) }}>
                      {getTypeLabel(selected.type)}
                    </span>
                    <span className="text-[10px] text-[#8B8070]">{selected.period}</span>
                  </div>

                  {selected.image && (
                    <div className="rounded-xl overflow-hidden mb-4 border border-[#E8E0D8] group cursor-pointer shadow-sm">
                      <img src={selected.image} alt={selected.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}

                  <p className="text-xs text-[#5C4520] leading-[1.9] mb-4">{selected.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {selected.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-[#F8F5F0] text-[#7A5C2E] text-[10px] rounded-full border border-[#E8E0D8] hover:border-[#C4A86B] hover:bg-[#FFF8E8] transition-all cursor-pointer">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* 操作 */}
                <div className="px-4 py-3 border-t border-[#E8E0D8] flex gap-2 bg-[#FDFBF8]">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#8B6914] text-white rounded-lg text-[11px] font-medium hover:bg-[#A67C30] transition-all active:scale-[0.97] shadow-sm">
                    <ExternalLink className="w-3.5 h-3.5" />查看详情
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white border border-[#E8E0D8] rounded-lg text-[11px] text-[#5C4520] hover:border-[#C4A86B] transition-all active:scale-[0.97]">
                    <Navigation className="w-3.5 h-3.5" />路线
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white border border-[#E8E0D8] rounded-lg text-[11px] text-[#5C4520] hover:border-[#C4A86B] transition-all active:scale-[0.97]">
                    <Share2 className="w-3.5 h-3.5" />分享
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function LayerToggle({ color, label, count, active, onToggle }: { color: string; label: string; count: number; active: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="w-full flex items-center gap-2.5 group py-1">
      <span className="w-3.5 h-3.5 rounded-full transition-all" style={{ backgroundColor: color, opacity: active ? 1 : 0.25, boxShadow: active ? `0 0 0 3px ${color}20` : 'none' }} />
      <span className={`text-xs flex-1 text-left font-medium transition-colors ${active ? 'text-[#3D2B0F]' : 'text-[#B8A890]'}`}>{label}</span>
      <span className="font-num text-[10px] text-[#B8A890]">{count}</span>
      <div className={`w-9 h-5 rounded-full relative transition-colors ${active ? '' : 'bg-[#E8E0D8]'}`} style={active ? { backgroundColor: color } : undefined}>
        <div className={`absolute top-[3px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform ${active ? 'left-[19px]' : 'left-[3px]'}`} />
      </div>
    </button>
  );
}
