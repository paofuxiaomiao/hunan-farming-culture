import { useState } from 'react';
import { mapPoints, type MapPoint } from '@/data/mapData';

// 湖南省14个地级市的简化SVG路径数据（基于真实行政边界简化）
const regions = [
  { id: 'changsha', name: '长沙市', path: 'M 340 230 L 360 220 L 380 225 L 390 240 L 385 260 L 370 270 L 355 265 L 340 255 L 335 240 Z', center: { x: 362, y: 245 } },
  { id: 'zhuzhou', name: '株洲市', path: 'M 370 270 L 390 265 L 405 275 L 410 295 L 400 315 L 385 320 L 370 310 L 365 290 L 368 278 Z', center: { x: 388, y: 293 } },
  { id: 'xiangtan', name: '湘潭市', path: 'M 335 255 L 355 265 L 365 278 L 360 290 L 345 295 L 330 285 L 328 270 Z', center: { x: 345, y: 275 } },
  { id: 'hengyang', name: '衡阳市', path: 'M 310 310 L 340 300 L 360 305 L 380 320 L 385 345 L 370 365 L 345 370 L 320 360 L 305 340 L 305 320 Z', center: { x: 345, y: 338 } },
  { id: 'shaoyang', name: '邵阳市', path: 'M 230 290 L 260 280 L 285 285 L 310 300 L 310 330 L 300 355 L 275 365 L 250 360 L 230 340 L 225 315 Z', center: { x: 268, y: 322 } },
  { id: 'yueyang', name: '岳阳市', path: 'M 330 140 L 355 135 L 380 140 L 395 155 L 390 175 L 375 190 L 355 195 L 335 185 L 325 170 L 325 155 Z', center: { x: 358, y: 165 } },
  { id: 'changde', name: '常德市', path: 'M 230 130 L 260 120 L 290 125 L 320 135 L 325 155 L 315 175 L 295 185 L 265 180 L 240 170 L 225 155 Z', center: { x: 275, y: 152 } },
  { id: 'zhangjiajie', name: '张家界市', path: 'M 175 135 L 200 125 L 225 130 L 235 145 L 230 165 L 210 175 L 190 170 L 175 155 Z', center: { x: 205, y: 150 } },
  { id: 'yiyang', name: '益阳市', path: 'M 280 185 L 310 180 L 335 185 L 340 200 L 340 225 L 325 235 L 305 235 L 285 225 L 275 210 Z', center: { x: 308, y: 210 } },
  { id: 'chenzhou', name: '郴州市', path: 'M 340 380 L 365 370 L 390 380 L 405 400 L 400 425 L 380 440 L 355 435 L 335 420 L 330 400 Z', center: { x: 368, y: 408 } },
  { id: 'yongzhou', name: '永州市', path: 'M 270 370 L 300 365 L 325 375 L 335 400 L 325 425 L 305 440 L 280 435 L 260 420 L 255 395 Z', center: { x: 293, y: 405 } },
  { id: 'huaihua', name: '怀化市', path: 'M 140 240 L 170 230 L 200 235 L 225 250 L 230 280 L 225 310 L 200 330 L 170 325 L 145 305 L 135 275 Z', center: { x: 183, y: 280 } },
  { id: 'loudi', name: '娄底市', path: 'M 280 250 L 305 245 L 325 255 L 330 275 L 320 290 L 300 295 L 280 290 L 272 270 Z', center: { x: 300, y: 272 } },
  { id: 'xiangxi', name: '湘西州', path: 'M 120 155 L 150 140 L 175 145 L 190 160 L 195 185 L 185 210 L 165 225 L 140 220 L 120 200 L 115 175 Z', center: { x: 155, y: 183 } },
];

// 坐标转换
function lngLatToMap(lng: number, lat: number): { x: number; y: number } {
  const minLng = 108.6, maxLng = 114.5, minLat = 24.6, maxLat = 30.5;
  const x = 80 + ((lng - minLng) / (maxLng - minLng)) * 380;
  const y = 60 + ((maxLat - lat) / (maxLat - minLat)) * 420;
  return { x, y };
}

interface HunanMapProps {
  layers: { ancient: boolean; modern: boolean; red: boolean };
  selectedPoint: string | null;
  onSelectPoint: (id: string) => void;
  colorScheme: 'ancient' | 'modern' | 'red' | 'default';
}

// 不同图层的配色方案
const colorSchemes = {
  default: {
    fills: ['#F5EDD8', '#EDE4CB', '#F0E8D0', '#E8DFC0', '#F2EAD5', '#EBE2C8', '#F4ECD2', '#E9E0C5', '#F1E9D3', '#ECE3CA', '#F3EBD4', '#EAE1C6', '#EFE7CF', '#EDE4CB'],
    stroke: '#C4A86B',
    hover: '#D4B87B',
  },
  ancient: {
    fills: ['#F5E8D0', '#EDD8B8', '#F0DCC0', '#E8D0A8', '#F2E0C5', '#EBDAB5', '#F4E2C8', '#E9D4B0', '#F1DEC2', '#ECD8B2', '#F3E0C5', '#EAD5AD', '#EFDCBE', '#EDD8B8'],
    stroke: '#8B6914',
    hover: '#A67C30',
  },
  modern: {
    fills: ['#E0F0E0', '#D0E8D0', '#D8ECD8', '#C8E4C8', '#DCF0DC', '#D4EAD4', '#E0F0E0', '#CCE6CC', '#DAF0DA', '#D2E8D2', '#DEF0DE', '#CEE6CE', '#D8ECD8', '#D0E8D0'],
    stroke: '#4A8C5C',
    hover: '#5AA06C',
  },
  red: {
    fills: ['#F5E0E0', '#EDD0D0', '#F0D8D8', '#E8C8C8', '#F2DCDC', '#EBD4D4', '#F4E0E0', '#E9CCCC', '#F1DADA', '#ECD2D2', '#F3DEDE', '#EACECE', '#EFD8D8', '#EDD0D0'],
    stroke: '#C44545',
    hover: '#D05555',
  },
};

export default function HunanMap({ layers, selectedPoint, onSelectPoint, colorScheme }: HunanMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const scheme = colorSchemes[colorScheme];

  const visiblePoints = mapPoints.filter((p) => {
    if (p.type === 'ancient' && !layers.ancient) return false;
    if (p.type === 'modern' && !layers.modern) return false;
    if (p.type === 'red' && !layers.red) return false;
    return true;
  });

  const getPointColor = (type: string) => {
    switch (type) {
      case 'ancient': return '#8B6914';
      case 'modern': return '#4A8C5C';
      case 'red': return '#C44545';
      default: return '#8B6914';
    }
  };

  return (
    <svg viewBox="60 50 440 440" className="w-full h-full" style={{ maxHeight: '100%' }}>
      {/* 省份外框阴影 */}
      <defs>
        <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* 行政区划色块 */}
      {regions.map((region, i) => (
        <g key={region.id}>
          <path
            d={region.path}
            fill={hoveredRegion === region.id ? scheme.hover + '40' : scheme.fills[i]}
            stroke={scheme.stroke}
            strokeWidth={hoveredRegion === region.id ? '1.5' : '0.8'}
            className="transition-all duration-200 cursor-pointer"
            onMouseEnter={() => setHoveredRegion(region.id)}
            onMouseLeave={() => setHoveredRegion(null)}
            filter="url(#shadow)"
          />
          {/* 城市名标注 */}
          <text
            x={region.center.x}
            y={region.center.y}
            textAnchor="middle"
            fontSize="9"
            fill={scheme.stroke}
            opacity="0.7"
            className="pointer-events-none font-sans"
          >
            {region.name.replace('市', '').replace('土家族苗族自治州', '')}
          </text>
        </g>
      ))}

      {/* 省界加粗 */}
      <path
        d="M 120 120 C 150 110, 200 105, 250 110 C 300 115, 340 108, 380 115 C 400 120, 410 130, 415 145 C 420 165, 425 185, 420 210 C 415 240, 420 270, 415 300 C 410 330, 415 360, 410 385 C 405 410, 395 430, 375 445 C 355 455, 330 460, 305 455 C 280 450, 255 445, 235 435 C 215 425, 195 410, 180 395 C 165 380, 150 360, 140 340 C 130 320, 125 295, 120 270 C 115 245, 112 220, 115 195 C 118 170, 115 150, 120 135 Z"
        fill="none"
        stroke={scheme.stroke}
        strokeWidth="2"
        opacity="0.6"
        className="pointer-events-none"
      />

      {/* 文化点位标注 */}
      {visiblePoints.map((point) => {
        const { x, y } = lngLatToMap(point.lng, point.lat);
        const color = getPointColor(point.type);
        const isSelected = point.id === selectedPoint;
        return (
          <g
            key={point.id}
            onClick={() => onSelectPoint(point.id)}
            className="cursor-pointer"
          >
            {isSelected && (
              <circle cx={x} cy={y} r="12" fill={color} opacity="0.12">
                <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
            <g transform={`translate(${x - 7}, ${y - 14})`}>
              <path
                d="M7 0C3.1 0 0 3.1 0 7c0 5.3 7 13 7 13s7-7.7 7-13C14 3.1 10.9 0 7 0z"
                fill={color}
                stroke="white"
                strokeWidth="1.2"
                opacity={isSelected ? 1 : 0.8}
              />
              <circle cx="7" cy="7" r="2.5" fill="white" />
            </g>
            {isSelected && (
              <g>
                <rect x={x - 38} y={y - 28} width="76" height="14" rx="2" fill={color} opacity="0.9" />
                <text x={x} y={y - 18} textAnchor="middle" fontSize="8" fill="white" fontWeight="500">
                  {point.name.length > 7 ? point.name.slice(0, 7) + '…' : point.name}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* 比例尺 */}
      <g transform="translate(100, 470)">
        <line x1="0" y1="0" x2="60" y2="0" stroke={scheme.stroke} strokeWidth="1" opacity="0.5" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke={scheme.stroke} strokeWidth="0.8" opacity="0.5" />
        <line x1="60" y1="-3" x2="60" y2="3" stroke={scheme.stroke} strokeWidth="0.8" opacity="0.5" />
        <text x="25" y="12" fontSize="7" fill={scheme.stroke} opacity="0.5">100km</text>
      </g>
    </svg>
  );
}
