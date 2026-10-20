/*
 * 网站的全部内容都在这里。改这个文件即可,无需动 HTML。
 * 文字字段是 { zh, en } 双语;只写字符串时两种语言共用。标记【待填】的是占位内容。
 */
window.SITE = {
  name: { zh: "林予典", en: "Yudian Lin" },
  altName: { zh: "Yudian Lin", en: "林予典" },
  title: { zh: "网络工程师 · AI Agent 开发者", en: "Network Engineer · AI Agent Builder" },
  affiliation: { zh: "中国联通上海市分公司", en: "China Unicom Shanghai" },
  location: { zh: "中国 · 上海", en: "Shanghai, China" },
  avatar: "", // 放一张照片到本目录,例如 "avatar.jpg";留空则显示姓氏
  email: "386596864@qq.com",

  links: [
    { label: "GitHub", url: "https://github.com/Rainsmumu", icon: "github" },
    { label: { zh: "B 站", en: "Bilibili" }, url: "https://space.bilibili.com/4702048", icon: "bilibili" },
    { label: "Google Scholar", url: "", icon: "scholar" }, // 【待填】有的话填上链接,留空则不显示
  ],

  about: {
    zh: [
      "你好,我是林予典。目前在中国联通上海市分公司从事网络维护工作。2025 年毕业于上海大学计算机工程与科学学院,获计算机应用技术硕士学位;本科毕业于福建农林大学计算机科学与技术专业。读研期间研究方向是 AI for Materials,主要用图神经网络预测聚合物性质,并尝试把领域知识融入机器学习模型。",
      "业余时间我主要在折腾 AI Agent:用 Claude Code、Codex 等工具搭建多 Agent 协作的开发流程,做数据采集、自动化和量化研究方面的项目。我关心的不只是 Agent 能不能把事做完,还有它的产出是否可信、可复现、可接手。",
      "我也会在 B 站分享一些折腾过程。欢迎通过邮件联系我。",
    ],
    en: [
      "Hi, I'm Yudian Lin. I work on network operations at China Unicom Shanghai. I received my M.Eng. in Computer Application Technology from the School of Computer Engineering and Science, Shanghai University, in 2025, and my B.Eng. in Computer Science from Fujian Agriculture and Forestry University. My graduate research focused on AI for materials — graph neural networks for polymer property prediction and integrating domain knowledge into machine-learning models.",
      "Outside work I build with AI agents: multi-agent development workflows on Claude Code and Codex, plus projects in data collection, automation and quantitative research. I care not only about whether an agent finishes the job, but whether its output is trustworthy, reproducible and easy to hand off.",
      "I occasionally share what I'm tinkering with on Bilibili. Feel free to reach out by email.",
    ],
  },

  interests: [
    { zh: "AI Agent 与多 Agent 协作", en: "AI agents & multi-agent collaboration" },
    { zh: "图神经网络与材料信息学", en: "GNNs & materials informatics" },
    { zh: "LLM 辅助软件工程", en: "LLM-assisted software engineering" },
    { zh: "数据采集与自动化", en: "Data collection & automation" },
    { zh: "可复现的数据研究方法", en: "Reproducible data research" },
  ],

  news: [
    { date: "2026.07", text: { zh: "个人项目 Tide 的采集器进入 7×24 生产运行,前向 shadow 评估同步上线。", en: "The collector of my side project Tide went into 24/7 production, with forward-shadow evaluation online." } },
    { date: "2025.09", text: { zh: "论文 SE-MPNN 发表于 Macromolecules。", en: "Our SE-MPNN paper was published in Macromolecules." } },
    { date: "2025.08", text: { zh: "加入中国联通上海市分公司,从事网络维护工作。", en: "Joined China Unicom Shanghai, working on network operations." } },
    { date: "2025.06", text: { zh: "从上海大学硕士毕业 🎓", en: "Graduated from Shanghai University with an M.Eng. 🎓" } },
  ],

  // 论文:me 填你在作者列表里的写法,会自动加粗
  me: ["Yudian Lin", "林予典"],
  // note 可写 { zh, en } 或字符串,例如 "CCF-B";留空不显示。按此顺序展示
  publications: [
    {
      title: "Substructure-Enhanced MPNN for Polymer Discovery and Knowledge: A Study in Predicting Glass Transition Temperature",
      authors: "Huiran Zhang, Yudian Lin, Shengzhou Li, Mengmeng Dai, Yu Zhang, Lei Huang, Jiangcan Pang, Pin Wu, Junjie Peng, Zheng Tang, Peng Ding, Xiao Wei, Na Song, Dongbo Dai",
      venue: "Macromolecules, 58(17), 9515–9527",
      year: "2025",
      note: { zh: "主要完成人 · 导师一作", en: "Lead contributor · advisor listed first" },
      links: [
        { label: "Paper", url: "https://doi.org/10.1021/acs.macromol.4c02859" },
        { label: "Code", url: "https://github.com/Rainsmumu/SE-MPNN" },
      ],
    },
    {
      title: "Integrating stoichiometry and chain architecture for accurate copolymer property prediction",
      authors: "Yudian Lin, Baoyu Xu, Mengmeng Dai, Jiangcan Pang, Chenyang Huang, Huanyu Xu, Simin Zhao, Shengzhou Li, Dongbo Dai, Huiran Zhang",
      venue: "Journal of Physics: Conference Series, 3067, 012070",
      year: "2025",
      note: { zh: "第一作者", en: "First author" },
      links: [{ label: "Paper", url: "https://doi.org/10.1088/1742-6596/3067/1/012070" }],
    },
    {
      title: "AS-MPNN: An Adaptive Substructure-Aware Message Passing Neural Network for Enhanced Polymer Property Prediction",
      authors: "Yudian Lin, Baoyu Xu, Mengmeng Dai, Jiangcan Pang, Chenyang Huang, Huanyu Xu, Simin Zhao, Shengzhou Li, Dongbo Dai, Huiran Zhang",
      venue: "2025 5th International Conference on Artificial Intelligence, Big Data and Algorithms (CAIBDA), 1155–1159",
      year: "2025",
      note: { zh: "第一作者", en: "First author" },
      links: [{ label: "Paper", url: "https://doi.org/10.1109/CAIBDA65784.2025.11182808" }],
    },
    {
      title: "Subgroup discovery similarity score (SDSS): A significant criterion for the integration of statistical knowledge into machine learning in materials science",
      authors: "Huiran Zhang, Mengmeng Dai, Yudian Lin, Baoyu Xu, Pin Wu, Lei Huang, Huanyu Xu, Shengzhou Li, Yan Xu, Zheng Tang, Jincang Zhang, Renchao Che, Tao Xu, Dongbo Dai",
      venue: "Materials Today Physics, 56, 101772",
      year: "2025",
      note: "",
      links: [{ label: "Paper", url: "https://doi.org/10.1016/j.mtphys.2025.101772" }],
    },
    {
      title: "A GPT-assisted iterative method for extracting domain knowledge from a large volume of literature of electromagnetic wave absorbing materials with limited manually annotated data",
      authors: "Dongbo Dai, Guangjie Zhang, Xiao Wei, Yudian Lin, Mengmeng Dai, Junjie Peng, Na Song, Zheng Tang, Shengzhou Li, Jiwei Liu, Yan Xu, Renchao Che, Huiran Zhang",
      venue: "Computational Materials Science, 246, 113431",
      year: "2025",
      note: "",
      links: [{ label: "Paper", url: "https://doi.org/10.1016/j.commatsci.2024.113431" }],
    },
  ],

  projects: [
    {
      name: "Tide",
      url: "", // 仓库目前是私有的,公开后可填 https://github.com/Rainsmumu/Tide
      desc: {
        zh: "数据驱动的加密市场研究系统。7×24 采集社区情绪与合约行情,以预注册、对照基线和前向复现检验信号是否真实存在;由 Claude 与 Codex 协作开发、交叉审查。",
        en: "A data-first crypto market research system. Collects community sentiment and futures data 24/7 and tests signals with pre-registration, baselines and forward replication; co-developed and cross-reviewed by Claude and Codex.",
      },
      tags: ["Python", "SQLite", "Multi-agent", "systemd"],
    },
    {
      name: "SubSentry",
      url: "",
      desc: {
        zh: "海缆故障通报辅助工具。实时态势图、多阶段通报自动生成、受影响电路统计与 Excel 报表导出,支持离线一键部署。",
        en: "A submarine-cable incident reporting tool: live status map, auto-generated multi-stage reports, impacted-circuit analysis and Excel export, with one-click offline deployment.",
      },
      tags: ["Flask", "openpyxl", "SVG"],
    },
    {
      name: "Alpha Bot",
      url: "",
      desc: {
        zh: "基于 Playwright 的浏览器自动化交易助手,自动读取行情、执行策略,并把记录同步到 Notion。",
        en: "A Playwright-based browser-automation trading assistant that reads market data, runs a strategy and syncs logs to Notion.",
      },
      tags: ["Playwright", "asyncio", "Notion API"],
    },
  ],

  experience: [
    {
      when: { zh: "2025.08 — 至今", en: "2025.08 — Present" },
      title: { zh: "网络维护", en: "Network Operations" },
      org: { zh: "中国联合网络通信有限公司上海市分公司", en: "China Unicom Shanghai Branch" },
      points: { zh: [], en: [] }, // 【可选】写一两条具体工作或成果
    },
  ],

  education: [
    {
      when: "2022.09 — 2025.06",
      title: { zh: "硕士 · 计算机应用技术", en: "M.Eng. in Computer Application Technology" },
      org: { zh: "上海大学 · 计算机工程与科学学院", en: "Shanghai University · School of Computer Engineering and Science" },
      points: { zh: [], en: [] }, // 【可选】研究方向 / 导师 / 实验室
    },
    {
      when: "2018.09 — 2022.06",
      title: { zh: "学士 · 计算机科学与技术", en: "B.Eng. in Computer Science and Technology" },
      org: { zh: "福建农林大学", en: "Fujian Agriculture and Forestry University" },
      points: { zh: [], en: [] },
    },
  ],

  skills: [
    { group: { zh: "编程", en: "Programming" }, items: "Python, JavaScript, SQL, Shell" },
    { group: { zh: "工具", en: "Tools" }, items: "Claude Code, Codex, MCP, Playwright, Flask, Git, Linux / systemd" },
    { group: { zh: "语言", en: "Languages" }, items: { zh: "中文(母语)、英语(CET-6)", en: "Chinese (native), English (CET-6)" } },
  ],
};
