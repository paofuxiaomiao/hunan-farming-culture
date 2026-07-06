import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const timelineData = [
  {
    era: '更新世稻作起源',
    period: '距今约14000年',
    location: '永州道县玉蟾岩',
    description: '玉蟾岩遗址发现了目前世界上最早的人工栽培稻标本，将人类稻作农业的起源追溯到14000年前。这一发现证明了湖南是世界稻作文明的重要发源地。',
    significance: '世界稻作起源地',
    color: '#8B6914',
  },
  {
    era: '新石器时代早期',
    period: '距今约9000年',
    location: '常德澧县彭头山',
    description: '彭头山遗址是长江中游目前所知最早的新石器时代定居聚落，发现了世界上最早的稻作农业痕迹——稻壳与谷粒，标志着从采集到种植的文明飞跃。',
    significance: '最早定居农业聚落',
    color: '#A67C52',
  },
  {
    era: '新石器时代中期',
    period: '距今6500-5800年',
    location: '常德澧县城头山',
    description: '城头山遗址发现了中国最早的古城址和最早的水稻田遗迹，环壕聚落的出现标志着社会组织的复杂化，农业生产已具备相当规模。',
    significance: '中国最早古城与稻田',
    color: '#7A5C2E',
  },
  {
    era: '商周青铜时代',
    period: '约公元前1600-前221年',
    location: '长沙宁乡炭河里',
    description: '炭河里遗址出土了四羊方尊等国宝级青铜器，青铜农具的出现大幅提升了农业生产力，湖南进入了以青铜工具为标志的农业发展新阶段。',
    significance: '青铜农具革命',
    color: '#5C4520',
  },
  {
    era: '秦汉大一统',
    period: '公元前221年-公元220年',
    location: '湘西龙山里耶',
    description: '里耶秦简记录了秦代洞庭郡的行政管理与农业税赋制度，铁制农具的普及和水利灌溉的发展使湖南成为重要的粮食产区。',
    significance: '铁器与水利灌溉',
    color: '#3D2B0F',
  },
  {
    era: '唐宋繁荣期',
    period: '618-1279年',
    location: '长沙铜官窑、新化紫鹊界',
    description: '唐代铜官窑陶瓷远销海外，宋代"湖广熟，天下足"的谚语确立了湖南作为天下粮仓的地位。紫鹊界梯田在此时期达到鼎盛。',
    significance: '天下粮仓确立',
    color: '#8B6914',
  },
  {
    era: '明清发展期',
    period: '1368-1911年',
    location: '安化、洪江',
    description: '安化黑茶成为万里茶道的重要商品，洪江古商城见证了农产品贸易的繁荣。湖南农业经济体系日趋完善，形成了稻、茶、桐油等多元产业格局。',
    significance: '多元农业经济',
    color: '#A67C52',
  },
  {
    era: '近现代变革',
    period: '1911年-1970年代',
    location: '韶山、平江等地',
    description: '从农民运动到土地改革，从互助组到人民公社，湖南农村经历了深刻的社会变革。毛泽东《湖南农民运动考察报告》开创了中国农村革命的先河。',
    significance: '农村革命先河',
    color: '#C44545',
  },
  {
    era: '杂交水稻时代',
    period: '1970年代至今',
    location: '怀化洪江、长沙',
    description: '袁隆平院士在湖南成功培育杂交水稻，使水稻产量大幅提升，为解决世界粮食安全问题作出了划时代贡献。湖南由此成为全球农业科技创新高地。',
    significance: '世界粮食安全贡献',
    color: '#4A8C5C',
  },
];

export default function TimelinePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* 页面标题 */}
      <section className="bg-gradient-to-b from-[#FAF7F0] to-background py-8">
        <div className="max-w-[1000px] mx-auto px-6">
          <Link href="/">
            <button className="flex items-center gap-2 text-sm text-[#8B6914] hover:text-[#5C4520] mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              返回地图
            </button>
          </Link>
          <h1 className="font-display text-3xl text-[#3D2B0F] mb-2">湖湘农耕文化发展脉络</h1>
          <p className="text-[#7A5C2E] text-sm max-w-2xl">从14000年前的稻作起源到当代杂交水稻革命，湖湘大地书写了一部波澜壮阔的农耕文明史诗。</p>
        </div>
      </section>

      {/* 时间轴 */}
      <section className="flex-1 py-8 pb-16">
        <div className="max-w-[1000px] mx-auto px-6 relative">
          {/* 中轴线 */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C4A86B] via-[#8B6914] to-[#4A8C5C] -translate-x-1/2" />
          
          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={item.era} className={`relative flex items-start mb-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* 内容卡片 */}
                <div className={`w-[calc(50%-40px)] ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white rounded-lg border border-[#E8DCC8] p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                      <span className="px-2 py-0.5 rounded text-[10px] text-white font-medium" style={{ backgroundColor: item.color }}>
                        {item.significance}
                      </span>
                    </div>
                    <h3 className="font-serif-title text-lg text-[#3D2B0F] mb-1">{item.era}</h3>
                    <p className="text-xs text-[#8B6914] mb-2 font-medium">{item.period} · {item.location}</p>
                    <p className="text-xs text-[#5C4520] leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* 中心节点 */}
                <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-3 border-white shadow-md flex items-center justify-center z-10" style={{ backgroundColor: item.color }}>
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>

                {/* 另一侧留白 */}
                <div className="w-[calc(50%-40px)]" />
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
