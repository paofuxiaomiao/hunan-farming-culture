import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mapPoints, type MapPoint } from '@/data/mapData';
import { hunanOutline, cityGeoData } from '@/data/hunan-geo';

// GeoJSON URLs from xiangchao-map project
const CITIES_GEOJSON_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663486523138/6NztyHB5jaNJh8ykWoD3oc/hunan_cities_final_02aa81a8.json';
const OUTLINE_GEOJSON_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663486523138/6NztyHB5jaNJh8ykWoD3oc/hunan_outline_final_a33c1dbf.json';

// 各市区域颜色（水彩风格淡彩）
const CITY_COLORS: Record<string, string> = {
  '长沙': '#F5D0C0',
  '株洲': '#C8E8D8',
  '湘潭': '#E8D0E8',
  '衡阳': '#F5D8C0',
  '邵阳': '#F0E0C0',
  '岳阳': '#D0E8F0',
  '常德': '#F5E8C0',
  '张家界': '#D8E8D0',
  '益阳': '#E0F0E0',
  '郴州': '#C8E0F0',
  '永州': '#F0D8D0',
  '怀化': '#E8E0C8',
  '娄底': '#E0D0E8',
  '湘西': '#D8E0C8',
};

interface LeafletMapProps {
  layers: { ancient: boolean; modern: boolean; red: boolean };
  selectedPoint: string | null;
  onSelectPoint: (id: string) => void;
  theme: 'green' | 'gold';
}

export default function LeafletMap({ layers, selectedPoint, onSelectPoint, theme }: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const getPointColor = (type: string) => {
    switch (type) {
      case 'ancient': return '#8B6914';
      case 'modern': return '#4A8C5C';
      case 'red': return '#C44545';
      default: return '#8B6914';
    }
  };

  const visiblePoints = mapPoints.filter((p) => {
    if (p.type === 'ancient' && !layers.ancient) return false;
    if (p.type === 'modern' && !layers.modern) return false;
    if (p.type === 'red' && !layers.red) return false;
    return true;
  });

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [27.4, 111.5],
      zoom: 7,
      minZoom: 6,
      maxZoom: 12,
      zoomControl: false,
      attributionControl: false,
      maxBounds: [[23.5, 107.5], [31.5, 115.5]],
    });

    // 高德底图瓦片
    L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
      subdomains: ['1', '2', '3', '4'],
      maxZoom: 18,
    }).addTo(map);

    // 缩放控件
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapRef.current = map;

    // 加载GeoJSON数据
    loadGeoData(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // 加载GeoJSON并渲染蒙版和区域
  const loadGeoData = async (map: L.Map) => {
    try {
      const [citiesRes, outlineRes] = await Promise.all([
        fetch(CITIES_GEOJSON_URL),
        fetch(OUTLINE_GEOJSON_URL),
      ]);
      const citiesData = await citiesRes.json();
      const outlineData = await outlineRes.json();

      // 省外遮罩（关键：用世界边界减去省轮廓）
      const outlineCoords = outlineData.features[0].geometry.coordinates;
      const worldBounds: [number, number][] = [
        [-90, -180], [-90, 180], [90, 180], [90, -180], [-90, -180],
      ];

      let mainRing: number[][] = [];
      if (outlineData.features[0].geometry.type === 'MultiPolygon') {
        let maxLen = 0;
        for (const poly of outlineCoords) {
          if (poly[0] && poly[0].length > maxLen) {
            maxLen = poly[0].length;
            mainRing = poly[0];
          }
        }
      } else {
        mainRing = outlineCoords[0];
      }

      const maskCoords: [number, number][][] = [
        worldBounds,
        mainRing.map((c: number[]) => [c[1], c[0]] as [number, number]),
      ];

      // 省外蒙版 - 宣纸质感
      const maskColor = theme === 'green' ? '#1A2A1C' : '#F8F0E0';
      const maskOpacity = theme === 'green' ? 0.82 : 0.88;
      L.polygon(maskCoords, {
        fillColor: maskColor,
        fillOpacity: maskOpacity,
        stroke: false,
        interactive: false,
      }).addTo(map);

      // 水彩地图蒙版 - 精确对齐湖南省边界
      // 湖南省实际边界：纬度 24.63-30.13，经度 108.79-114.26
      const imageBounds: L.LatLngBoundsExpression = [[24.63, 108.79], [30.13, 114.26]];
      L.imageOverlay(
        'assets/map-mask-ancient.webp',
        imageBounds,
        { opacity: 0.45, interactive: false, className: 'map-watercolor-overlay' }
      ).addTo(map);

      // 各市区域填色
      citiesData.features.forEach((feature: any) => {
        const cityName = feature.properties.name;
        const color = CITY_COLORS[cityName] || '#E8E0D8';

        L.geoJSON(feature, {
          style: () => ({
            fillColor: color,
            fillOpacity: 0.35,
            color: '#C44545',
            weight: 1.2,
            opacity: 0.5,
          }),
          onEachFeature: (_feat, layer) => {
            layer.on({
              mouseover: (e) => {
                e.target.setStyle({ fillOpacity: 0.55, weight: 2 });
                e.target.bringToFront();
              },
              mouseout: (e) => {
                e.target.setStyle({ fillOpacity: 0.35, weight: 1.2 });
              },
            });
          },
        }).addTo(map);
      });

      // 省界红色粗线
      L.geoJSON(outlineData, {
        style: () => ({
          fillColor: 'transparent',
          fillOpacity: 0,
          color: '#C44545',
          weight: 3,
          opacity: 0.7,
          lineCap: 'round' as any,
          lineJoin: 'round' as any,
        }),
        interactive: false,
      }).addTo(map);

      // 添加文化点位标注
      addMarkers(map);

    } catch (err) {
      console.error('Failed to load GeoJSON:', err);
      // 降级：使用简化轮廓
      addMarkers(map);
    }
  };

  const addMarkers = (map: L.Map) => {
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    visiblePoints.forEach((point) => {
      const color = getPointColor(point.type);
      const isSelected = point.id === selectedPoint;
      const size = isSelected ? 28 : 22;

      const icon = L.divIcon({
        className: 'custom-marker',
        iconSize: [size, size + 8],
        iconAnchor: [size / 2, size + 8],
        html: `
          <div style="position:relative;cursor:pointer;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
            <svg width="${size}" height="${size + 8}" viewBox="0 0 24 32">
              <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" fill="${color}" stroke="white" stroke-width="1.5"/>
              <circle cx="12" cy="12" r="4" fill="white"/>
            </svg>
            ${isSelected ? `<div style="position:absolute;top:-20px;left:50%;transform:translateX(-50%);background:${color};color:white;font-size:10px;padding:2px 6px;border-radius:3px;white-space:nowrap;font-family:'Noto Sans SC',sans-serif;">${point.name.slice(0, 6)}</div>` : ''}
          </div>
        `,
      });

      const marker = L.marker([point.lat, point.lng], { icon }).addTo(map);
      marker.on('click', () => onSelectPoint(point.id));
      markersRef.current.push(marker);
    });
  };

  // 当选中点位变化时飞到对应位置（不过度缩放，保持全省视野）
  useEffect(() => {
    if (!mapRef.current || !selectedPoint) return;
    const point = mapPoints.find(p => p.id === selectedPoint);
    if (point) {
      mapRef.current.flyTo([point.lat, point.lng], 8, { duration: 0.6 });
    }
  }, [selectedPoint]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full" />
      {/* 蒙版通过Leaflet ImageOverlay实现，已绑定地理坐标 */}
      {/* 宣纸纹理叠加 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}
