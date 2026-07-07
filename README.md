# 湖南省农耕文化地图

> 万年稻作，始于湖湘

一幅数字地图，展开湖湘万年农耕文明。从14000年前的玉蟾岩栽培稻，到当代杂交水稻革命——探索128处文化点位，感受三湘大地的农耕智慧。

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript |
| 构建 | Vite 7 |
| 样式 | Tailwind CSS 4 + shadcn/ui |
| 动画 | Framer Motion |
| 地图 | Leaflet.js + 高德瓦片底图 |
| 粒子 | Canvas 2D 自定义粒子系统 |
| 路由 | Wouter |
| 包管理 | pnpm |

---

## 项目结构

```
hunan-farming-culture/
├── client/
│   ├── src/
│   │   ├── components/       # 组件
│   │   │   ├── Header.tsx    # 顶部导航
│   │   │   ├── LeafletMap.tsx # Leaflet地图（含蒙版）
│   │   │   ├── HunanMap.tsx  # SVG备用地图
│   │   │   └── ui/          # shadcn/ui组件
│   │   ├── pages/
│   │   │   ├── Landing.tsx   # 欢迎页
│   │   │   ├── Home.tsx      # 地图看板主页
│   │   │   ├── ThemeRoutes.tsx # 主题路线
│   │   │   ├── Timeline.tsx  # 发展脉络
│   │   │   ├── SolarTerms.tsx # 二十四节气
│   │   │   └── Artifacts.tsx # 重要文物
│   │   ├── data/
│   │   │   ├── mapData.ts    # 点位数据
│   │   │   └── hunan-geo.ts  # 地理数据
│   │   ├── index.css         # 全局样式（设计令牌）
│   │   └── App.tsx           # 路由配置
│   └── index.html
├── docs/
│   └── assets/               # 图片资源备份（GitHub存储）
├── ideas.md                  # 设计文档
├── IMAGE_PROMPTS.md          # 图片生成提示词
└── README.md
```

---

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 类型检查
pnpm check

# 构建生产版本
pnpm build
```

开发服务器默认运行在 `http://localhost:3000`

---

## 页面路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 欢迎页 | 古风稻田画卷封面 + 入口按钮 |
| `/map` | 地图看板 | Leaflet地图 + 图层筛选 + 点位列表 |
| `/routes` | 主题路线 | 3条精品农耕文化路线 |
| `/timeline` | 发展脉络 | 9个时期交替时间轴 |
| `/solar-terms` | 二十四节气 | 粒子背景 + 植物画册 + 全屏翻页 |
| `/artifacts` | 重要文物 | 8件珍品网格展示 |

---

## 设计哲学

**山水咨询主义（Landscape Consulting）**

McKinsey式咨询版式骨架 × 湖湘山水雾面自然气质。核心信条：

- **留白即结构** — 每页 ≥40% 负空间
- **自然即隐喻** — 色彩取自山水，纹理取自宣纸
- **网格即纪律** — 非中心化左轴布局
- **一页一论点** — 结论式标题写法

---

## 色彩系统

| 令牌 | 色值 | 用途 |
|------|------|------|
| 暖雾白 | `oklch(0.983 0.003 90)` | 全局底色 |
| 深松墨绿 | `oklch(0.26 0.03 168)` | 主文字色 |
| 土金色 | `oklch(0.52 0.12 75)` | 品牌强调色 |
| 雾青 | `oklch(0.72 0.03 178)` | 次要点缀 |
| 浅石灰 | `oklch(0.92 0.006 96)` | 卡片描边 |

---

## 图片资源

所有AI生成的图片资源备份在 `docs/assets/` 目录中；GitHub Pages 发布使用 `client/public/assets/` 中的静态资源。

图片生成提示词详见 [IMAGE_PROMPTS.md](./IMAGE_PROMPTS.md)。

---

## 部署

项目已配置为 GitHub Pages 静态站点，可构建后发布到 `main` 分支的 `docs/` 目录：

```bash
pnpm build:pages
```

GitHub Pages 发布地址：

`https://paofuxiaomiao.github.io/hunan-farming-culture/`

图片资源已复制到 `client/public/assets/`，构建时会随静态站点一起发布。

---

## 数据来源

- 主办单位：湖南省文化和旅游厅
- 承办单位：湖南省农业农村厅
- 技术支持：湖南省地理信息院
- GeoJSON数据：基于 xiangchao-map 项目公开数据

---

## 许可

MIT License
