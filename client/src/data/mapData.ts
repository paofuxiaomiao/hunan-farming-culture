// 湖南省农耕文化地图数据

export interface MapPoint {
  id: string;
  name: string;
  type: 'ancient' | 'modern' | 'red';
  lng: number;
  lat: number;
  period: string;
  description: string;
  tags: string[];
  image?: string;
}

export interface ThemeRoute {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  points: string[];
}

export interface TimelineItem {
  id: string;
  era: string;
  period: string;
  icon: string;
  description: string;
}

export interface SolarTerm {
  id: string;
  name: string;
  icon: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
}

export interface Artifact {
  id: string;
  name: string;
  origin: string;
  image: string;
  period: string;
}

// 湖南省城市坐标（用于地图标注）
export const hunanCities = [
  { name: '长沙市', lng: 112.97, lat: 28.23, isCapital: true },
  { name: '株洲市', lng: 113.13, lat: 27.83 },
  { name: '湘潭市', lng: 112.94, lat: 27.83 },
  { name: '衡阳市', lng: 112.57, lat: 26.89 },
  { name: '邵阳市', lng: 111.47, lat: 27.24 },
  { name: '岳阳市', lng: 113.13, lat: 29.37 },
  { name: '常德市', lng: 111.69, lat: 29.03 },
  { name: '张家界市', lng: 110.48, lat: 29.12 },
  { name: '益阳市', lng: 112.36, lat: 28.55 },
  { name: '郴州市', lng: 113.01, lat: 25.77 },
  { name: '永州市', lng: 111.61, lat: 26.42 },
  { name: '怀化市', lng: 110.00, lat: 27.57 },
  { name: '娄底市', lng: 112.00, lat: 27.73 },
  { name: '湘西土家族苗族自治州', lng: 109.74, lat: 28.31 },
];

// 农耕文化点位数据
export const mapPoints: MapPoint[] = [
  // 古代农耕遗址
  {
    id: 'ancient-1',
    name: '澧县城头山遗址',
    type: 'ancient',
    lng: 111.64,
    lat: 29.67,
    period: '距今6500-7000年',
    description: '城头山遗址距今约6500-5800年，是长江中游地区新石器时代重要的稻作农业遗址之一，出土了大量稻谷、陶器与石器，见证了湖湘先民的稻作文明起源。',
    tags: ['新石器时代', '稻作农业', '环壕聚落', '国家重点文物保护单位'],
    image: 'assets/route-farming-origin.png',
  },
  {
    id: 'ancient-2',
    name: '彭头山遗址',
    type: 'ancient',
    lng: 111.59,
    lat: 29.72,
    period: '距今约9000年',
    description: '彭头山遗址是长江中游目前所知最早的新石器时代定居聚落，发现了世界上最早的稻作农业痕迹——稻壳与谷粒。',
    tags: ['新石器时代', '稻作起源', '定居聚落'],
    image: 'assets/artifact-pottery.png',
  },
  {
    id: 'ancient-3',
    name: '玉蟾岩遗址',
    type: 'ancient',
    lng: 111.57,
    lat: 25.53,
    period: '距今14000-12000年',
    description: '道县玉蟾岩遗址发现了目前世界上最早的人工栽培稻标本，将人类稻作农业起源追溯到14000年前。',
    tags: ['旧石器晚期', '稻作起源', '世界之最'],
    image: 'assets/artifact-pottery.png',
  },
  {
    id: 'ancient-4',
    name: '高庙遗址',
    type: 'ancient',
    lng: 110.18,
    lat: 27.21,
    period: '距今7800-6300年',
    description: '洪江高庙遗址出土了精美的白陶祭器，展现了沅水流域先民的精神世界和农耕祭祀文化。',
    tags: ['新石器时代', '白陶文化', '祭祀遗存'],
    image: 'assets/artifact-bronze.png',
  },
  {
    id: 'ancient-5',
    name: '新化紫鹊界梯田',
    type: 'ancient',
    lng: 111.22,
    lat: 27.88,
    period: '起源先秦，2000余年',
    description: '紫鹊界梯田起源于先秦，盛于宋明，是世界灌溉工程遗产，面积达10万余亩，是南方稻作文化与苗瑶山地渔猎文化交融的历史遗存。',
    tags: ['世界灌溉工程遗产', '梯田农业', '苗瑶文化'],
    image: 'assets/route-farming-origin.png',
  },
  {
    id: 'ancient-6',
    name: '炭河里遗址',
    type: 'ancient',
    lng: 112.14,
    lat: 28.12,
    period: '西周时期',
    description: '宁乡炭河里遗址是南方青铜文化的重要代表，出土了四羊方尊等国宝级青铜器，反映了商周时期湖南地区的农业文明水平。',
    tags: ['西周', '青铜文化', '四羊方尊'],
  },
  {
    id: 'ancient-7',
    name: '铜官窑遗址',
    type: 'ancient',
    lng: 112.80,
    lat: 28.38,
    period: '唐代',
    description: '长沙铜官窑是唐代重要的陶瓷出口窑口，开创了釉下彩绘工艺，产品远销海外，见证了唐代湖南农业经济的繁荣。',
    tags: ['唐代', '陶瓷文化', '海上丝路'],
  },
  {
    id: 'ancient-8',
    name: '里耶古城遗址',
    type: 'ancient',
    lng: 109.30,
    lat: 29.05,
    period: '战国-秦代',
    description: '龙山里耶古城出土了3.7万余枚秦简，记录了秦代洞庭郡的行政管理与农业生产情况。',
    tags: ['秦代', '简牍文化', '行政管理'],
  },
  {
    id: 'ancient-9',
    name: '澧阳平原李家岗遗址',
    type: 'ancient',
    lng: 111.62,
    lat: 29.65,
    period: '距今8000多年',
    description: '2025年最新考古发现，将长江中游早期稻田的出现提早了近2000年，是目前已知最早的古稻田遗址之一。',
    tags: ['新石器时代', '古稻田', '最新发现'],
  },
  {
    id: 'ancient-10',
    name: '洪江古商城',
    type: 'ancient',
    lng: 109.83,
    lat: 27.21,
    period: '明清时期',
    description: '洪江古商城是明清时期湘西地区重要的商贸集散地，见证了农产品贸易与商业文明的发展。',
    tags: ['明清', '商贸文化', '古城遗址'],
  },
  // 现代农耕地标
  {
    id: 'modern-1',
    name: '洪江市杂交水稻基地',
    type: 'modern',
    lng: 110.00,
    lat: 27.20,
    period: '1970年代至今',
    description: '袁隆平院士在此进行杂交水稻研发，成功培育出高产杂交水稻品种，为解决世界粮食问题作出了巨大贡献。',
    tags: ['杂交水稻', '袁隆平', '科技创新'],
    image: 'assets/route-digital-agri.png',
  },
  {
    id: 'modern-2',
    name: '隆平高科产业园',
    type: 'modern',
    lng: 113.03,
    lat: 28.20,
    period: '现代',
    description: '中国种业科技创新中心，致力于杂交水稻等农作物新品种研发与产业化推广。',
    tags: ['种业科技', '产业化', '创新中心'],
    image: 'assets/route-digital-agri.png',
  },
  {
    id: 'modern-3',
    name: '岳阳华容芥菜产业园',
    type: 'modern',
    lng: 112.54,
    lat: 29.53,
    period: '现代',
    description: '华容芥菜是国家地理标志产品，产业园实现了从种植到加工的全产业链现代化。',
    tags: ['地理标志', '产业化', '特色农业'],
  },
  {
    id: 'modern-4',
    name: '安化黑茶产业园',
    type: 'modern',
    lng: 111.22,
    lat: 28.38,
    period: '千年传承至今',
    description: '安化黑茶有千年历史，是万里茶道的重要起点，现已发展为现代化茶产业集群。',
    tags: ['黑茶文化', '万里茶道', '非遗传承'],
  },
  {
    id: 'modern-5',
    name: '十八洞村',
    type: 'modern',
    lng: 109.68,
    lat: 28.24,
    period: '2013年至今',
    description: '精准扶贫首倡地，通过发展特色农业（猕猴桃、苗绣等）实现了脱贫致富，成为乡村振兴典范。',
    tags: ['精准扶贫', '乡村振兴', '特色产业'],
    image: 'assets/route-digital-agri.png',
  },
  {
    id: 'modern-6',
    name: '南县稻虾产业基地',
    type: 'modern',
    lng: 112.40,
    lat: 29.36,
    period: '现代',
    description: '南县创新稻虾共养模式，实现了"一田两用、一水双收"的生态循环农业。',
    tags: ['稻虾共养', '生态农业', '循环经济'],
  },
  {
    id: 'modern-7',
    name: '炎陵黄桃产业基地',
    type: 'modern',
    lng: 113.77,
    lat: 26.49,
    period: '现代',
    description: '炎陵黄桃是国家地理标志产品，全县种植9.5万亩，年综合产值超26亿元。',
    tags: ['地理标志', '黄桃产业', '乡村振兴'],
  },
  {
    id: 'modern-8',
    name: '常德鼎城现代农业示范园',
    type: 'modern',
    lng: 111.72,
    lat: 29.00,
    period: '现代',
    description: '集智慧农业、观光农业、科普教育于一体的现代农业综合示范园区。',
    tags: ['智慧农业', '科普教育', '示范园区'],
  },
  {
    id: 'modern-9',
    name: '靖州杨梅产业园',
    type: 'modern',
    lng: 109.70,
    lat: 26.58,
    period: '现代',
    description: '靖州杨梅栽培历史悠久，现已形成集种植、加工、销售为一体的现代产业体系。',
    tags: ['杨梅产业', '特色水果', '产业链'],
  },
  {
    id: 'modern-10',
    name: '浏阳花炮产业基地',
    type: 'modern',
    lng: 113.64,
    lat: 28.16,
    period: '现代',
    description: '浏阳花炮有1400余年历史，是世界花炮之都，传统手工艺与现代科技完美融合。',
    tags: ['花炮文化', '非遗传承', '世界之都'],
  },
  // 红色农耕旧址
  {
    id: 'red-1',
    name: '韶山毛泽东故居',
    type: 'red',
    lng: 112.49,
    lat: 27.91,
    period: '1893年-',
    description: '毛泽东同志诞生地，中国农民运动的重要策源地，《湖南农民运动考察报告》在此孕育。',
    tags: ['伟人故里', '农民运动', '红色圣地'],
    image: 'assets/route-red-farming.png',
  },
  {
    id: 'red-2',
    name: '秋收起义文家市会师旧址',
    type: 'red',
    lng: 113.58,
    lat: 28.18,
    period: '1927年',
    description: '1927年秋收起义部队在此会师，开创了农村包围城市的革命道路。',
    tags: ['秋收起义', '革命转折', '农村革命'],
    image: 'assets/route-red-farming.png',
  },
  {
    id: 'red-3',
    name: '平江起义旧址',
    type: 'red',
    lng: 113.58,
    lat: 28.70,
    period: '1928年',
    description: '1928年彭德怀领导平江起义，建立了湘鄂赣革命根据地，推动了土地革命。',
    tags: ['平江起义', '土地革命', '根据地建设'],
  },
  {
    id: 'red-4',
    name: '通道转兵纪念馆',
    type: 'red',
    lng: 109.78,
    lat: 26.16,
    period: '1934年',
    description: '1934年红军长征途经通道，召开紧急会议决定转兵贵州，挽救了红军命运。',
    tags: ['长征', '通道转兵', '历史转折'],
  },
  {
    id: 'red-5',
    name: '桑植红二方面军长征出发地',
    type: 'red',
    lng: 110.16,
    lat: 29.40,
    period: '1935年',
    description: '贺龙率领红二方面军从桑植出发长征，开始了艰苦卓绝的战略转移。',
    tags: ['长征出发地', '贺龙', '红二方面军'],
  },
  {
    id: 'red-6',
    name: '茶陵工农兵政府旧址',
    type: 'red',
    lng: 113.54,
    lat: 26.79,
    period: '1927年',
    description: '中国第一个县级红色政权诞生地，开创了工农兵政府的先河。',
    tags: ['第一个县级红色政权', '工农兵政府', '革命先河'],
  },
  {
    id: 'red-7',
    name: '汝城沙洲村',
    type: 'red',
    lng: 113.68,
    lat: 25.55,
    period: '1934年',
    description: '"半条被子"故事发生地，三位女红军与村民徐解秀的感人故事，诠释了军民鱼水情。',
    tags: ['半条被子', '军民情深', '长征故事'],
    image: 'assets/route-red-farming.png',
  },
  {
    id: 'red-8',
    name: '芷江受降纪念坊',
    type: 'red',
    lng: 109.68,
    lat: 27.44,
    period: '1945年',
    description: '1945年8月日本侵略者在此签字投降，标志着抗日战争的伟大胜利。',
    tags: ['抗战胜利', '受降纪念', '和平象征'],
  },
  {
    id: 'red-9',
    name: '湘鄂赣革命根据地旧址',
    type: 'red',
    lng: 113.55,
    lat: 28.72,
    period: '1928-1934年',
    description: '湘鄂赣革命根据地是土地革命时期重要的革命根据地，推行了土地改革政策。',
    tags: ['革命根据地', '土地改革', '苏区建设'],
  },
  {
    id: 'red-10',
    name: '炎陵红军标语博物馆',
    type: 'red',
    lng: 113.77,
    lat: 26.49,
    period: '1927-1937年',
    description: '收藏了大量红军时期的标语、文告，记录了革命时期的农村政策与农民动员。',
    tags: ['红军标语', '革命宣传', '农民动员'],
  },
];

// 主题线路
export const themeRoutes: ThemeRoute[] = [
  {
    id: 'route-1',
    title: '农耕文明探源',
    subtitle: '探访稻作起源，追溯湖湘农耕文明的千年脉络',
    image: 'assets/route-farming-origin.png',
    points: ['ancient-3', 'ancient-2', 'ancient-1', 'ancient-5'],
  },
  {
    id: 'route-2',
    title: '数字农旅体验',
    subtitle: '科技赋能乡村，体验现代农业与乡村振兴成果',
    image: 'assets/route-digital-agri.png',
    points: ['modern-1', 'modern-5', 'modern-6', 'modern-2'],
  },
  {
    id: 'route-3',
    title: '红色农事教育',
    subtitle: '走进红色旧址，传承农耕精神与革命记忆',
    image: 'assets/route-red-farming.png',
    points: ['red-1', 'red-2', 'red-3', 'red-7'],
  },
];

// 发展脉络时间轴
export const timeline: TimelineItem[] = [
  {
    id: 'tl-1',
    era: '更新世稻作起源',
    period: '距今约14000年',
    icon: '🌾',
    description: '玉蟾岩发现最早人工栽培稻',
  },
  {
    id: 'tl-2',
    era: '新石器时代',
    period: '约9000-5000年',
    icon: '🏺',
    description: '彭头山、城头山稻作农业成熟',
  },
  {
    id: 'tl-3',
    era: '商周至秦汉',
    period: '约1600-公元220年',
    icon: '🔱',
    description: '青铜农具普及，水利灌溉发展',
  },
  {
    id: 'tl-4',
    era: '隋唐宋元明清',
    period: '581-1911年',
    icon: '⛩️',
    description: '梯田开发，茶马古道繁荣',
  },
  {
    id: 'tl-5',
    era: '近现代农业发展',
    period: '20世纪以来',
    icon: '🚜',
    description: '农业机械化与合作化运动',
  },
  {
    id: 'tl-6',
    era: '杂交水稻与耕地保护',
    period: '1970s至今',
    icon: '🧬',
    description: '袁隆平杂交水稻，粮食安全保障',
  },
];

// 二十四节气
export const solarTerms: SolarTerm[] = [
  { id: 'st-1', name: '立春', icon: 'assets/solar-lichun.webp', season: 'spring' },
  { id: 'st-2', name: '雨水', icon: 'assets/solar-lichun.webp', season: 'spring' },
  { id: 'st-3', name: '惊蛰', icon: 'assets/solar-lichun.webp', season: 'spring' },
  { id: 'st-4', name: '春分', icon: 'assets/solar-lichun.webp', season: 'spring' },
  { id: 'st-5', name: '清明', icon: 'assets/solar-qingming.webp', season: 'spring' },
  { id: 'st-6', name: '谷雨', icon: 'assets/solar-qingming.webp', season: 'spring' },
  { id: 'st-7', name: '立夏', icon: 'assets/solar-mangzhong.webp', season: 'summer' },
  { id: 'st-8', name: '小满', icon: 'assets/solar-mangzhong.webp', season: 'summer' },
  { id: 'st-9', name: '芒种', icon: 'assets/solar-mangzhong.webp', season: 'summer' },
  { id: 'st-10', name: '夏至', icon: 'assets/solar-xiazhi.webp', season: 'summer' },
  { id: 'st-11', name: '小暑', icon: 'assets/solar-xiazhi.webp', season: 'summer' },
  { id: 'st-12', name: '大暑', icon: 'assets/solar-xiazhi.webp', season: 'summer' },
  { id: 'st-13', name: '立秋', icon: 'assets/solar-liqiu.webp', season: 'autumn' },
  { id: 'st-14', name: '处暑', icon: 'assets/solar-liqiu.webp', season: 'autumn' },
  { id: 'st-15', name: '白露', icon: 'assets/solar-bailu.webp', season: 'autumn' },
  { id: 'st-16', name: '秋分', icon: 'assets/solar-bailu.webp', season: 'autumn' },
  { id: 'st-17', name: '寒露', icon: 'assets/solar-hanshou.webp', season: 'autumn' },
  { id: 'st-18', name: '霜降', icon: 'assets/solar-hanshou.webp', season: 'autumn' },
  { id: 'st-19', name: '立冬', icon: 'assets/solar-daxue.webp', season: 'winter' },
  { id: 'st-20', name: '小雪', icon: 'assets/solar-daxue.webp', season: 'winter' },
  { id: 'st-21', name: '大雪', icon: 'assets/solar-daxue.webp', season: 'winter' },
  { id: 'st-22', name: '冬至', icon: 'assets/solar-daxue.webp', season: 'winter' },
  { id: 'st-23', name: '小寒', icon: 'assets/solar-daxue.webp', season: 'winter' },
  { id: 'st-24', name: '大寒', icon: 'assets/solar-daxue.webp', season: 'winter' },
];

// 重要文物
export const artifacts: Artifact[] = [
  {
    id: 'af-1',
    name: '玉蟾岩遗址出土陶器',
    origin: '道县玉蟾岩',
    image: 'assets/artifact-pottery.png',
    period: '旧石器时代晚期',
  },
  {
    id: 'af-2',
    name: '彭头山遗址出土石斧',
    origin: '澧县彭头山',
    image: 'assets/artifact-bronze.png',
    period: '新石器时代',
  },
  {
    id: 'af-3',
    name: '城头山遗址出土稻谷',
    origin: '澧县城头山',
    image: 'assets/artifact-pottery.png',
    period: '新石器时代',
  },
  {
    id: 'af-4',
    name: '龟形遗址出土记数陶符',
    origin: '怀化高庙',
    image: 'assets/artifact-bronze.png',
    period: '新石器时代',
  },
  {
    id: 'af-5',
    name: '里耶秦简',
    origin: '龙山里耶',
    image: 'assets/artifact-pottery.png',
    period: '秦代',
  },
  {
    id: 'af-6',
    name: '四羊方尊',
    origin: '宁乡炭河里',
    image: 'assets/artifact-bronze.png',
    period: '商代晚期',
  },
];

// 地图边界数据（湖南省简化轮廓 - SVG path）
export const hunanProvincePath = `M 109.5 29.8 L 110.2 30.1 L 110.8 29.9 L 111.2 30.0 L 111.8 29.8 L 112.2 29.6 L 112.8 29.7 L 113.2 29.8 L 113.6 29.5 L 113.8 29.2 L 113.9 28.8 L 114.0 28.4 L 113.8 28.0 L 113.9 27.6 L 114.0 27.2 L 113.8 26.8 L 113.6 26.4 L 113.4 26.0 L 113.2 25.7 L 112.8 25.4 L 112.4 25.2 L 112.0 25.1 L 111.6 25.3 L 111.2 25.5 L 110.8 25.7 L 110.4 25.9 L 110.0 26.0 L 109.6 26.2 L 109.3 26.5 L 109.1 26.8 L 109.0 27.2 L 109.0 27.6 L 109.1 28.0 L 109.2 28.4 L 109.3 28.8 L 109.4 29.2 L 109.5 29.8 Z`;
