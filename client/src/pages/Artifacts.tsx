import { Link } from 'wouter';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { routePath } from '@/lib/sitePaths';

const artifactsData = [
  {
    name: '玉蟾岩栽培稻标本',
    period: '旧石器时代晚期',
    age: '距今约14000年',
    origin: '永州道县玉蟾岩遗址',
    description: '世界上最早的人工栽培稻标本，是人类从野生稻向栽培稻过渡的关键证据，证明了湖南是世界稻作农业的重要发源地。',
    significance: '世界之最',
    image: 'assets/artifact-pottery.png',
    category: '农业遗存',
  },
  {
    name: '彭头山遗址陶器',
    period: '新石器时代早期',
    age: '距今约9000年',
    origin: '常德澧县彭头山遗址',
    description: '出土的陶器中夹杂有稻壳印痕，是长江中游最早的陶器之一，反映了早期定居农业社会的生活面貌。',
    significance: '国家一级文物',
    image: 'assets/artifact-pottery.png',
    category: '陶器',
  },
  {
    name: '城头山古稻田遗迹',
    period: '新石器时代',
    age: '距今约6500年',
    origin: '常德澧县城头山遗址',
    description: '中国目前发现最早的水稻田遗迹，保存有清晰的田埂、灌溉沟渠，是研究早期稻作农业的珍贵实物证据。',
    significance: '全国重点文保',
    image: 'assets/artifact-pottery.png',
    category: '农业遗存',
  },
  {
    name: '四羊方尊',
    period: '商代晚期',
    age: '距今约3000年',
    origin: '长沙宁乡炭河里遗址',
    description: '中国现存最大的商代青铜方尊，以四只卷角羊为装饰，工艺精湛，是中国青铜铸造艺术的巅峰之作。',
    significance: '国宝级文物',
    image: 'assets/artifact-bronze.png',
    category: '青铜器',
  },
  {
    name: '里耶秦简',
    period: '秦代',
    age: '距今约2200年',
    origin: '湘西龙山里耶古城',
    description: '出土秦简3.7万余枚，记录了秦代洞庭郡的行政管理、户籍制度和农业税赋，是研究秦代地方治理的第一手资料。',
    significance: '21世纪重大考古发现',
    image: 'assets/artifact-bronze.png',
    category: '简牍',
  },
  {
    name: '铜官窑釉下彩瓷',
    period: '唐代',
    age: '距今约1200年',
    origin: '长沙望城铜官窑遗址',
    description: '开创了釉下彩绘工艺的先河，产品远销东南亚、西亚等地，是唐代海上丝绸之路的重要见证。',
    significance: '世界陶瓷史里程碑',
    image: 'assets/artifact-pottery.png',
    category: '陶瓷',
  },
  {
    name: '高庙遗址白陶祭器',
    period: '新石器时代',
    age: '距今约7800年',
    origin: '怀化洪江高庙遗址',
    description: '精美的白陶祭器上刻有太阳纹、凤鸟纹等图案，是中国最早的宗教祭祀艺术品之一，反映了先民的精神世界。',
    significance: '中国最早宗教艺术',
    image: 'assets/artifact-bronze.png',
    category: '祭祀器',
  },
  {
    name: '紫鹊界梯田灌溉系统',
    period: '先秦至今',
    age: '2000余年',
    origin: '娄底新化紫鹊界',
    description: '无需人工修建水库和水渠的自流灌溉系统，利用山体自然渗水原理，是古代农业水利工程的杰出代表。',
    significance: '世界灌溉工程遗产',
    image: 'assets/route-farming-origin.png',
    category: '水利工程',
  },
];

export default function ArtifactsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* 页面标题 */}
      <section className="bg-gradient-to-b from-[#FAF7F0] to-background py-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link href={routePath("/")}>
            <button className="flex items-center gap-2 text-sm text-[#8B6914] hover:text-[#5C4520] mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              返回地图
            </button>
          </Link>
          <h1 className="font-display text-3xl text-[#3D2B0F] mb-2">重要文物</h1>
          <p className="text-[#7A5C2E] text-sm max-w-2xl">从万年前的栽培稻标本到唐代釉下彩瓷，这些珍贵文物见证了湖湘农耕文明的辉煌历程。</p>
        </div>
      </section>

      {/* 文物网格 */}
      <section className="flex-1 py-8 pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 gap-6">
            {artifactsData.map((artifact, index) => (
              <div key={artifact.name} className="bg-white rounded-xl border border-[#E8DCC8] overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                <div className="flex">
                  {/* 图片 */}
                  <div className="w-[200px] flex-shrink-0 relative overflow-hidden">
                    <img src={artifact.image} alt={artifact.name} className="w-full h-full object-cover min-h-[200px] group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 bg-[#8B6914] text-white text-[10px] rounded font-medium">
                        {artifact.significance}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-0.5 bg-white/90 text-[#5C4520] text-[10px] rounded border border-[#E8DCC8]">
                        {artifact.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* 内容 */}
                  <div className="flex-1 p-5 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-serif-title text-lg text-[#3D2B0F]">{artifact.name}</h3>
                      <span className="text-xs text-[#8B6914] font-num bg-[#F5F0E8] px-2 py-0.5 rounded flex-shrink-0 ml-2">
                        #{String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3 text-xs text-[#7A5C2E]">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#8B6914]" />{artifact.period} · {artifact.age}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-3 text-xs text-[#7A5C2E]">
                      <MapPin className="w-3 h-3 text-[#8B6914]" />{artifact.origin}
                    </div>
                    
                    <p className="text-xs text-[#5C4520] leading-relaxed flex-1">{artifact.description}</p>
                    
                    <div className="mt-3 pt-3 border-t border-[#E8DCC8]">
                      <button className="text-xs text-[#8B6914] hover:text-[#5C4520] font-medium transition-colors">
                        查看详情 →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
