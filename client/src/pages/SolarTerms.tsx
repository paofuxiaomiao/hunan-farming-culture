import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const solarTermsData = [
  { name: '立春', latin: 'LICHUN', date: '2月3-5日', plant: '梅花', desc: '东风解冻，蛰虫始振', farming: '备耕整地，修缮农具', season: 'spring', icon: '/manus-storage/st-lichun_d3da8f1c.png' },
  { name: '雨水', latin: 'YUSHUI', date: '2月18-20日', plant: '杏花', desc: '獭祭鱼，鸿雁来', farming: '田间排水，育秧准备', season: 'spring', icon: '/manus-storage/st-yushui_8a65af7f.png' },
  { name: '惊蛰', latin: 'JINGZHE', date: '3月5-7日', plant: '桃花', desc: '桃始华，仓庚鸣', farming: '春耕开始，播种早稻', season: 'spring', icon: '/manus-storage/st-jingzhe_6716d687.png' },
  { name: '春分', latin: 'CHUNFEN', date: '3月20-22日', plant: '海棠', desc: '玄鸟至，雷乃发声', farming: '水稻育秧，施肥管理', season: 'spring', icon: '/manus-storage/st-chunfen_a442a53d.png' },
  { name: '清明', latin: 'QINGMING', date: '4月4-6日', plant: '柳', desc: '桐始华，田鼠化为鴽', farming: '插秧播种，茶叶采摘', season: 'spring', icon: '/manus-storage/st-qingming_60bb94b0.png' },
  { name: '谷雨', latin: 'GUYU', date: '4月19-21日', plant: '牡丹', desc: '萍始生，鸣鸠拂其羽', farming: '秧苗移栽，病虫防治', season: 'spring', icon: '/manus-storage/st-guyu_28442251.png' },
  { name: '立夏', latin: 'LIXIA', date: '5月5-7日', plant: '蔷薇', desc: '蝼蝈鸣，蚯蚓出', farming: '早稻分蘖，中稻插秧', season: 'summer', icon: '/manus-storage/st-lixia_bf64af47.png' },
  { name: '小满', latin: 'XIAOMAN', date: '5月20-22日', plant: '石榴', desc: '苦菜秀，靡草死', farming: '田间管理，灌溉施肥', season: 'summer', icon: '/manus-storage/st-xiaoman_fde1bd2c.png' },
  { name: '芒种', latin: 'MANGZHONG', date: '6月5-7日', plant: '栀子', desc: '螳螂生，鵙始鸣', farming: '抢收抢种，双抢大忙', season: 'summer', icon: '/manus-storage/st-mangzhong_50e03a0f.png' },
  { name: '夏至', latin: 'XIAZHI', date: '6月21-22日', plant: '荷花', desc: '鹿角解，蝉始鸣', farming: '晚稻插秧，防涝抗旱', season: 'summer', icon: '/manus-storage/st-xiazhi_af545a97.png' },
  { name: '小暑', latin: 'XIAOSHU', date: '7月6-8日', plant: '茉莉', desc: '温风至，蟋蟀居壁', farming: '中稻抽穗，防治病害', season: 'summer', icon: '/manus-storage/st-xiaoshu_72500ffb.png' },
  { name: '大暑', latin: 'DASHU', date: '7月22-24日', plant: '紫薇', desc: '腐草为萤，土润溽暑', farming: '双季稻管理，防高温', season: 'summer', icon: '/manus-storage/st-dashu_8512233d.png' },
  { name: '立秋', latin: 'LIQIU', date: '8月7-9日', plant: '木槿', desc: '凉风至，白露降', farming: '早稻收割，晚稻管理', season: 'autumn', icon: '/manus-storage/st-liqiu_eb0d106f.png' },
  { name: '处暑', latin: 'CHUSHU', date: '8月22-24日', plant: '向日葵', desc: '鹰乃祭鸟，天地始肃', farming: '晚稻抽穗，秋粮管理', season: 'autumn', icon: '/manus-storage/st-chushu_a9ca5a59.png' },
  { name: '白露', latin: 'BAILU', date: '9月7-9日', plant: '桂花', desc: '鸿雁来，玄鸟归', farming: '晚稻灌浆，棉花采摘', season: 'autumn', icon: '/manus-storage/st-bailu_39b0d5ed.png' },
  { name: '秋分', latin: 'QIUFEN', date: '9月22-24日', plant: '菊花', desc: '雷始收声，蛰虫坯户', farming: '秋收秋种，晒谷入仓', season: 'autumn', icon: '/manus-storage/st-qiufen_8bbab5f4.png' },
  { name: '寒露', latin: 'HANLU', date: '10月7-9日', plant: '芙蓉', desc: '鸿雁来宾，菊有黄华', farming: '晚稻收割，冬种准备', season: 'autumn', icon: '/manus-storage/st-hanlu_2b5d7467.png' },
  { name: '霜降', latin: 'SHUANGJANG', date: '10月23-24日', plant: '枫叶', desc: '豺乃祭兽，草木黄落', farming: '秋收扫尾，翻耕冬田', season: 'autumn', icon: '/manus-storage/st-shuangjang_41b3c432.png' },
  { name: '立冬', latin: 'LIDONG', date: '11月7-8日', plant: '山茶', desc: '水始冰，地始冻', farming: '冬种油菜，修建水利', season: 'winter', icon: '/manus-storage/st-lidong_f52cfb1c.png' },
  { name: '小雪', latin: 'XIAOXUE', date: '11月22-23日', plant: '银杏', desc: '虹藏不见，天气上升', farming: '冬季积肥，农田水利', season: 'winter', icon: '/manus-storage/st-xiaoxue_e6c2750f.png' },
  { name: '大雪', latin: 'DAXUE', date: '12月6-8日', plant: '腊梅', desc: '鹖鴠不鸣，虎始交', farming: '积肥造肥，兴修水利', season: 'winter', icon: '/manus-storage/st-daxue_b1cf33be.png' },
  { name: '冬至', latin: 'DONGZHI', date: '12月21-23日', plant: '水仙', desc: '蚯蚓结，麋角解', farming: '冬闲整地，来年规划', season: 'winter', icon: '/manus-storage/st-dongzhi_08cf234b.png' },
  { name: '小寒', latin: 'XIAOHAN', date: '1月5-7日', plant: '天竺', desc: '雁北乡，鹊始巢', farming: '选种备种，农具修整', season: 'winter', icon: '/manus-storage/st-xiaohan_54abaf6a.png' },
  { name: '大寒', latin: 'DAHAN', date: '1月20-21日', plant: '瑞香', desc: '鸡始乳，征鸟厉疾', farming: '备春耕物资，迎接新年', season: 'winter', icon: '/manus-storage/st-dahan_842da9ea.png' },
];

const seasonThemes = {
  spring: { bg: '#2D3B2D', glow: '#7CB87C', accent: '#A8D5A0', name: '春', poem: '春风又绿江南岸' },
  summer: { bg: '#3B3020', glow: '#D4A846', accent: '#F0D4A8', name: '夏', poem: '接天莲叶无穷碧' },
  autumn: { bg: '#3B2820', glow: '#C87A4A', accent: '#E8B090', name: '秋', poem: '霜叶红于二月花' },
  winter: { bg: '#252D35', glow: '#7AAAB8', accent: '#B0D4E0', name: '冬', poem: '梅花香自苦寒来' },
};

export default function SolarTermsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const activeTerm = solarTermsData[activeIndex];
  const theme = seasonThemes[activeTerm.season as keyof typeof seasonThemes];

  const goNext = useCallback(() => setActiveIndex((prev) => (prev + 1) % 24), []);
  const goPrev = useCallback(() => setActiveIndex((prev) => (prev - 1 + 24) % 24), []);

  // 键盘导航
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  // 鼠标视差
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // 滚轮翻页
  useEffect(() => {
    let lastScroll = 0;
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScroll < 800) return;
      lastScroll = now;
      if (e.deltaY > 0) goNext();
      else if (e.deltaY < 0) goPrev();
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [goNext, goPrev]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="h-screen w-screen overflow-hidden relative select-none"
      style={{ backgroundColor: theme.bg, transition: 'background-color 0.8s ease' }}
    >
      {/* 背景光晕 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at ${50 + mousePos.x * 10}% ${50 + mousePos.y * 10}%, ${theme.glow}15 0%, transparent 70%)`,
          transition: 'background 0.3s ease',
        }}
      />

      {/* 顶部导航 */}
      <div className="absolute top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
        <Link href="/">
          <button className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回地图
          </button>
        </Link>
        <div className="text-center">
          <p className="font-label text-[9px] tracking-[0.4em] text-white/40">TWENTY-FOUR SOLAR TERMS</p>
          <p className="text-sm text-white/70 mt-0.5 font-serif-title">二十四节气 · 花志</p>
        </div>
        <div className="font-num text-sm text-white/40">
          {String(activeIndex + 1).padStart(2, '0')} / 24
        </div>
      </div>

      {/* 主内容区 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex items-center gap-16 max-w-[1200px] w-full px-12">
            {/* 左侧 - 植物画（带视差和光效） */}
            <div className="flex-1 flex items-center justify-center relative">
              {/* 光晕底座 */}
              <div
                className="absolute w-[340px] h-[340px] rounded-full blur-[80px] opacity-30"
                style={{
                  backgroundColor: theme.glow,
                  transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
                  transition: 'transform 0.4s ease-out',
                }}
              />
              {/* 外圈装饰 */}
              <div
                className="absolute w-[380px] h-[380px] rounded-full border border-white/[0.06]"
                style={{
                  transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px) rotate(${mousePos.x * 5}deg)`,
                  transition: 'transform 0.5s ease-out',
                }}
              />
              <div
                className="absolute w-[420px] h-[420px] rounded-full border border-white/[0.03]"
                style={{
                  transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -12}px) rotate(${mousePos.x * -3}deg)`,
                  transition: 'transform 0.6s ease-out',
                }}
              />
              {/* 植物画主体 */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="relative z-10 w-[300px] h-[400px]"
                style={{
                  transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px) rotateY(${mousePos.x * 5}deg) rotateX(${mousePos.y * -5}deg)`,
                  transition: 'transform 0.3s ease-out',
                  perspective: '1000px',
                }}
              >
                <img
                  src={activeTerm.icon}
                  alt={activeTerm.plant}
                  className="w-full h-full object-contain"
                  style={{ filter: `drop-shadow(0 0 40px ${theme.glow}40)` }}
                />
              </motion.div>
            </div>

            {/* 右侧 - 文字信息 */}
            <div className="flex-1 max-w-[440px]">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* 季节标签 */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-serif-title" style={{ backgroundColor: theme.glow + '20', color: theme.accent, border: `1px solid ${theme.glow}40` }}>
                    {theme.name}
                  </span>
                  <span className="font-label text-[9px] tracking-[0.3em]" style={{ color: theme.accent + 'aa' }}>
                    {activeTerm.latin}
                  </span>
                </div>

                {/* 节气名 - 超大 */}
                <h1 className="font-display text-7xl text-white mb-3 leading-none">{activeTerm.name}</h1>

                {/* 物候 */}
                <p className="font-serif-title text-lg mb-8 italic" style={{ color: theme.accent }}>
                  「{activeTerm.desc}」
                </p>

                {/* 分隔线 */}
                <div className="w-16 h-[1px] mb-8" style={{ background: `linear-gradient(to right, ${theme.accent}, transparent)` }} />

                {/* 信息 */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-white/40 w-16">时令</span>
                    <span className="text-sm text-white/80">{activeTerm.date}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-white/40 w-16">花信</span>
                    <span className="text-sm text-white/80">{activeTerm.plant}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-white/40 w-16">湖南农事</span>
                    <span className="text-sm text-white/80">{activeTerm.farming}</span>
                  </div>
                </div>

                {/* 诗句 */}
                <p className="text-xs text-white/30 italic">— {theme.poem}</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 底部导航 - 节气圆环选择器 */}
      <div className="absolute bottom-6 left-0 right-0 z-50">
        <div className="flex items-center justify-center gap-1 px-8">
          <button onClick={goPrev} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/5 transition-all mr-3">
            <ChevronLeft className="w-4 h-4 text-white/60" />
          </button>
          
          {solarTermsData.map((term, i) => {
            const isActive = i === activeIndex;
            const termTheme = seasonThemes[term.season as keyof typeof seasonThemes];
            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="relative group"
                title={term.name}
              >
                <div
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? termTheme.accent : 'rgba(255,255,255,0.2)',
                    transform: isActive ? 'scale(2)' : 'scale(1)',
                    boxShadow: isActive ? `0 0 12px ${termTheme.glow}60` : 'none',
                  }}
                />
                {/* 悬浮提示 */}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] text-white/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {term.name}
                </span>
              </button>
            );
          })}

          <button onClick={goNext} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/5 transition-all ml-3">
            <ChevronRight className="w-4 h-4 text-white/60" />
          </button>
        </div>

        {/* 操作提示 */}
        <p className="text-center text-[10px] text-white/25 mt-3 flex items-center justify-center gap-4">
          <span>← → 键盘翻页</span>
          <span>·</span>
          <span>滚轮切换</span>
          <span>·</span>
          <span>鼠标移动视差</span>
        </p>
      </div>

      {/* 左侧季节指示器 */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {(['spring', 'summer', 'autumn', 'winter'] as const).map((s) => {
          const sm = seasonThemes[s];
          const isCurrentSeason = activeTerm.season === s;
          return (
            <button
              key={s}
              onClick={() => {
                const firstOfSeason = solarTermsData.findIndex(t => t.season === s);
                setActiveIndex(firstOfSeason);
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-serif-title transition-all duration-300"
              style={{
                backgroundColor: isCurrentSeason ? sm.glow + '30' : 'transparent',
                border: `1px solid ${isCurrentSeason ? sm.accent : 'rgba(255,255,255,0.15)'}`,
                color: isCurrentSeason ? sm.accent : 'rgba(255,255,255,0.4)',
                transform: isCurrentSeason ? 'scale(1.15)' : 'scale(1)',
              }}
            >
              {sm.name}
            </button>
          );
        })}
      </div>

      {/* 右侧序号 */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-40">
        <span className="font-num text-8xl font-bold text-white/[0.04] leading-none">
          {String(activeIndex + 1).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
