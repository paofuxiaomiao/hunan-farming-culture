import { Link } from 'wouter';
import { ArrowLeft, MapPin, Clock, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { themeRoutes, mapPoints } from '@/data/mapData';

export default function ThemeRoutesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* 页面标题区 */}
      <section className="bg-gradient-to-b from-[#FAF7F0] to-background py-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link href="/">
            <button className="flex items-center gap-2 text-sm text-[#8B6914] hover:text-[#5C4520] mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              返回地图
            </button>
          </Link>
          <h1 className="font-display text-3xl text-[#3D2B0F] mb-2">主题线路</h1>
          <p className="text-[#7A5C2E] text-sm max-w-xl">精心策划三条农耕文化主题路线，串联湖南省最具代表性的农耕文化遗产点位，带您穿越万年时光。</p>
        </div>
      </section>

      {/* 路线卡片 */}
      <section className="flex-1 py-8">
        <div className="max-w-[1200px] mx-auto px-6 space-y-8">
          {themeRoutes.map((route, index) => {
            const routePoints = route.points.map(id => mapPoints.find(p => p.id === id)).filter(Boolean);
            return (
              <div key={route.id} className="bg-white rounded-xl border border-[#E8DCC8] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="grid grid-cols-12 gap-0">
                  {/* 图片区 */}
                  <div className="col-span-5 relative">
                    <img src={route.image} alt={route.title} className="w-full h-full object-cover min-h-[280px]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                    <div className="absolute top-4 left-4 bg-[#8B6914] text-white px-3 py-1 rounded text-sm font-medium">
                      线路 {index + 1}
                    </div>
                  </div>
                  
                  {/* 内容区 */}
                  <div className="col-span-7 p-6 flex flex-col">
                    <h2 className="font-serif-title text-xl text-[#3D2B0F] mb-2">{route.title}</h2>
                    <p className="text-sm text-[#5C4520] mb-4">{route.subtitle}</p>
                    
                    {/* 路线信息 */}
                    <div className="flex gap-6 mb-4 text-xs text-[#7A5C2E]">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#8B6914]" />{routePoints.length} 个点位</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#8B6914]" />建议 2-3 天</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-[#8B6914]" />适合研学团</span>
                    </div>

                    {/* 路线点位 */}
                    <div className="flex-1">
                      <p className="text-xs text-[#7A5C2E] mb-2 font-medium">途经点位</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {routePoints.map((point, i) => (
                          <div key={point!.id} className="flex items-center gap-1">
                            <span className="px-2 py-1 bg-[#F5F0E8] border border-[#E8DCC8] rounded text-[11px] text-[#3D2B0F]">
                              {point!.name}
                            </span>
                            {i < routePoints.length - 1 && (
                              <span className="text-[#C4A86B]">→</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex gap-3 mt-4 pt-4 border-t border-[#E8DCC8]">
                      <button className="px-4 py-2 bg-[#8B6914] text-white rounded text-sm hover:bg-[#A67C52] transition-colors">
                        查看详细路线
                      </button>
                      <button className="px-4 py-2 border border-[#E8DCC8] text-[#5C4520] rounded text-sm hover:bg-[#FAF7F0] transition-colors">
                        下载路线图
                      </button>
                    </div>
                  </div>
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
