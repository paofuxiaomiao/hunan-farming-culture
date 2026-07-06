import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

const seasonMeta = {
  spring: { name: '春', full: 'SPRING · 春生', color: '#4A8C5C', bg: '#F0F7F0', poem: '春风又绿江南岸' },
  summer: { name: '夏', full: 'SUMMER · 夏长', color: '#C4860B', bg: '#FFF8F0', poem: '接天莲叶无穷碧' },
  autumn: { name: '秋', full: 'AUTUMN · 秋收', color: '#A65C32', bg: '#FDF5F0', poem: '霜叶红于二月花' },
  winter: { name: '冬', full: 'WINTER · 冬藏', color: '#4A6B7A', bg: '#F5F8FA', poem: '梅花香自苦寒来' },
};

export default function SolarTermsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'gallery' | 'detail'>('gallery');
  const activeTerm = solarTermsData[activeIndex];
  const season = activeTerm.season as keyof typeof seasonMeta;
  const meta = seasonMeta[season];

  const goNext = () => setActiveIndex((activeIndex + 1) % 24);
  const goPrev = () => setActiveIndex((activeIndex - 1 + 24) % 24);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF8]">
      <Header />

      {/* 顶部导航 */}
      <div className="max-w-[1400px] mx-auto px-6 pt-6">
        <Link href="/">
          <button className="flex items-center gap-2 text-sm text-[#8B6914] hover:text-[#5C4520] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回地图
          </button>
        </Link>
      </div>

      {/* 视图切换 */}
      <div className="max-w-[1400px] mx-auto px-6 pt-4 flex items-center justify-between">
        <div>
          <p className="font-label text-[10px] text-[#8B6914] tracking-[0.3em]">TWENTY-FOUR SOLAR TERMS · HUNAN FARMING CALENDAR</p>
          <h1 className="font-display text-3xl text-[#3D2B0F] mt-1">二十四节气 · 花志</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('gallery')}
            className={`px-4 py-2 rounded text-sm transition-all ${viewMode === 'gallery' ? 'bg-[#3D2B0F] text-white' : 'bg-[#F5F0E8] text-[#5C4520] hover:bg-[#E8DCC8]'}`}
          >
            画册总览
          </button>
          <button
            onClick={() => setViewMode('detail')}
            className={`px-4 py-2 rounded text-sm transition-all ${viewMode === 'detail' ? 'bg-[#3D2B0F] text-white' : 'bg-[#F5F0E8] text-[#5C4520] hover:bg-[#E8DCC8]'}`}
          >
            逐页赏析
          </button>
        </div>
      </div>

      {viewMode === 'detail' ? (
        /* ========== 逐页赏析模式 - 大胆全屏展示 ========== */
        <section className="flex-1 py-8">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-12 gap-8 min-h-[520px]">
              {/* 左侧 - 大幅植物画 */}
              <div className="col-span-5 relative flex items-center justify-center" style={{ backgroundColor: meta.bg }}>
                <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ backgroundColor: meta.bg }}>
                  {/* 装饰圆环 */}
                  <div className="absolute top-8 right-8 w-32 h-32 rounded-full border opacity-10" style={{ borderColor: meta.color }} />
                  <div className="absolute bottom-12 left-8 w-20 h-20 rounded-full border opacity-10" style={{ borderColor: meta.color }} />
                </div>
                <div className="relative z-10 w-full max-w-[320px] aspect-[3/4] p-8">
                  <img
                    src={activeTerm.icon}
                    alt={activeTerm.plant}
                    className="w-full h-full object-contain drop-shadow-lg"
                    style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.08))' }}
                  />
                </div>
                {/* 序号标记 */}
                <div className="absolute top-6 left-6 font-num text-6xl font-bold opacity-[0.06]" style={{ color: meta.color }}>
                  {String(activeIndex + 1).padStart(2, '0')}
                </div>
              </div>

              {/* 右侧 - 文字信息 */}
              <div className="col-span-7 flex flex-col justify-center py-8">
                {/* 季节标签 */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: meta.color + '15', border: `1.5px solid ${meta.color}30` }}>
                    <span className="font-serif-title text-base" style={{ color: meta.color }}>{meta.name}</span>
                  </div>
                  <span className="font-label text-[10px] tracking-[0.2em]" style={{ color: meta.color }}>{meta.full}</span>
                </div>

                {/* 节气名 */}
                <h2 className="font-display text-5xl text-[#3D2B0F] mb-2">{activeTerm.name}</h2>
                <p className="font-label text-xs tracking-[0.25em] text-[#8B6914] mb-6">{activeTerm.latin}</p>

                {/* 分隔线 */}
                <div className="w-20 h-[1.5px] mb-6" style={{ background: `linear-gradient(to right, ${meta.color}, transparent)` }} />

                {/* 物候 */}
                <div className="mb-6">
                  <p className="text-xs text-[#7A5C2E] mb-1 font-medium">物候</p>
                  <p className="font-serif-title text-lg text-[#3D2B0F] italic">「{activeTerm.desc}」</p>
                </div>

                {/* 信息网格 */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-white rounded-lg border border-[#E8DCC8] p-4">
                    <p className="text-[10px] text-[#7A5C2E] mb-1">时间</p>
                    <p className="text-sm text-[#3D2B0F] font-medium">{activeTerm.date}</p>
                  </div>
                  <div className="bg-white rounded-lg border border-[#E8DCC8] p-4">
                    <p className="text-[10px] text-[#7A5C2E] mb-1">代表花卉</p>
                    <p className="text-sm text-[#3D2B0F] font-medium">{activeTerm.plant}</p>
                  </div>
                  <div className="bg-white rounded-lg border border-[#E8DCC8] p-4">
                    <p className="text-[10px] text-[#7A5C2E] mb-1">湖南农事</p>
                    <p className="text-sm text-[#3D2B0F] font-medium">{activeTerm.farming}</p>
                  </div>
                </div>

                {/* 导航 */}
                <div className="flex items-center gap-4">
                  <button onClick={goPrev} className="w-10 h-10 rounded-full border border-[#E8DCC8] flex items-center justify-center hover:bg-[#FAF7F0] hover:border-[#C4A86B] transition-all">
                    <ChevronLeft className="w-5 h-5 text-[#5C4520]" />
                  </button>
                  <div className="flex-1 flex items-center gap-1">
                    {solarTermsData.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: i === activeIndex ? meta.color : '#E8DCC8',
                          transform: i === activeIndex ? 'scaleY(2.5)' : 'scaleY(1)',
                        }}
                      />
                    ))}
                  </div>
                  <button onClick={goNext} className="w-10 h-10 rounded-full border border-[#E8DCC8] flex items-center justify-center hover:bg-[#FAF7F0] hover:border-[#C4A86B] transition-all">
                    <ChevronRight className="w-5 h-5 text-[#5C4520]" />
                  </button>
                </div>

                {/* 页码 */}
                <p className="font-num text-xs text-[#B8A07A] mt-3 text-center">
                  {String(activeIndex + 1).padStart(2, '0')} / 24
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* ========== 画册总览模式 - 瀑布流网格 ========== */
        <section className="flex-1 py-8 pb-16">
          <div className="max-w-[1400px] mx-auto px-6">
            {(['spring', 'summer', 'autumn', 'winter'] as const).map((s) => {
              const terms = solarTermsData.filter(t => t.season === s);
              const sm = seasonMeta[s];
              return (
                <div key={s} className="mb-14">
                  {/* 季节分隔 */}
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: sm.bg, border: `2px solid ${sm.color}25` }}>
                      <span className="font-display text-2xl" style={{ color: sm.color }}>{sm.name}</span>
                    </div>
                    <div>
                      <p className="font-label text-[10px] tracking-[0.2em]" style={{ color: sm.color }}>{sm.full}</p>
                      <p className="text-xs text-[#7A5C2E] mt-0.5 italic">{sm.poem}</p>
                    </div>
                    <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(to right, ${sm.color}30, transparent)` }} />
                  </div>

                  {/* 节气卡片 - 大尺寸画册感 */}
                  <div className="grid grid-cols-6 gap-5">
                    {terms.map((term, i) => (
                      <div
                        key={term.name}
                        className="group cursor-pointer"
                        onClick={() => { setActiveIndex(solarTermsData.indexOf(term)); setViewMode('detail'); }}
                      >
                        {/* 图片容器 */}
                        <div
                          className="aspect-[3/4] rounded-xl overflow-hidden mb-3 relative border transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1"
                          style={{ backgroundColor: sm.bg, borderColor: sm.color + '20' }}
                        >
                          <img
                            src={term.icon}
                            alt={term.plant}
                            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* 悬浮遮罩 */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-xl" />
                          {/* 序号 */}
                          <div className="absolute top-2 right-3 font-num text-xs opacity-30" style={{ color: sm.color }}>
                            {String(solarTermsData.indexOf(term) + 1).padStart(2, '0')}
                          </div>
                        </div>

                        {/* 文字 - 花志标签式 */}
                        <div className="text-center">
                          <h3 className="font-serif-title text-base text-[#3D2B0F] group-hover:text-[#8B6914] transition-colors">{term.name}</h3>
                          <p className="font-label text-[8px] tracking-[0.2em] mt-0.5" style={{ color: sm.color }}>{term.latin}</p>
                          <p className="text-[10px] text-[#7A5C2E] mt-1">{term.plant} · {term.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
