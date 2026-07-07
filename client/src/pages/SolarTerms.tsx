import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { routePath } from '@/lib/sitePaths';

const solarTermsData = [
  { name: '立春', latin: 'LICHUN', date: '2月3-5日', plant: '梅花', desc: '东风解冻，蛰虫始振', farming: '备耕整地，修缮农具', season: 'spring', icon: 'assets/st-lichun.png' },
  { name: '雨水', latin: 'YUSHUI', date: '2月18-20日', plant: '杏花', desc: '獭祭鱼，鸿雁来', farming: '田间排水，育秧准备', season: 'spring', icon: 'assets/st-yushui.png' },
  { name: '惊蛰', latin: 'JINGZHE', date: '3月5-7日', plant: '桃花', desc: '桃始华，仓庚鸣', farming: '春耕开始，播种早稻', season: 'spring', icon: 'assets/st-jingzhe.png' },
  { name: '春分', latin: 'CHUNFEN', date: '3月20-22日', plant: '海棠', desc: '玄鸟至，雷乃发声', farming: '水稻育秧，施肥管理', season: 'spring', icon: 'assets/st-chunfen.png' },
  { name: '清明', latin: 'QINGMING', date: '4月4-6日', plant: '柳', desc: '桐始华，田鼠化为鴽', farming: '插秧播种，茶叶采摘', season: 'spring', icon: 'assets/st-qingming.png' },
  { name: '谷雨', latin: 'GUYU', date: '4月19-21日', plant: '牡丹', desc: '萍始生，鸣鸠拂其羽', farming: '秧苗移栽，病虫防治', season: 'spring', icon: 'assets/st-guyu.png' },
  { name: '立夏', latin: 'LIXIA', date: '5月5-7日', plant: '蔷薇', desc: '蝼蝈鸣，蚯蚓出', farming: '早稻分蘖，中稻插秧', season: 'summer', icon: 'assets/st-lixia.png' },
  { name: '小满', latin: 'XIAOMAN', date: '5月20-22日', plant: '石榴', desc: '苦菜秀，靡草死', farming: '田间管理，灌溉施肥', season: 'summer', icon: 'assets/st-xiaoman.png' },
  { name: '芒种', latin: 'MANGZHONG', date: '6月5-7日', plant: '栀子', desc: '螳螂生，鵙始鸣', farming: '抢收抢种，双抢大忙', season: 'summer', icon: 'assets/st-mangzhong.png' },
  { name: '夏至', latin: 'XIAZHI', date: '6月21-22日', plant: '荷花', desc: '鹿角解，蝉始鸣', farming: '晚稻插秧，防涝抗旱', season: 'summer', icon: 'assets/st-xiazhi.png' },
  { name: '小暑', latin: 'XIAOSHU', date: '7月6-8日', plant: '茉莉', desc: '温风至，蟋蟀居壁', farming: '中稻抽穗，防治病害', season: 'summer', icon: 'assets/st-xiaoshu.png' },
  { name: '大暑', latin: 'DASHU', date: '7月22-24日', plant: '紫薇', desc: '腐草为萤，土润溽暑', farming: '双季稻管理，防高温', season: 'summer', icon: 'assets/st-dashu.png' },
  { name: '立秋', latin: 'LIQIU', date: '8月7-9日', plant: '木槿', desc: '凉风至，白露降', farming: '早稻收割，晚稻管理', season: 'autumn', icon: 'assets/st-liqiu.png' },
  { name: '处暑', latin: 'CHUSHU', date: '8月22-24日', plant: '向日葵', desc: '鹰乃祭鸟，天地始肃', farming: '晚稻抽穗，秋粮管理', season: 'autumn', icon: 'assets/st-chushu.png' },
  { name: '白露', latin: 'BAILU', date: '9月7-9日', plant: '桂花', desc: '鸿雁来，玄鸟归', farming: '晚稻灌浆，棉花采摘', season: 'autumn', icon: 'assets/st-bailu.png' },
  { name: '秋分', latin: 'QIUFEN', date: '9月22-24日', plant: '菊花', desc: '雷始收声，蛰虫坯户', farming: '秋收秋种，晒谷入仓', season: 'autumn', icon: 'assets/st-qiufen.png' },
  { name: '寒露', latin: 'HANLU', date: '10月7-9日', plant: '芙蓉', desc: '鸿雁来宾，菊有黄华', farming: '晚稻收割，冬种准备', season: 'autumn', icon: 'assets/st-hanlu.png' },
  { name: '霜降', latin: 'SHUANGJANG', date: '10月23-24日', plant: '枫叶', desc: '豺乃祭兽，草木黄落', farming: '秋收扫尾，翻耕冬田', season: 'autumn', icon: 'assets/st-shuangjang.png' },
  { name: '立冬', latin: 'LIDONG', date: '11月7-8日', plant: '山茶', desc: '水始冰，地始冻', farming: '冬种油菜，修建水利', season: 'winter', icon: 'assets/st-lidong.png' },
  { name: '小雪', latin: 'XIAOXUE', date: '11月22-23日', plant: '银杏', desc: '虹藏不见，天气上升', farming: '冬季积肥，农田水利', season: 'winter', icon: 'assets/st-xiaoxue.png' },
  { name: '大雪', latin: 'DAXUE', date: '12月6-8日', plant: '腊梅', desc: '鹖鴠不鸣，虎始交', farming: '积肥造肥，兴修水利', season: 'winter', icon: 'assets/st-daxue.png' },
  { name: '冬至', latin: 'DONGZHI', date: '12月21-23日', plant: '水仙', desc: '蚯蚓结，麋角解', farming: '冬闲整地，来年规划', season: 'winter', icon: 'assets/st-dongzhi.png' },
  { name: '小寒', latin: 'XIAOHAN', date: '1月5-7日', plant: '天竺', desc: '雁北乡，鹊始巢', farming: '选种备种，农具修整', season: 'winter', icon: 'assets/st-xiaohan.png' },
  { name: '大寒', latin: 'DAHAN', date: '1月20-21日', plant: '瑞香', desc: '鸡始乳，征鸟厉疾', farming: '备春耕物资，迎接新年', season: 'winter', icon: 'assets/st-dahan.png' },
];

const seasonThemes = {
  spring: { gradient: 'from-[#1a2e1a] via-[#2a3d28] to-[#1e3520]', glow: 'rgba(122, 184, 122, 0.15)', particle: '#7CB87C', accent: '#A8D5A0', name: '春', poem: '春风又绿江南岸', textColor: '#C8E6C8', bg: 'assets/bg-spring-hd.webp' },
  summer: { gradient: 'from-[#2e2510] via-[#3d3015] to-[#352a0e]', glow: 'rgba(212, 180, 70, 0.15)', particle: '#D4B046', accent: '#F5E0A0', name: '夏', poem: '接天莲叶无穷碧', textColor: '#F5EAC0', bg: 'assets/bg-summer-hd.webp' },
  autumn: { gradient: 'from-[#2e1510] via-[#3d1a14] to-[#351812]', glow: 'rgba(200, 80, 50, 0.15)', particle: '#C85030', accent: '#E89070', name: '秋', poem: '霜叶红于二月花', textColor: '#F0C0A8', bg: 'assets/bg-autumn-hd.webp' },
  winter: { gradient: 'from-[#1a2230] via-[#202a38] to-[#182530]', glow: 'rgba(140, 180, 200, 0.15)', particle: '#8CBAD0', accent: '#C0E0F0', name: '冬', poem: '梅花香自苦寒来', textColor: '#D0E8F5', bg: 'assets/bg-winter-hd.webp' },
};

// Canvas粒子系统
function ParticleCanvas({ season, mousePos }: { season: string; mousePos: { x: number; y: number } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number; life: number }>>([]);
  const animRef = useRef<number>(0);
  const theme = seasonThemes[season as keyof typeof seasonThemes];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 初始化粒子
    const count = season === 'winter' ? 80 : season === 'autumn' ? 40 : 50;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (season === 'winter' ? 0.3 : 0.5),
      vy: season === 'winter' ? Math.random() * 0.8 + 0.2 : season === 'autumn' ? Math.random() * 0.6 + 0.1 : (Math.random() - 0.5) * 0.3,
      size: Math.random() * (season === 'winter' ? 3 : season === 'spring' ? 4 : 3) + 1,
      opacity: Math.random() * 0.5 + 0.2,
      life: Math.random() * 100,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((p) => {
        p.x += p.vx + mousePos.x * 0.3;
        p.y += p.vy + mousePos.y * 0.1;
        p.life += 0.5;
        p.opacity = 0.15 + Math.sin(p.life * 0.02) * 0.15;

        // 边界循环
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.y > canvas.height + 10) p.y = -10;
        if (p.y < -10) p.y = canvas.height + 10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = theme.particle + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // 连线（仅spring和summer）
        if (season === 'spring' || season === 'summer') {
          particlesRef.current.forEach((p2) => {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100 && dist > 0) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = theme.particle + '08';
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        }
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [season, mousePos.x, mousePos.y, theme.particle]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export default function SolarTermsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const activeTerm = solarTermsData[activeIndex];
  const theme = seasonThemes[activeTerm.season as keyof typeof seasonThemes];

  const goNext = useCallback(() => setActiveIndex((prev) => (prev + 1) % 24), []);
  const goPrev = useCallback(() => setActiveIndex((prev) => (prev - 1 + 24) % 24), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  useEffect(() => {
    let lastScroll = 0;
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScroll < 600) return;
      lastScroll = now;
      if (e.deltaY > 0) goNext();
      else if (e.deltaY < 0) goPrev();
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [goNext, goPrev]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`h-screen w-screen overflow-hidden relative select-none bg-gradient-to-br ${theme.gradient}`}
      style={{ transition: 'all 1s ease' }}
    >
      {/* 粒子背景 */}
      <ParticleCanvas season={activeTerm.season} mousePos={mousePos} />

      {/* 山水背景图层 - 空间纵深 */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${theme.bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.72,
          transform: `scale(1.02) translate(${mousePos.x * -8}px, ${mousePos.y * -5}px)`,
          transition: 'transform 0.8s ease-out, background-image 1s ease',
        }}
      />
      {/* 深度渐变遮罩 - 增强纵深感 */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse 80% 70% at 40% 50%, transparent 20%, rgba(0,0,0,0.4) 100%)`,
      }} />
      {/* 底部深色渐变 */}
      <div className="absolute inset-x-0 bottom-0 h-1/3" style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
      }} />
      {/* 雾气纹理叠加 */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
      }} />

      {/* 顶部导航 */}
      <header className="absolute top-0 left-0 right-0 z-50 px-10 py-6 flex items-center justify-between">
        <Link href={routePath("/")}>
          <button className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-body-light">返回</span>
          </button>
        </Link>
        <div className="text-center">
          <p className="font-label text-[9px] tracking-[0.4em] text-white/30">TWENTY-FOUR SOLAR TERMS</p>
          <p className="text-xs text-white/50 mt-1 font-serif-title">二十四节气 · 花志</p>
        </div>
        <div className="font-num text-sm text-white/30">
          <span className="text-white/70 text-lg">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="mx-1">/</span>
          <span>24</span>
        </div>
      </header>

      {/* 主内容 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 flex items-center justify-center px-16"
        >
          <div className="flex items-center gap-20 max-w-[1200px] w-full">
            {/* 左侧植物画 */}
            <div className="flex-1 flex items-center justify-center relative">
              {/* 光晕 */}
              <div
                className="absolute w-[300px] h-[300px] rounded-full blur-[100px]"
                style={{
                  backgroundColor: theme.glow.replace('0.12', '0.2'),
                  transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)`,
                  transition: 'transform 0.5s ease-out, background-color 1s',
                }}
              />
              {/* 装饰环 */}
              <div
                className="absolute w-[360px] h-[360px] rounded-full"
                style={{
                  border: `1px solid ${theme.accent}15`,
                  transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px) rotate(${mousePos.x * 8}deg)`,
                  transition: 'transform 0.6s ease-out',
                }}
              />
              <div
                className="absolute w-[400px] h-[400px] rounded-full"
                style={{
                  border: `1px solid ${theme.accent}08`,
                  transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px) rotate(${mousePos.x * -5}deg)`,
                  transition: 'transform 0.7s ease-out',
                }}
              />
              {/* 宣纸质感圆形底座 */}
              <div
                className="absolute w-[270px] h-[270px] rounded-full overflow-hidden"
                style={{
                  transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
                  transition: 'transform 0.4s ease-out',
                  boxShadow: `0 8px 60px rgba(0,0,0,0.3), 0 2px 20px rgba(0,0,0,0.15)`,
                }}
              >
                {/* 宣纸底色 */}
                <div className="absolute inset-0 bg-[#F8F3E8]" />
                {/* 宣纸纹理 */}
                <div className="absolute inset-0 opacity-[0.15]" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23p)' opacity='0.6'/%3E%3C/svg%3E")`,
                }} />
                {/* 宣纸纤维纹理 */}
                <div className="absolute inset-0 opacity-[0.06]" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cg stroke='%23A08050' stroke-width='0.3' opacity='0.5'%3E%3Cline x1='10' y1='20' x2='90' y2='22'/%3E%3Cline x1='5' y1='45' x2='95' y2='47'/%3E%3Cline x1='15' y1='70' x2='85' y2='72'/%3E%3Cline x1='8' y1='88' x2='92' y2='90'/%3E%3C/g%3E%3C/svg%3E")`,
                }} />
                {/* 边缘暖色渐变 */}
                <div className="absolute inset-0 rounded-full" style={{
                  background: 'radial-gradient(circle, transparent 60%, rgba(180,150,100,0.08) 100%)',
                }} />
              </div>
              {/* 植物画 */}
              <motion.div
                initial={{ y: 30, opacity: 0, rotateY: -5 }}
                animate={{ y: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
                className="relative z-10 w-[300px] h-[400px]"
                style={{
                  transform: `perspective(1200px) translate(${mousePos.x * 20}px, ${mousePos.y * 20}px) rotateY(${mousePos.x * 6}deg) rotateX(${mousePos.y * -4}deg)`,
                  transition: 'transform 0.3s ease-out',
                }}
              >
                <img
                  src={activeTerm.icon}
                  alt={activeTerm.plant}
                  className="w-full h-full object-contain"
                  style={{ filter: `drop-shadow(0 4px 20px rgba(0,0,0,0.2))` }}
                />
              </motion.div>
            </div>

            {/* 右侧文字 */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="flex-1 max-w-[420px]"
            >
              {/* 季节 */}
              <div className="flex items-center gap-3 mb-8">
                <span className="brand-dot" style={{ background: theme.accent }} />
                <span className="font-label text-[10px] tracking-[0.3em]" style={{ color: theme.accent + 'cc' }}>
                  {activeTerm.latin} · {theme.name}
                </span>
              </div>

              {/* 节气名 */}
              <h1 className="font-display text-[72px] leading-none mb-4" style={{ color: theme.textColor }}>
                {activeTerm.name}
              </h1>

              {/* 物候 */}
              <p className="font-serif-title text-xl mb-10 leading-relaxed" style={{ color: theme.accent }}>
                {activeTerm.desc}
              </p>

              {/* hairline */}
              <div className="w-20 h-px mb-8" style={{ background: `linear-gradient(to right, ${theme.accent}60, transparent)` }} />

              {/* 信息 */}
              <div className="space-y-5 mb-10">
                <InfoRow label="时令" value={activeTerm.date} accent={theme.accent} />
                <InfoRow label="花信" value={activeTerm.plant} accent={theme.accent} />
                <InfoRow label="湖南农事" value={activeTerm.farming} accent={theme.accent} />
              </div>

              {/* 诗句 */}
              <p className="text-xs italic" style={{ color: theme.accent + '50' }}>
                — {theme.poem}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 底部导航 */}
      <nav className="absolute bottom-8 left-0 right-0 z-50 flex items-center justify-center gap-2 px-16">
        <button onClick={goPrev} className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all">
          <ChevronLeft className="w-4 h-4 text-white/50" />
        </button>
        <div className="flex items-center gap-[3px] mx-4">
          {solarTermsData.map((term, i) => {
            const t = seasonThemes[term.season as keyof typeof seasonThemes];
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="group relative"
                title={term.name}
              >
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: isActive ? '24px' : '6px',
                    backgroundColor: isActive ? t.accent : 'rgba(255,255,255,0.15)',
                    boxShadow: isActive ? `0 0 8px ${t.particle}50` : 'none',
                  }}
                />
              </button>
            );
          })}
        </div>
        <button onClick={goNext} className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all">
          <ChevronRight className="w-4 h-4 text-white/50" />
        </button>
      </nav>

      {/* 左侧季节快捷 */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
        {(['spring', 'summer', 'autumn', 'winter'] as const).map((s) => {
          const sm = seasonThemes[s];
          const isCurrent = activeTerm.season === s;
          return (
            <button
              key={s}
              onClick={() => setActiveIndex(solarTermsData.findIndex(t => t.season === s))}
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-serif-title transition-all duration-500"
              style={{
                backgroundColor: isCurrent ? sm.accent + '25' : 'transparent',
                border: `1px solid ${isCurrent ? sm.accent + '60' : 'rgba(255,255,255,0.1)'}`,
                color: isCurrent ? sm.accent : 'rgba(255,255,255,0.3)',
                transform: isCurrent ? 'scale(1.2)' : 'scale(1)',
              }}
            >
              {sm.name}
            </button>
          );
        })}
      </div>

      {/* 操作提示 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40">
        <p className="text-[9px] text-white/20 flex items-center gap-3">
          <span>← → 翻页</span>
          <span>·</span>
          <span>滚轮切换</span>
          <span>·</span>
          <span>移动鼠标探索</span>
        </p>
      </div>
    </div>
  );
}

function InfoRow({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="flex items-baseline gap-5">
      <span className="text-xs w-14 flex-shrink-0" style={{ color: accent + '60' }}>{label}</span>
      <span className="text-sm text-white/80 font-body-light">{value}</span>
    </div>
  );
}
