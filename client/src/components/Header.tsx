import { Search, Share2 } from 'lucide-react';
import { Link } from 'wouter';
import { routePath } from '@/lib/sitePaths';

export default function Header() {
  return (
    <header className="relative">
      {/* 顶部装饰纹样带 */}
      <div className="h-[6px] bg-gradient-to-r from-[#8B6914]/20 via-[#C4A86B]/40 to-[#8B6914]/20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-border-top opacity-60" />
      </div>
      
      {/* 主导航 */}
      <div className="bg-gradient-to-b from-[#3D2B0F] to-[#2A1E0A] text-white relative overflow-hidden">
        {/* 背景纹理 */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* 右上角水稻穗装饰 */}
        <div className="absolute -top-4 -right-6 w-36 h-24 opacity-[0.15] pointer-events-none">
          <img src="assets/rice-branch-decor.webp" alt="" className="w-full h-full object-contain object-right-top" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 h-[60px] flex items-center justify-between relative z-10">
          {/* Logo + 标题 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded overflow-hidden border border-[#8B6914]/40 flex-shrink-0 shadow-sm">
              <img
                src="assets/logo-seal.webp"
                alt="湖南省农耕文化地图"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-serif-title text-[17px] tracking-wide text-[#F5E6C8]">
                湖南省农耕文化地图
              </h1>
              <p className="text-[11px] text-[#B8976A] tracking-wider mt-[-1px]">
                小小一幅地图，展开湖湘万年农耕文明
              </p>
            </div>
          </div>

          {/* 导航菜单 */}
          <nav className="hidden lg:flex items-center gap-7">
            {[
              { label: '地图浏览', href: '/' },
              { label: '主题线路', href: '/routes' },
              { label: '发展脉络', href: '/timeline' },
              { label: '重要文物', href: '/artifacts' },
              { label: '节气日历', href: '/solar-terms' },
            ].map((item) => (
              <Link key={item.href} href={routePath(item.href)}>
                <span className="text-[13px] text-[#E8D5A8] hover:text-white transition-colors duration-200 tracking-wide relative group cursor-pointer">
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#C4A86B] group-hover:w-full transition-all duration-300" />
                </span>
              </Link>
            ))}
          </nav>

          {/* 搜索 + 分享 */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-[#2A1E0A]/80 border border-[#5C4520] rounded px-3 py-1.5 backdrop-blur-sm">
              <input
                type="text"
                placeholder="搜索点位、遗址、主题..."
                className="bg-transparent text-[12px] text-[#C4A86B] placeholder-[#7A5C2E] w-36 outline-none"
              />
              <Search className="w-3.5 h-3.5 text-[#8B6914]" />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8B6914] hover:bg-[#A67C52] rounded text-[12px] transition-colors shadow-sm">
              <Share2 className="w-3 h-3" />
              <span>分享</span>
            </button>
          </div>
        </div>
      </div>

      {/* 底部金色装饰线 */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C4A86B]/50 to-transparent" />
    </header>
  );
}
