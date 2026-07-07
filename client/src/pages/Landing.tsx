import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { MapPin, Route, Landmark, Sun, ArrowRight } from 'lucide-react';
import { routePath } from '@/lib/sitePaths';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white overflow-hidden relative">
      {/* 古风稻田画卷背景 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(assets/hero-rice-scroll.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          opacity: 0.72,
        }}
      />
      {/* 渐变叠加 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/70 via-[#0F0F0F]/30 to-[#0F0F0F]/82" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/45 via-transparent to-[#0F0F0F]/45" />

      {/* 等高线纹理 */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Cg fill='none' stroke='white' stroke-width='0.5'%3E%3Cpath d='M0 400 Q200 350 400 400 T800 380'/%3E%3Cpath d='M0 450 Q200 400 400 450 T800 430'/%3E%3Cpath d='M0 500 Q200 450 400 500 T800 480'/%3E%3Cpath d='M0 200 Q200 150 400 200 T800 180'/%3E%3Cpath d='M0 250 Q200 200 400 250 T800 230'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '800px 800px',
      }} />

      {/* 内容 */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* 顶部 */}
        <header className="px-10 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded overflow-hidden border border-white/10">
              <img src="assets/logo-seal.webp" alt="" className="w-full h-full object-cover" />
            </div>
            <span className="font-label text-[9px] tracking-[0.3em] text-white/40">HUNAN FARMING CULTURE MAP</span>
          </div>
          <nav className="flex items-center gap-6">
            {['主题线路', '发展脉络', '重要文物', '节气日历'].map((item) => (
              <span key={item} className="text-xs text-white/40 hover:text-white/70 transition-colors cursor-pointer">{item}</span>
            ))}
          </nav>
        </header>

        {/* 主内容 */}
        <main className="flex-1 flex items-center px-10">
          <div className="max-w-[700px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="font-label text-[10px] tracking-[0.4em] text-[#C4A86B]/80 mb-6">
                HUNAN PROVINCE · AGRICULTURAL CIVILIZATION
              </p>
              <h1 className="font-display text-6xl leading-[1.15] text-white mb-6">
                万年稻作，<br />始于湖湘
              </h1>
              <p className="text-base text-white/50 leading-relaxed max-w-[480px] mb-10 font-body-light">
                一幅数字地图，展开湖湘万年农耕文明。从14000年前的玉蟾岩栽培稻，到当代杂交水稻革命——探索128处文化点位，感受三湘大地的农耕智慧。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <Link href={routePath("/map")}>
                <button className="group flex items-center gap-3 px-7 py-3.5 bg-[#C4A86B] hover:bg-[#D4B87B] text-[#1A1A1A] rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#C4A86B]/20">
                  进入数字地图看板
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>
        </main>

        {/* 底部统计 */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="px-10 py-8 border-t border-white/[0.06]"
        >
          <div className="flex items-center gap-12">
            {[
              { icon: MapPin, value: '128', label: '文化点位' },
              { icon: Route, value: '3', label: '主题线路' },
              { icon: Landmark, value: '24', label: '重要文物' },
              { icon: Sun, value: '24', label: '二十四节气' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <stat.icon className="w-4 h-4 text-[#C4A86B]/60" strokeWidth={1.5} />
                <div>
                  <span className="font-num text-2xl font-semibold text-white/80">{stat.value}</span>
                  <span className="text-xs text-white/30 ml-2">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 主办单位 */}
          <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center gap-6 text-[10px] text-white/20">
            <span>主办：湖南省文化和旅游厅</span>
            <span>承办：湖南省农业农村厅</span>
            <span>技术支持：湖南省地理信息院</span>
          </div>
        </motion.footer>
      </div>

      {/* 右侧装饰 - 稻穗 */}
      <div className="absolute top-20 right-0 w-[300px] h-[500px] opacity-[0.08] pointer-events-none">
        <img src="assets/rice-branch-decor.png" alt="" className="w-full h-full object-contain" />
      </div>

      {/* 向下滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] text-white/20">向下滑动</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-4 h-6 rounded-full border border-white/15 flex items-start justify-center pt-1"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/30" />
        </motion.div>
      </motion.div>
    </div>
  );
}
