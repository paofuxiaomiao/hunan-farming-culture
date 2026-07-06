import { useState, useRef, useCallback } from 'react';
import Header from '@/components/Header';
import StatsBar from '@/components/StatsBar';
import Footer from '@/components/Footer';
import { MapView } from '@/components/Map';
import { mapPoints, hunanCities, type MapPoint } from '@/data/mapData';
import { ChevronLeft, ChevronRight, Plus, Minus, Search, X, Navigation, ExternalLink, Share2 } from 'lucide-react';
import { Link } from 'wouter';

export default function Home() {
  const [selectedPoint, setSelectedPoint] = useState<string | null>('ancient-1');
  const [layers, setLayers] = useState({
    ancient: true,
    modern: true,
    red: true,
  });
  const [filterPanelOpen, setFilterPanelOpen] = useState(true);
  const [searchText, setSearchText] = useState('');
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

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

  const flyToPoint = useCallback((point: MapPoint) => {
    if (mapRef.current) {
      mapRef.current.panTo({ lat: point.lat, lng: point.lng });
      mapRef.current.setZoom(10);
    }
    setSelectedPoint(point.id);
  }, []);

  const handleMapReady = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    // 设置地图样式 - 暖色调复古风格
    map.setOptions({
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#f5f0e8' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f0e8' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#5c4520' }] },
        { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#c4a86b' }] },
        { featureType: 'administrative.province', elementType: 'geometry.stroke', stylers: [{ color: '#8B6914', weight: 2 }] },
        { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#d4e8e0' }] },
        { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#6b9dab' }] },
        { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#e8dcc8' }] },
        { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
        { featureType: 'poi', stylers: [{ visibility: 'off' }] },
        { featureType: 'transit', stylers: [{ visibility: 'off' }] },
        { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#f0ebe0' }] },
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false,
    });

    // 添加标注点
    addMarkers(map);
  }, []);

  const addMarkers = (map: google.maps.Map) => {
    // 清除旧标注
    markersRef.current.forEach(m => m.map = null);
    markersRef.current = [];

    visiblePoints.forEach((point) => {
      const color = getPointColor(point.type);
      
      // 创建自定义标注元素
      const pinElement = document.createElement('div');
      pinElement.innerHTML = `
        <div style="position:relative;cursor:pointer;">
          <svg width="28" height="36" viewBox="0 0 28 36">
            <path d="M14 0C6.3 0 0 6.3 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.3 21.7 0 14 0z" fill="${color}" stroke="white" stroke-width="2"/>
            <circle cx="14" cy="14" r="5" fill="white"/>
          </svg>
        </div>
      `;

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: point.lat, lng: point.lng },
        title: point.name,
        content: pinElement,
      });

      marker.addListener('click', () => {
        setSelectedPoint(point.id);
      });

      markersRef.current.push(marker);
    });
  };

  // 当图层变化时重新添加标注
  const handleLayerChange = (newLayers: typeof layers) => {
    setLayers(newLayers);
    if (mapRef.current) {
      setTimeout(() => addMarkers(mapRef.current!), 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <StatsBar />
      
      {/* 主地图区域 */}
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
                  <LayerToggle color="#8B6914" label="古代农耕遗址" active={layers.ancient} onToggle={() => handleLayerChange({ ...layers, ancient: !layers.ancient })} />
                  <LayerToggle color="#4A8C5C" label="现代农耕地标" active={layers.modern} onToggle={() => handleLayerChange({ ...layers, modern: !layers.modern })} />
                  <LayerToggle color="#C44545" label="红色农耕旧址" active={layers.red} onToggle={() => handleLayerChange({ ...layers, red: !layers.red })} />
                </div>
              </div>

              {/* 搜索 */}
              <div className="mb-4">
                <p className="text-xs text-[#7A5C2E] mb-2 font-medium">点位搜索</p>
                <div className="flex items-center border border-[#E8DCC8] rounded-md px-2 py-1.5 bg-[#FDFBF7]">
                  <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="搜索点位名称..." className="flex-1 text-xs bg-transparent outline-none text-[#3D2B0F] placeholder-[#B8A07A]" />
                  <Search className="w-3.5 h-3.5 text-[#8B6914]" />
                </div>
              </div>

              {/* 点位列表 */}
              <div className="flex-1 overflow-y-auto -mx-2 px-2 space-y-1">
                {visiblePoints.slice(0, 12).map((point) => (
                  <button
                    key={point.id}
                    onClick={() => flyToPoint(point)}
                    className={`w-full text-left px-2 py-1.5 rounded text-xs flex items-center gap-2 transition-colors ${
                      selectedPoint === point.id ? 'bg-[#F5F0E8] border border-[#C4A86B]' : 'hover:bg-[#FAF7F0]'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: getPointColor(point.type) }} />
                    <span className="truncate text-[#3D2B0F]">{point.name}</span>
                  </button>
                ))}
              </div>

              {/* 图例说明 */}
              <div className="pt-3 border-t border-[#E8DCC8] mt-2">
                <p className="text-xs text-[#7A5C2E] mb-2 font-medium">图例说明</p>
                <div className="space-y-1.5 text-[11px] text-[#5C4520]">
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#8B6914]" />古代农耕遗址</div>
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#4A8C5C]" />现代农耕地标</div>
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#C44545]" />红色农耕旧址</div>
                </div>
              </div>
            </div>
          </div>

          {/* 折叠按钮 */}
          {!filterPanelOpen && (
            <button onClick={() => setFilterPanelOpen(true)} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#E8DCC8] rounded-r-md px-1 py-4 shadow-sm hover:bg-[#FAF7F0]">
              <ChevronRight className="w-4 h-4 text-[#8B6914]" />
            </button>
          )}

          {/* 中央Google Maps地图 */}
          <div className="flex-1 rounded-lg overflow-hidden border border-[#E8DCC8] shadow-sm">
            <MapView
              className="w-full h-full"
              initialCenter={{ lat: 27.6, lng: 111.7 }}
              initialZoom={7}
              onMapReady={handleMapReady}
            />
          </div>

          {/* 右侧详情面板 */}
          <div className="w-[280px] flex-shrink-0 bg-white rounded-lg border border-[#E8DCC8] shadow-sm overflow-hidden flex flex-col">
            {selected ? (
              <>
                <div className="px-4 py-3 border-b border-[#E8DCC8] flex items-center justify-between">
                  <h3 className="font-serif-title text-sm text-[#3D2B0F] flex items-center gap-2">
                    <MapPinIcon type={selected.type} />
                    点位详情
                  </h3>
                  <button onClick={() => setSelectedPoint(null)} className="text-[#B8A07A] hover:text-[#5C4520]">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-serif-title text-[15px] text-[#3D2B0F] leading-tight">{selected.name}</h4>
                    <div className="flex gap-1">
                      <button className="w-6 h-6 border border-[#E8DCC8] rounded flex items-center justify-center hover:bg-[#FAF7F0]"><ChevronLeft className="w-3 h-3 text-[#8B6914]" /></button>
                      <button className="w-6 h-6 border border-[#E8DCC8] rounded flex items-center justify-center hover:bg-[#FAF7F0]"><ChevronRight className="w-3 h-3 text-[#8B6914]" /></button>
                    </div>
                  </div>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] text-white mb-3 ${getPointBg(selected.type)}`}>
                    {selected.type === 'ancient' ? '古代农耕遗址' : selected.type === 'modern' ? '现代农耕地标' : '红色农耕旧址'}
                  </span>
                  {selected.image && (
                    <div className="rounded-md overflow-hidden mb-3 border border-[#E8DCC8]">
                      <img src={selected.image} alt={selected.name} className="w-full h-32 object-cover" />
                    </div>
                  )}
                  <p className="text-xs text-[#5C4520] leading-relaxed mb-3">{selected.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {selected.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-[#F5F0E8] text-[#7A5C2E] text-[11px] rounded border border-[#E8DCC8]">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="px-3 py-2.5 border-t border-[#E8DCC8] flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-[#FAF7F0] border border-[#E8DCC8] rounded text-[11px] text-[#5C4520] hover:bg-[#F5F0E8]"><ExternalLink className="w-3 h-3" />查看详情</button>
                  <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-[#FAF7F0] border border-[#E8DCC8] rounded text-[11px] text-[#5C4520] hover:bg-[#F5F0E8]"><Navigation className="w-3 h-3" />路线规划</button>
                  <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-[#FAF7F0] border border-[#E8DCC8] rounded text-[11px] text-[#5C4520] hover:bg-[#F5F0E8]"><Share2 className="w-3 h-3" />一键分享</button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-sm text-[#B8A07A]">请在地图上选择一个点位</div>
            )}
          </div>
        </div>
      </section>

      {/* 底部导航模块 */}
      <BottomNav />
      
      <Footer />
    </div>
  );
}

function BottomNav() {
  const modules = [
    { title: '主题线路', desc: '3条精品路线', href: '/routes', icon: '🗺️' },
    { title: '发展脉络', desc: '万年农耕史', href: '/timeline', icon: '📜' },
    { title: '二十四节气', desc: '花志版式', href: '/solar-terms', icon: '🌾' },
    { title: '重要文物', desc: '24件珍品', href: '/artifacts', icon: '🏺' },
  ];

  return (
    <section className="bg-[#FAF7F0] border-t border-[#E8DCC8] py-5">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-4 gap-4">
          {modules.map((m) => (
            <Link key={m.href} href={m.href}>
              <div className="bg-white rounded-lg border border-[#E8DCC8] p-5 flex items-center gap-4 hover:border-[#C4A86B] hover:shadow-md transition-all cursor-pointer group">
                <span className="text-3xl">{m.icon}</span>
                <div>
                  <h3 className="font-serif-title text-[15px] text-[#3D2B0F] group-hover:text-[#8B6914] transition-colors">{m.title}</h3>
                  <p className="text-xs text-[#7A5C2E] mt-0.5">{m.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#C4A86B] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
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
      <button onClick={onToggle} className={`toggle-switch ${active ? 'active' : 'inactive'}`} style={active ? { backgroundColor: color } : undefined} />
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
