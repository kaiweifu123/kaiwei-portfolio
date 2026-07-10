/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SectionItem } from './types';

export const archiveData: SectionItem[] = [
  {
    id: 'PH-01',
    title: 'Finding Growth in a Crowded AI Healthcare Market',
    category: 'Research',
    sysId: 'The brief was open-ended.',
    dropCap: '',
    dropCapText: "We didn't set out to build a launch platform. The starting point was much more open-ended: exploring what AI could do for OpenLoop.",
    quote: '',
    paragraphs: [
      'We surveyed the AI landscape across healthcare and generated multiple product directions. On paper, many of them looked commercially attractive.',
      'However, after discussing these ideas with customers and industry leaders at a healthcare conference, we realised the market was already crowded with similar solutions.'
    ],
    leadFaculty: [
      '从思考: 我们还能做什么 AI 产品？',
      '转变为: AI 能把哪些我们现有的业务能力，变成别人很难复制的优势？'
    ],
    requirement: ['战略探索', '市场竞争分析', '问题重构', 'OpenLoop'],
    location: '战略探寻项目组',
    bannerImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 'PH-02',
    title: 'The Unique Opportunity Was Already There',
    category: 'Opportunity',
    sysId: 'AI 如何让更多人开出自己的线上医疗品牌？',
    dropCap: 'O',
    dropCapText: 'penLoop 背后已经有一套把线上医疗业务跑起来的能力：找到合适的医生，处理问诊与审核，把处方交给药房履约，并确保整个流程符合医疗合规要求。',
    quote: '用 AI 把这些复杂的医疗运营能力变得更容易配置、启动和运营，帮助没有医疗能力的人，从一个模糊的商业想法，走到一个可以上线的 telehealth brand。',
    paragraphs: [
      '过去，这些能力主要服务成熟企业。它们已经有品牌、网站、获客渠道和运营团队，接入 OpenLoop 是为了在原有业务上增加医疗服务。',
      '但市场正在变化。创作者、influencer、小型 wellness 品牌和健康领域创业者，越来越容易建立自己的受众和社区。他们有 audience。但他们没有能力快速建立一家 telehealth business。'
    ],
    leadFaculty: [
      '核心赋能: 整合医生、药房及合规履约链路',
      '解决痛点: 脱离技术与医药物流配置的高门槛'
    ],
    requirement: ['新客群洞察', '市场时机', '产品方向定义', 'Telehealth'],
    location: '用户体验与需求调研中心',
    bannerImage: 'https://images.unsplash.com/photo-1549558545-aee92510392f?auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 'PH-03',
    title: 'Building Belief Before Building the Product',
    category: 'First Demo',
    sysId: 'Turn a new direction into a company-backed opportunity.',
    dropCap: '',
    dropCapText: 'The idea sounded promising. But without anything similar on the market, it all lived in our heads.',
    quote: '',
    paragraphs: [
      'So we built a working demo with engineers to make it real.'
    ],
    leadFaculty: [
      '快速成型验证: 降低初始决策阻力',
      '业务可行性对齐: 原型打通共识路径'
    ],
    requirement: ['快速原型', '愿景对齐', 'Stakeholder Buy-in', '立项获批'],
    location: 'Figma 交互设计实验室',
    bannerImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 'PH-04',
    title: 'The Real Work Began After the Demo',
    category: 'Design V1',
    sysId: '从赢得共识，到把 demo 产品化。',
    dropCap: '',
    dropCapText: 'Winning the pitch was only the beginning. Building the product turned out to be a very different design problem. We were no longer designing for an "aha" moment. We were designing for a stable, reliable product.',
    quote: '',
    paragraphs: [
      'That required four connected capability layers working together behind the scenes.'
    ],
    leadFaculty: [
      '后端微内核支撑: 承接患者 Intake 与审核',
      '控制台架构搭建: 用户控制台 Client Center 结构落地'
    ],
    requirement: ['产品化', '完整业务链路', '信息架构', 'Client Center'],
    location: '核心后台与系统架构中心',
    bannerImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 'PH-05',
    title: 'Real Users Arrived Faster Than Expected',
    category: 'Users Feedback',
    sysId: '外部验证 // MARKET SIGNAL',
    dropCap: '就',
    dropCapText: '在产品准备正式上线的过程中，市场突然给了我们一个意想不到的信号。',
    quote: 'Within two days, more than 50 clients reached out.',
    paragraphs: [
      '作为 OpenLoop 的客户，MedVi，一家一人医疗 AI 公司，在短时间内迅速走红，并被 NYTimes 等媒体报道。随着关注度不断上升，越来越多人开始注意到支撑 MedVi 背后的基础设施和运营能力。',
      '很快，刚上线的 onboarding 流程像迎接洪峰一样，迎来了第一批真实客户。',
      '然而他们反馈的重点，与团队此前预判的风险几乎完全不同。'
    ],
    leadFaculty: [
      '真实客户涌入: 两天内 50+ 客户主动接洽',
      '反馈错位: 真实问题与团队预判完全不同'
    ],
    requirement: ['用户测试', '认知负担', 'Onboarding Redesign', '设计原则'],
    location: '体验实验室与可用性观察站',
    bannerImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 'PH-06',
    title: 'The best AI stays out of the way',
    category: 'Iteration',
    sysId: '最好的 AI 不一定最显眼。',
    dropCap: 'I',
    dropCapText: 'n the first demo, AI Chat played an important role. It made the product feel intelligent, and it helped stakeholders immediately understand that AI was part of the experience. But real onboarding is not a demo. Users are not there to explore AI. They are there to complete setup, submit for review, and launch as quickly as possible.',
    quote: 'Sometimes the best AI is the one that does not pull attention away from the task.',
    paragraphs: [],
    leadFaculty: [
      '主动交互转变: 聊天模式 ➜ 场景守望伴随反馈',
      '体验提纯: 去除喧宾夺主的浮华，聚焦任务进程'
    ],
    requirement: ['AI 交互设计', 'Contextual AI', '设计判断', 'Demo vs Product'],
    location: '技术复盘会与最终评审沙龙',
    bannerImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1920&q=80'
  }
];
