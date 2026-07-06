# xiangchao-map 地图实现方式

## 核心技术栈
- Leaflet.js (L.map, L.tileLayer, L.geoJSON, L.polygon)
- 高德瓦片底图
- GeoJSON数据（市级区划 + 省轮廓）

## 视觉层次（从底到顶）
1. 高德中文底图瓦片
2. 省外灰色遮罩（突出湖南）- 用世界边界减去省轮廓的polygon实现
3. 市级行政区划填色（半透明色块）
4. 湖南省轮廓粗边界线（红色 #C62828, weight 3.5）
5. 市级边界细线
6. 标记点

## 蒙版实现关键代码
```
// 世界边界 - 省轮廓 = 省外遮罩
const maskCoords = [
  worldBounds,  // 全球范围
  mainRing.map(c => [c[1], c[0]])  // 省轮廓（挖空）
];
L.polygon(maskCoords, {
  fillColor: '#F5F0EB',
  fillOpacity: 0.75,
  stroke: false,
  interactive: false,
}).addTo(map);
```

## 我们的实现方案
- 使用Leaflet替代Google Maps
- 用高德瓦片或OpenStreetMap作为底图
- 加载湖南省GeoJSON数据
- 省外遮罩用暖色（宣纸色）
- 省内各市用不同淡彩色块
- 省界用红色粗线
- 叠加水彩/宣纸纹理蒙版增加艺术感
