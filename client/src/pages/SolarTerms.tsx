import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// 二十四节气完整数据 - 花志版式
const solarTermsData = [
  { name: '立春', latin: 'LICHUN', date: '2月3-5日', plant: '梅花', desc: '东风解冻，蛰虫始振', farming: '备耕整地，修缮农具', season: 'spring', icon: '/manus-storage/solar-lichun_fffd11ab.png' },
  { name: '雨水', latin: 'YUSHUI', date: '2月18-20日', plant: '杏花', desc: '獭祭鱼，鸿雁来', farming: '田间排水，育秧准备', season: 'spring', icon: '/manus-storage/solar-lichun_fffd11ab.png' },
  { name: '惊蛰', latin: 'JINGZHE', date: '3月5-7日', plant: '桃花', desc: '桃始华，仓庚鸣', farming: '春耕开始，播种早稻', season: 'spring', icon: '/manus-storage/solar-lichun_fffd11ab.png' },
  { name: '春分', latin: 'CHUNFEN', date: '3月20-22日', plant: '海棠', desc: '玄鸟至，雷乃发声', farming: '水稻育秧，施肥管理', season: 'spring', icon: '/manus-storage/solar-lichun_fffd11ab.png' },
  { name: '清明', latin: 'QINGMING', date: '4月4-6日', plant: '柳', desc: '桐始华，田鼠化为鴽', farming: '插秧播种，茶叶采摘', season: 'spring', icon: '/manus-storage/solar-qingming_ce50dc18.png' },
  { name: '谷雨', latin: 'GUYU', date: '4月19-21日', plant: '牡丹', desc: '萍始生，鸣鸠拂其羽', farming: '秧苗移栽，病虫防治', season: 'spring', icon: '/manus-storage/solar-qingming_ce50dc18.png' },
  { name: '立夏', latin: 'LIXIA', date: '5月5-7日', plant: '蔷薇', desc: '蝼蝈鸣，蚯蚓出', farming: '早稻分蘖，中稻插秧', season: 'summer', icon: '/manus-storage/solar-mangzhong_8c62636e.png' },
  { name: '小满', latin: 'XIAOMAN', date: '5月20-22日', plant: '石榴', desc: '苦菜秀，靡草死', farming: '田间管理，灌溉施肥', season: 'summer', icon: '/manus-storage/solar-mangzhong_8c62636e.png' },
  { name: '芒种', latin: 'MANGZHONG', date: '6月5-7日', plant: '栀子', desc: '螳螂生，鵙始鸣', farming: '抢收抢种，双抢大忙', season: 'summer', icon: '/manus-storage/solar-mangzhong_8c62636e.png' },
  { name: '夏至', latin: 'XIAZHI', date: '6月21-22日', plant: '荷花', desc: '鹿角解，蝉始鸣', farming: '晚稻插秧，防涝抗旱', season: 'summer', icon: '/manus-storage/solar-xiazhi_af1c9ff8.png' },
  { name: '小暑', latin: 'XIAOSHU', date: '7月6-8日', plant: '茉莉', desc: '温风至，蟋蟀居壁', farming: '中稻抽穗，防治病害', season: 'summer', icon: '/manus-storage/solar-xiazhi_af1c9ff8.png' },
  { name: '大暑', latin: 'DASHU', date: '7月22-24日', plant: '紫薇', desc: '腐草为萤，土润溽暑', farming: '双季稻管理，防高温', season: 'summer', icon: '/manus-storage/solar-xiazhi_af1c9ff8.png' },
  { name: '立秋', latin: 'LIQIU', date: '8月7-9日', plant: '木槿', desc: '凉风至，白露降', farming: '早稻收割，晚稻管理', season: 'autumn', icon: '/manus-storage/solar-liqiu_2813e36f.png' },
  { name: '处暑', latin: 'CHUSHU', date: '8月22-24日', plant: '向日葵', desc: '鹰乃祭鸟，天地始肃', farming: '晚稻抽穗，秋粮管理', season: 'autumn', icon: '/manus-storage/solar-liqiu_2813e36f.png' },
  { name: '白露', latin: 'BAILU', date: '9月7-9日', plant: '桂花', desc: '鸿雁来，玄鸟归', farming: '晚稻灌浆，棉花采摘', season: 'autumn', icon: '/manus-storage/solar-bailu_458b7175.png' },
  { name: '秋分', latin: 'QIUFEN', date: '9月22-24日', plant: '菊花', desc: '雷始收声，蛰虫坯户', farming: '秋收秋种，晒谷入仓', season: 'autumn', icon: '/manus-storage/solar-bailu_458b7175.png' },
  { name: '寒露', latin: 'HANLU', date: '10月7-9日', plant: '芙蓉', desc: '鸿雁来宾，菊有黄华', farming: '晚稻收割，冬种准备', season: 'autumn', icon: '/manus-storage/solar-hanshou_3ae7fa04.png' },
  { name: '霜降', latin: 'SHUANGJANG', date: '10月23-24日', plant: '枫叶', desc: '豺乃祭兽，草木黄落', farming: '秋收扫尾，翻耕冬田', season: 'autumn', icon: '/manus-storage/solar-hanshou_3ae7fa04.png' },
  { name: '立冬', latin: 'LIDONG', date: '11月7-8日', plant: '山茶', desc: '水始冰，地始冻', farming: '冬种油菜，修建水利', season: 'winter', icon: '/manus-storage/solar-daxue_68cbf7ff.png' },
  { name: '小雪', latin: 'XIAOXUE', date: '11月22-23日', plant: '银杏', desc: '虹藏不见，天气上升', farming: '冬季积肥，农田水利', season: 'winter', icon: '/manus-storage/solar-daxue_68cbf7ff.png' },
  { name: '大雪', latin: 'DAXUE', date: '12月6-8日', plant: '腊梅', desc: '鹖鴠不鸣，虎始交', farming: '积肥造肥，兴修水利', season: 'winter', icon: '/manus-storage/solar-daxue_68cbf7ff.png' },
  { name: '冬至', latin: 'DONGZHI', date: '12月21-23日', plant: '水仙', desc: '蚯蚓结，麋角解', farming: '冬闲整地，来年规划', season: 'winter', icon: '/manus-storage/solar-daxue_68cbf7ff.png' },
  { name: '小寒', latin: 'XIAOHAN', date: '1月5-7日', plant: '天竺', desc: '雁北乡，鹊始巢', farming: '选种备种，农具修整', season: 'winter', icon: '/manus-storage/solar-daxue_68cbf7ff.png' },
  { name: '大寒', latin: 'DAHAN', date: '1月20-21日', plant: '瑞香', desc: '鸡始乳，征鸟厉疾', farming: '备春耕物资，迎接新年', season: 'winter', icon: '/manus-storage/solar-daxue_68cbf7ff.png' },
];

const seasonColors = {
  spring: { bg: 'bg-[#F0F7F0]', border: 'border-[#A8D5A0]', text: 'text-[#3D6B35]', accent: '#4A8C5C' },
  summer: { bg: 'bg-[#FFF8F0]', border: 'border-[#F0D4A8]', text: 'text-[#8B6914]', accent: '#C4A86B' },
  autumn: { bg: 'bg-[#FDF5F0]', border: 'border-[#E8C4A0]', text: 'text-[#7A5C2E]', accent: '#A67C52' },
  winter: { bg: 'bg-[#F5F8FA]', border: 'border-[#C0D4E0]', text: 'text-[#3D5060]', accent: '#6B9DAB' },
};

export default function SolarTermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF8]">
      <Header />
      
      {/* 页面标题 - 花志版式 */}
      <section className="py-10 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='%238B6914' stroke-width='0.3'/%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='%238B6914' stroke-width='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }} />
        
        <div className="max-w-[1200px] mx-auto px-6 relative">
          <Link href="/">
            <button className="flex items-center gap-2 text-sm text-[#8B6914] hover:text-[#5C4520] mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              返回地图
            </button>
          </Link>
          
          {/* 花志标题 */}
          <div className="text-center mb-2">
            <p className="font-label text-[11px] text-[#8B6914] tracking-[0.3em] mb-3">TWENTY-FOUR SOLAR TERMS · HUNAN FARMING CALENDAR</p>
            <h1 className="font-display text-4xl text-[#3D2B0F] mb-3">二十四节气</h1>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#C4A86B] to-transparent mx-auto mb-4" />
            <p className="text-[#5C4520] text-sm max-w-lg mx-auto leading-relaxed">
              节气是中华民族农耕智慧的结晶。在湖湘大地，每一个节气都对应着特定的农事活动，<br />
              构成了一部活态的农耕文明百科全书。
            </p>
          </div>
        </div>
      </section>

      {/* 节气网格 - 花志版式 */}
      <section className="flex-1 pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* 按季节分组 */}
          {(['spring', 'summer', 'autumn', 'winter'] as const).map((season) => {
            const seasonTerms = solarTermsData.filter(t => t.season === season);
            const colors = seasonColors[season];
            const seasonName = { spring: '春', summer: '夏', autumn: '秋', winter: '冬' }[season];
            const seasonFull = { spring: '春 · SPRING', summer: '夏 · SUMMER', autumn: '秋 · AUTUMN', winter: '冬 · WINTER' }[season];
            
            return (
              <div key={season} className="mb-12">
                {/* 季节标题 */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.accent + '15', border: `1.5px solid ${colors.accent}40` }}>
                    <span className="font-serif-title text-lg" style={{ color: colors.accent }}>{seasonName}</span>
                  </div>
                  <div>
                    <p className="font-label text-[10px] tracking-[0.2em]" style={{ color: colors.accent }}>{seasonFull}</p>
                    <div className="w-24 h-[1px] mt-1" style={{ background: `linear-gradient(to right, ${colors.accent}40, transparent)` }} />
                  </div>
                </div>

                {/* 节气卡片网格 */}
                <div className="grid grid-cols-6 gap-4">
                  {seasonTerms.map((term) => (
                    <div key={term.name} className={`${colors.bg} ${colors.border} border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden`}>
                      {/* 背景装饰圆 */}
                      <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-[0.06]" style={{ backgroundColor: colors.accent }} />
                      
                      {/* 图标 */}
                      <div className="w-12 h-12 rounded-full overflow-hidden border mb-3 mx-auto" style={{ borderColor: colors.accent + '30' }}>
                        <img src={term.icon} alt={term.name} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* 节气名 */}
                      <h3 className="font-serif-title text-base text-center text-[#3D2B0F] mb-0.5">{term.name}</h3>
                      <p className="font-label text-[8px] text-center tracking-[0.15em] mb-2" style={{ color: colors.accent }}>{term.latin}</p>
                      
                      {/* 物候 */}
                      <p className="text-[10px] text-center text-[#7A5C2E] mb-2 italic">「{term.desc}」</p>
                      
                      {/* 代表植物 */}
                      <div className="text-center">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[9px]" style={{ backgroundColor: colors.accent + '12', color: colors.accent }}>
                          {term.plant}
                        </span>
                      </div>
                      
                      {/* 悬浮显示农事 */}
                      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                        <p className="font-serif-title text-sm text-[#3D2B0F] mb-1">{term.name}</p>
                        <p className="text-[10px] text-[#8B6914] mb-2">{term.date}</p>
                        <p className="text-[10px] text-[#5C4520] text-center leading-relaxed">
                          <strong>湖南农事：</strong>{term.farming}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
