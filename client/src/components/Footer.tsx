export default function Footer() {
  return (
    <footer>
      {/* 红色边框装饰（参考图中的红色边框区域） */}
      <div className="border-t-2 border-b-2 border-[#C44545]/30 bg-[#FDFCF8]">
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          <div className="flex items-center justify-center gap-8 text-sm text-[#3D2B0F]">
            <span>
              <strong className="text-[#3D2B0F]">主办单位：</strong>
              湖南省文化和旅游厅
            </span>
            <span className="w-px h-4 bg-[#D4C4A0]" />
            <span>
              <strong className="text-[#3D2B0F]">承办单位：</strong>
              湖南省农业农村厅
            </span>
            <span className="w-px h-4 bg-[#D4C4A0]" />
            <span>
              <strong className="text-[#3D2B0F]">技术支持：</strong>
              湖南省地理信息院
            </span>
          </div>
        </div>
      </div>

      {/* 备案信息 */}
      <div className="bg-[#F5F0E8] border-t border-[#E8DCC8]">
        <div className="max-w-[1440px] mx-auto px-6 py-3 flex items-center justify-center gap-8 text-xs text-[#7A5C2E]">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#8B6914]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            湘ICP备 2024012345号-1
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#C44545]" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" opacity="0.8" />
              <circle cx="12" cy="12" r="4" fill="white" />
            </svg>
            <span>湘公网安备 4301110200123号</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
