export type PortfolioBlock =
  | { type: 'paragraphs'; items: string[] }
  | { type: 'rich-paragraphs'; items: { parts: { text: string; strong?: boolean }[] }[] }
  | { type: 'method'; label: string; title: string; body: string[]; tone?: 'blue' | 'black' }
  | {
      type: 'goal-layout';
      goals: { title: string; body: string }[];
      figure: { src: string; alt: string; caption?: string };
    }
  | {
      type: 'stacked-cards-figure';
      items: { title: string; body: string }[];
      figure: { src: string; alt: string; caption?: string };
    }
  | {
      type: 'insight-cards';
      items: {
        index: string;
        icon: 'user' | 'competitors' | 'product';
        bullets: {
          parts: {
            text: string;
            highlight?: boolean;
          }[];
        }[];
      }[];
    }
  | {
      type: 'design-pages';
      items: {
        title: { parts: { text: string; emphasis?: boolean }[] };
        figure: { src: string; alt: string };
      }[];
    }
  | {
      type: 'reflection';
      takeaways: { title: string; body: string }[];
      quote?: string;
      metrics: { value: string; label: string }[];
      figure: { src: string; alt: string; caption: string };
      closing: string[];
    }
  | {
      type: 'iterations';
      items: {
        image: { src: string; alt: string };
        title: string;
        body: string;
      }[];
    }
  | {
      type: 'testing';
      methods: {
        visual: 'ab' | 'prototype';
        title: string;
        body: string;
      }[];
      findings: {
        visual: 'qr' | 'allergy' | 'translation';
        title: string;
        body: string;
      }[];
    }
  | {
      type: 'stages';
      items: {
        index: string;
        eyebrow: string;
        title: string;
        body?: string[];
        feature?: {
          media: { src: string; alt: string };
          title: string;
          body: string;
          evidence: { src: string; alt: string; caption: string };
        };
        cards?: { title: string; body?: string }[];
        figures?: { src: string; alt: string; caption?: string }[];
        figureLayout?: 'grid' | 'stack';
        figureCaption?: string;
        proseBlocks?: { title: string; items?: string[] }[];
        postProseFigures?: { src: string; alt: string; caption?: string }[];
        split?: {
          body: string[];
          figure: { src: string; alt: string; caption?: string };
        };
        callout?: string;
      }[];
    }
  | { type: 'meta'; items: { label: string; values: string[] }[] }
  | { type: 'cards'; items: { title: string; body?: string }[] }
  | { type: 'evidence'; title: string; items: { title: string; body?: string }[] }
  | { type: 'figure'; src: string; alt: string; caption?: string; frame?: 'raw' | 'flush' }
  | { type: 'gallery'; layout?: 'stack' | 'paired'; figures: { type: 'figure'; src: string; alt: string; caption?: string }[] };

export interface PortfolioCaseSection {
  id: string;
  label: string;
  title: string;
  surface?: 'base' | 'subtle';
  blocks: PortfolioBlock[];
}

export interface PortfolioCase {
  slug: string;
  title: string;
  subtitle?: string;
  subtitleHighlight?: string;
  chips: string[];
  hero: {
    src: string;
    alt: string;
    fit?: 'contain' | 'cover';
    background?: string;
    objectPosition?: string;
  };
  meta: { label: string; values: string[] }[];
  metaPlacement?: 'afterIntro' | 'afterFirstFigure';
  sections: PortfolioCaseSection[];
}

export const portfolioCases = [
  {
    "slug": "hireable",
    "title": "Hireable AI CV Builder",
    "subtitle": "Won £120k+ investment with a prototype of a resume builder.",
    "subtitleHighlight": "£120k+",
    "chips": [
      "8 weeks",
      "AI CV builder",
      "Jobseekers"
    ],
    "hero": {
      "src": "/case-assets/hireable/assets/figma/extracted/hero-handheld-ipad-2.jpg",
      "alt": "Hireable product shown on an iPad",
      "background": "#c8c8c8"
    },
    "meta": [
      {
        "label": "Role",
        "values": [
          "Product Design",
          "AI Experience Design"
        ]
      },
      {
        "label": "Team",
        "values": [
          "Founder"
        ]
      },
      {
        "label": "Users",
        "values": [
          "Jobseekers"
        ]
      },
      {
        "label": "Timeline",
        "values": [
          "2025",
          "8 weeks"
        ]
      }
    ],
    "sections": [
      {
        "id": "s0",
        "label": "Overview",
        "title": "Integrating AI into CV editing without taking control away",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "Hireable’s product owner Joe turned years of job coaching experience into a SaaS tool for role-specific CV creation and shortlisting support."
            ]
          },
          {
            "type": "meta",
            "items": [
              {
                "label": "Type",
                "values": [
                  "AI CV builder"
                ]
              },
              {
                "label": "My role",
                "values": [
                  "Product Design"
                ]
              },
              {
                "label": "Timeline",
                "values": [
                  "8 weeks (2025)"
                ]
              },
              {
                "label": "My contribution",
                "values": [
                  "AI CV flow"
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "s1",
        "label": "Direction",
        "title": "From client goals to design questions",
        "surface": "base",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "We prioritised features based on Joe’s list, recommending that high-value AI capabilities be embedded into the main flow to boost conversion."
            ]
          },
          {
            "type": "goal-layout",
            "goals": [
              {
                "title": "Business goal",
                "body": "Improve satisfaction during editing to increase retention and paid conversions."
              },
              {
                "title": "Design goal",
                "body": "Integrate AI assistance into the core flow while improving CV quality and user control."
              }
            ],
            "figure": {
              "src": "/case-assets/hireable/assets/usergoal.jpg",
              "alt": "Impact effort matrix used to prioritise Hireable design goals",
              "caption": "Impact Effort Matrix"
            }
          },
          {
            "type": "paragraphs",
            "items": [
              "Workshops helped define the key questions and align research with selected features. Three designers experimented based on the chosen design direction."
            ]
          },
          {
            "type": "stacked-cards-figure",
            "items": [
              {
                "title": "Editing friction",
                "body": "Where might friction occur in the CV editing flow?"
              },
              {
                "title": "AI openness",
                "body": "How open are users to AI?"
              },
              {
                "title": "Technical support",
                "body": "How can AI technically support Hireable?"
              }
            ],
            "figure": {
              "src": "/case-assets/hireable/assets/figma/extracted/discover-2x-fig-43.jpg",
              "alt": "Workshop session screenshot from the Hireable discovery board",
              "caption": "Workshop Insights: What We Needed to Figure Out"
            }
          }
        ]
      },
      {
        "id": "s3",
        "label": "Research",
        "title": "From research evidence to design priorities",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "We explored pain points and design opportunities through research with 28 users, 7 competitors, and the product owner."
            ]
          },
          {
            "type": "figure",
            "src": "/case-assets/hireable/assets/research.jpg",
            "alt": "Research evidence cards showing user surveys, competitor analysis, and stakeholder workshop findings",
            "caption": "To Get Clarity, We Did the Research",
            "frame": "raw"
          },
          {
            "type": "rich-paragraphs",
            "items": [
              {
                "parts": [
                  { "text": "Targeted research across " },
                  { "text": "users, competitors, and the product side", "strong": true },
                  { "text": " helped us identify clear opportunities." }
                ]
              }
            ]
          },
          {
            "type": "insight-cards",
            "items": [
              {
                "index": "1",
                "icon": "user",
                "bullets": [
                  {
                    "parts": [
                      { "text": "While users had some doubts about AI, " },
                      { "text": "most were willing to try it.", "highlight": true }
                    ]
                  },
                  {
                    "parts": [
                      { "text": "And the " },
                      { "text": "friction mapping", "highlight": true },
                      { "text": " showed us where support was most needed." }
                    ]
                  }
                ]
              },
              {
                "index": "2",
                "icon": "competitors",
                "bullets": [
                  {
                    "parts": [
                      { "text": "By looking at competitors, we spotted " },
                      { "text": "common features", "highlight": true },
                      { "text": " to link our flow with wider SaaS functions." }
                    ]
                  },
                  {
                    "parts": [
                      { "text": "plus, " },
                      { "text": "keeping it simple helps us stand out.", "highlight": true }
                    ]
                  }
                ]
              },
              {
                "index": "3",
                "icon": "product",
                "bullets": [
                  {
                    "parts": [
                      { "text": "This feature is a " },
                      { "text": "key monetisation driver", "highlight": true },
                      { "text": " — it supports Hireable’s shift toward smart editing, boosting conversion potential" }
                    ]
                  },
                  {
                    "parts": [
                      { "text": "And it got " },
                      { "text": "powered by GPT-4.", "highlight": true }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "s5",
        "label": "Design",
        "title": "Turning research signals into product decisions",
        "surface": "base",
        "blocks": [
          {
            "type": "design-pages",
            "items": [
              {
                "title": {
                  "parts": [
                    { "text": "Upload stage", "emphasis": true },
                    { "text": ", Users focused on file safety and format compatibility" }
                  ]
                },
                "figure": {
                  "src": "/case-assets/hireable/assets/design-pages/upload-stage.jpg",
                  "alt": "Upload stage design decisions showing file safety, format compatibility, and reassuring upload language"
                }
              },
              {
                "title": {
                  "parts": [
                    { "text": "Editing stage", "emphasis": true },
                    { "text": ", Users needed help getting started and making wording more specific" }
                  ]
                },
                "figure": {
                  "src": "/case-assets/hireable/assets/design-pages/editing-stage.jpg",
                  "alt": "Editing stage design decisions showing AI chat, embedded guidance, and writing suggestions"
                }
              },
              {
                "title": {
                  "parts": [
                    { "text": "Preview stage", "emphasis": true },
                    { "text": ", Users needed clear signals about progress and next steps" }
                  ]
                },
                "figure": {
                  "src": "/case-assets/hireable/assets/design-pages/preview-stage.jpg",
                  "alt": "Preview stage design decisions showing progress visibility, actionable CTA, and relevance score"
                }
              },
              {
                "title": {
                  "parts": [
                    { "text": "Download stage", "emphasis": true },
                    { "text": ", Users wanted proof that the CV had improved" }
                  ]
                },
                "figure": {
                  "src": "/case-assets/hireable/assets/design-pages/download-stage.jpg",
                  "alt": "Download stage design decisions showing improvement proof, score breakdown, emotional uplift, and re-engagement"
                }
              }
            ]
          },
          {
            "type": "figure",
            "src": "/case-assets/hireable/assets/design.jpg",
            "alt": "Hireable final product preview collage",
            "frame": "raw"
          }
        ]
      },
      {
        "id": "s9",
        "label": "Impact",
        "title": "The prototype supported investment storytelling",
        "surface": "subtle",
        "blocks": [
          {
            "type": "cards",
            "items": [
              {
                "title": "£120,000",
                "body": "Joe successfully secured funding and continued to attract follow-on investment."
              },
              {
                "title": "Co-created visual flows",
                "body": "Identified and highlighted market opportunities."
              },
              {
                "title": "Interactive prototypes",
                "body": "Clearly conveyed Hireable’s differentiation."
              },
              {
                "title": "Investor-ready narrative",
                "body": "Translated key product features into an investor-ready story."
              }
            ]
          }
        ]
      },
      {
        "id": "s10",
        "label": "Testing",
        "title": "Editing was the most critical friction point",
        "surface": "base",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "We conducted in-person usability tests with 7 users. Observing behaviour and feedback while users interacted with the prototype showed that most drop-offs occurred during editing."
            ]
          },
          {
            "type": "figure",
            "src": "/case-assets/hireable/assets/figma/extracted/journey-map-2x-fig-52.png",
            "alt": "Hireable usability testing journey map visual"
          }
        ]
      },
      {
        "id": "s11",
        "label": "Iteration",
        "title": "Enhance user agency in AI collaboration",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "User interviews revealed that the main pain point lies in the lack of user control during AI-assisted editing. We proposed multiple design directions and continued developing a new version. Since the feature was not yet live, only baseline wireframes were shown."
            ]
          },
          {
            "type": "figure",
            "src": "/case-assets/hireable/assets/enhance.jpg",
            "alt": "AI agent implementation options for enhancing user agency",
            "frame": "raw"
          }
        ]
      },
      {
        "id": "s12",
        "label": "Reflection",
        "title": "Design AI that feels supportive",
        "surface": "base",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "Working on Hireable taught me about designing for AI-human interaction and how delicate trust is in that relationship. We were not just designing a smart feature; we were designing something people would feel emotionally safe using.",
              "Transparency matters more than intelligence. It is not just what the AI can do, but how clearly it shows what it is doing.",
              "The goal is a co-pilot, not an autopilot. A helpful tool is not one that does everything for you, but one that helps you do it better."
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "fuze",
    "title": "FUZE Solar Configurator",
    "subtitle": "A user experience-first product rebuilt users trust in solar energy in the UK.",
    "chips": [
      "6 weeks",
      "2025",
      "Solar SaaS"
    ],
    "hero": {
      "src": "/case-assets/fuze/assets/figma/fuze-hero-01.jpeg",
      "alt": "FUZE solar configurator product interface",
      "fit": "cover",
      "objectPosition": "35% center"
    },
    "meta": [
      {
        "label": "Role",
        "values": [
          "Product Design"
        ]
      },
      {
        "label": "Team",
        "values": [
          "3 Product Designers",
          "1 Solar Installer Expert",
          "2 Developers"
        ]
      },
      {
        "label": "Users",
        "values": [
          "Homeowners in the UK"
        ]
      },
      {
        "label": "Timeline",
        "values": [
          "2025",
          "6 weeks"
        ]
      }
    ],
    "sections": [
      {
        "id": "s0",
        "label": "Overview",
        "title": "Rebuilding trust in solar adoption",
        "surface": "base",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "In collaboration with the solar product company Fuze, we designed a user-friendly configurator to address the longstanding mistrust and confusion surrounding solar energy in the UK market.",
              "In 2022, the Russia-Ukraine conflict triggered a sharp surge in energy prices across Europe. The solar SaaS company aimed to capture rising consumer interest in solar energy in the UK."
            ]
          },
          {
            "type": "evidence",
            "title": "Structured evidence",
            "items": [
              {
                "title": "Market trigger",
                "body": "Energy prices rose sharply across Europe after the Russia-Ukraine conflict."
              },
              {
                "title": "Product opportunity",
                "body": "Use a calculator-like configurator to make solar savings easier to understand."
              }
            ]
          }
        ]
      },
      {
        "id": "s1",
        "label": "Direction",
        "title": "Make savings understandable and onboarding easier",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "The strategy was to create a transparent and intuitive experience that helps users grasp how much money they can save with solar energy while reducing sales effort for the company."
            ]
          },
          {
            "type": "cards",
            "items": [
              {
                "title": "Increase user understanding",
                "body": "Help users understand solar savings without requiring technical solar knowledge."
              },
              {
                "title": "Improve onboarding",
                "body": "Turn the onboarding journey into a guided, step-by-step flow for new customers."
              }
            ]
          }
        ]
      },
      {
        "id": "s2",
        "label": "Challenge",
        "title": "Users did not just lack knowledge, they did not believe",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "A general lack of awareness around solar energy, coupled with a confusing installation process, had long hindered adoption in the UK market. Interviews with industry experts and potential users surfaced four obstacles that blocked understanding and trust."
            ]
          },
          {
            "type": "evidence",
            "title": "Structured evidence",
            "items": [
              {
                "title": "Complex installation",
                "body": "The installation process feels complex and opaque."
              },
              {
                "title": "Sales delay",
                "body": "Sales follow-up delay makes user interest fade."
              },
              {
                "title": "Credibility gap",
                "body": "Energy-saving benefits are not communicated credibly."
              }
            ]
          }
        ]
      },
      {
        "id": "s3",
        "label": "Research",
        "title": "Questions that shaped the configurator",
        "surface": "base",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "Inspired by solar calculators in the US, Fuze wanted to localise the approach for the UK market. We used the research stage to define what would make the tool credible, technically feasible, and useful for lead conversion."
            ]
          },
          {
            "type": "cards",
            "items": [
              {
                "title": "What gets users onboard?",
                "body": "What kind of experience would increase adoption among UK users?"
              },
              {
                "title": "How localisable is the tech?",
                "body": "What technologies are required, and are they compatible with UK policy and data?"
              },
              {
                "title": "How to make savings credible?",
                "body": "How can savings estimates earn user trust and drive conversion?"
              },
              {
                "title": "How to convert leads?",
                "body": "How can contact information be captured from truly interested users?"
              }
            ]
          }
        ]
      },
      {
        "id": "s4",
        "label": "Insights",
        "title": "Design responses to the main trust barriers",
        "surface": "subtle",
        "blocks": [
          {
            "type": "cards",
            "items": [
              {
                "title": "Localised tech, streamlined quotes",
                "body": "Google Maps, irradiance data, and rooftop detection can create UK-ready auto quotes."
              },
              {
                "title": "Understanding solar, bit by bit",
                "body": "A step-by-step flow with live feedback makes the quote feel more trustworthy."
              },
              {
                "title": "Strategic form placement",
                "body": "The form filters low-intent users before the full quote is revealed."
              },
              {
                "title": "Clear and believable savings",
                "body": "Visuals and real-time updates make savings easier to compare."
              }
            ]
          }
        ]
      },
      {
        "id": "s5",
        "label": "Design",
        "title": "Turning technical solar decisions into visible progress",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "The input flow was broken into clear modular steps: address, roof, energy use, and preferences. Results updated in real time as users progressed. Savings were visualised through before-after comparison, time-based savings charts, savings breakdowns, and real-time calculation."
            ]
          },
          {
            "type": "evidence",
            "title": "Flow artifact",
            "items": [
              {
                "title": "Address and roof",
                "body": "Only need to input address and select roof."
              },
              {
                "title": "Preferences",
                "body": "Select preferred option."
              },
              {
                "title": "Instant quote",
                "body": "Get an instant quote."
              },
              {
                "title": "Contact gate",
                "body": "Insert contact information before full quote."
              }
            ]
          },
          {
            "type": "figure",
            "src": "/case-assets/fuze/assets/figma/fuze2/fuze-product-01.png",
            "alt": "FUZE configurator product interface sequence"
          }
        ]
      },
      {
        "id": "s6",
        "label": "Testing",
        "title": "Unmoderated testing showed stronger conversion",
        "surface": "base",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "Within two weeks of launch, we used MS Clarity to test the behaviour of 68 users and compare the old and new flow."
            ]
          },
          {
            "type": "cards",
            "items": [
              {
                "title": "Old flow",
                "body": "High drop-off, low field engagement, and many unqualified leads."
              },
              {
                "title": "New flow",
                "body": "Users better understood value before submitting contact information."
              }
            ]
          },
        ]
      },
      {
        "id": "s7",
        "label": "Impact",
        "title": "Lead submissions rose after launch",
        "surface": "subtle",
        "blocks": [
          {
            "type": "cards",
            "items": [
              {
                "title": "+116%",
                "body": "Lead form submissions rose from 9% to 19.4% within two months of launch."
              },
              {
                "title": "+42%",
                "body": "Users were more likely to leave contact info after seeing estimated savings."
              }
            ]
          }
        ]
      },
      {
        "id": "s8",
        "label": "Iteration",
        "title": "Observed sessions revealed the next usability issues",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "From observing 256 user sessions, we found repeated drop-offs and confusion at several key steps, especially address entry, map positioning, and result display."
            ]
          },
          {
            "type": "cards",
            "items": [
              {
                "title": "Issue 01",
                "body": "Address input often breaks or fails to trigger next steps."
              },
              {
                "title": "Issue 02",
                "body": "Users get lost during map positioning and must restart from the beginning."
              },
              {
                "title": "Issue 03",
                "body": "The quote tool says “Generating Quote” but shows no price, leading to drop-off."
              }
            ]
          }
        ]
      },
      {
        "id": "s9",
        "label": "Reflection",
        "title": "Do not fix tiles, design the whole path",
        "surface": "base",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "This project was developed in London by a cross-functional team of UX designers and industry experts. It is the design I am most proud of, especially because my own family later became solar users.",
              "Behind the scenes, the biggest challenge was cross-team coordination across client stakeholders, developers, and complex data systems.",
              "With such a complex product, it was easy to fall into fixing isolated issues. The guiding reminder became: do not just piece together tiles, craft the full picture of the user journey."
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "reading-rep",
    "title": "Reading Rep Theatre Online Giving",
    "subtitle": "Improving online giving for Reading Rep Theater.",
    "chips": [
      "2 weeks",
      "Donation flow",
      "UK theatre"
    ],
    "hero": {
      "src": "/case-assets/reading-rep/assets/figma/extracted/donation-gift-module-crop.jpg",
      "alt": "Reading Rep donation page gift amount module",
      "background": "#181018"
    },
    "meta": [
      {
        "label": "Role",
        "values": [
          "Product Design"
        ]
      },
      {
        "label": "Team",
        "values": [
          "3 Product Designers",
          "2 Software Engineers"
        ]
      },
      {
        "label": "Users",
        "values": [
          "Local audiences near Reading",
          "Young creatives",
          "Donors"
        ]
      },
      {
        "label": "Timeline",
        "values": [
          "2025",
          "2 weeks"
        ]
      }
    ],
    "sections": [
      {
        "id": "s0",
        "label": "Overview",
        "title": "Rethinking online donations for a theatre under funding pressure",
        "surface": "base",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "I was responsible for optimising the donation flow to boost donations and enhance the user experience of giving.",
              "Reading Rep Theatre, like many non-profit arts organisations, needed to rethink its online donation experience after the pandemic to secure more sustainable support."
            ]
          },
          {
            "type": "evidence",
            "title": "Structured evidence",
            "items": [
              {
                "title": "Funding context",
                "body": "The theatre relied on a mix of ticket sales, grants, and individual donations."
              },
              {
                "title": "Experience problem",
                "body": "Users needed clearer and more visible donation paths."
              }
            ]
          }
        ]
      },
      {
        "id": "s1",
        "label": "Research",
        "title": "Small theatres need smarter asks",
        "surface": "subtle",
        "blocks": [
          {
            "type": "cards",
            "items": [
              {
                "title": "Funding decline since 2010",
                "body": "State of the Arts Report 2024 identified funding decline as a major challenge for UK theatre."
              },
              {
                "title": "Different levels of giving",
                "body": "Carolyn Forsyth noted that giving varies by organisation and audience motivation."
              }
            ]
          },
          {
            "type": "evidence",
            "title": "Structured evidence",
            "items": [
              {
                "title": "Government / local authority",
                "body": "One fundraising source, but outside this project scope."
              },
              {
                "title": "Trusts and foundations",
                "body": "Important to theatre funding, but not the individual donation journey."
              },
              {
                "title": "Corporate donors",
                "body": "A separate audience with different expectations."
              }
            ]
          }
        ]
      },
      {
        "id": "s2",
        "label": "Audience",
        "title": "Identify who the experience is designed for",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "The primary users were local families and older theatre-goers. Secondary users included young professionals, free-ticket participants, and business donors."
            ]
          },
          {
            "type": "cards",
            "items": [
              {
                "title": "Primary",
                "body": "Local families and older theatre-goers."
              },
              {
                "title": "Secondary",
                "body": "Young professionals, free-ticket participants, and business donors."
              },
              {
                "title": "Design implication",
                "body": "Donation asks needed to work for different levels of intent and familiarity with giving."
              }
            ]
          }
        ]
      },
      {
        "id": "s3",
        "label": "Strategy",
        "title": "Map the right ask to the right journey moment",
        "surface": "base",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "We mapped who to talk to, when to ask, and how to ask. This helped identify the most effective moments to drive donations across the theatre journey."
            ]
          },
          {
            "type": "evidence",
            "title": "Structured evidence",
            "items": [
              {
                "title": "Right channel",
                "body": "In-person, programme, email, cart, membership, social networks."
              },
              {
                "title": "Right moment",
                "body": "After a show, during checkout, or when users are already emotionally engaged."
              }
            ]
          },
          {
            "type": "figure",
            "src": "/case-assets/reading-rep/assets/figma/extracted/communication-channels-fig-28.png",
            "alt": "Communication channels matrix for Reading Rep audiences"
          }
        ]
      },
      {
        "id": "s4",
        "label": "Evaluation",
        "title": "Audit where people see, decide, and get nudged to donate",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "We evaluated the original donation flow from three angles: navigation bar, donation page, and sidebar. The audit looked for visibility gaps, friction points, and missed engagement opportunities."
            ]
          },
          {
            "type": "evidence",
            "title": "Flow artifact",
            "items": [
              {
                "title": "Navigation bar",
                "body": "Can users find Donate quickly?"
              },
              {
                "title": "Donation page",
                "body": "Can users understand options without extra effort?"
              }
            ]
          }
        ]
      },
      {
        "id": "s5",
        "label": "Competitors",
        "title": "Competitor patterns revealed missing donation opportunities",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "Competitor analysis showed concrete ways to improve donation engagement. The strongest opportunities were visibility, donation type clarity, and entry-point speed."
            ]
          },
          {
            "type": "cards",
            "items": [
              {
                "title": "Navigation bar",
                "body": "Add a visible Donate CTA across mobile and desktop."
              },
              {
                "title": "Donation page",
                "body": "Preview sub-categories without forcing a new page."
              },
              {
                "title": "Sidebar / IA",
                "body": "Expand donation types with “Other Ways to Give”."
              },
              {
                "title": "Engagement balance",
                "body": "Use emotional engagement without slowing down motivated donors."
              }
            ]
          }
        ]
      },
      {
        "id": "s6",
        "label": "Design",
        "title": "Add a visible donate path",
        "surface": "base",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "The donation CTA was added and icons were introduced to improve accessibility and visual clarity."
            ]
          },
          {
            "type": "evidence",
            "title": "Flow artifact",
            "items": [
              {
                "title": "Before",
                "body": "Donation path hidden or easy to miss."
              },
              {
                "title": "Change",
                "body": "Visible Donate CTA in navigation."
              }
            ]
          },
          {
            "type": "figure",
            "src": "/case-assets/reading-rep/assets/figma/extracted/donation-gift-module-crop.jpg",
            "alt": "Reading Rep donation page gift amount module"
          }
        ]
      },
      {
        "id": "s7",
        "label": "Donation Page",
        "title": "Balance emotional engagement and speed",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "Taking inspiration from the National Theatre, we explored a video message to build emotional resonance. But users clicking Donate may already be motivated, so slower emotional entry points risked losing fast-moving donors."
            ]
          },
          {
            "type": "cards",
            "items": [
              {
                "title": "Option 1",
                "body": "Emotion-driven messaging."
              },
              {
                "title": "Option 2",
                "body": "Visual-led engagement."
              },
              {
                "title": "Option 3",
                "body": "Streamlined entry point for motivated donors."
              }
            ]
          },
          {
            "type": "figure",
            "src": "/case-assets/reading-rep/assets/figma/extracted/donation-video-entry-fig-35.png",
            "alt": "Donation page call-to-action message concept with video entry"
          }
        ]
      },
      {
        "id": "s8",
        "label": "Donation Options",
        "title": "Make giving faster and more flexible",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "To reduce friction from the lengthy donation flow, we added quick alternative options like PayPal and Amazon Smile. “Other Ways to Give” supported autonomy across audience groups with different motivation patterns."
            ]
          },
          {
            "type": "evidence",
            "title": "Structured evidence",
            "items": [
              {
                "title": "Older theatre goers",
                "body": "May be financially comfortable and used to giving."
              },
              {
                "title": "Young arts audiences",
                "body": "May prefer lower-commitment or creative formats."
              },
              {
                "title": "Families",
                "body": "May want to contribute but have limited funds."
              }
            ]
          },
          {
            "type": "figure",
            "src": "/case-assets/reading-rep/assets/figma/extracted/donation-options-cards-crop.jpg",
            "alt": "Reading Rep other ways to give card options"
          }
        ]
      },
      {
        "id": "s9",
        "label": "Sidebar IA",
        "title": "Preview sub-categories without forcing navigation",
        "surface": "base",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "The sidebar IA explored ways to preview sub-categories without navigating away. Expanded submenu ideas helped users understand options before committing to a new page, but the IA optimisation was still in progress, so the original sidebar was kept for now."
            ]
          },
          {
            "type": "cards",
            "items": [
              {
                "title": "Dropdown-only",
                "body": "Simple, but less visible."
              },
              {
                "title": "Expanded submenu",
                "body": "Surfaces donation paths and encourages exploration."
              },
              {
                "title": "Decision",
                "body": "Keep original sidebar for now while IA optimisation continues."
              }
            ]
          }
        ]
      },
      {
        "id": "s10",
        "label": "Reflection",
        "title": "Small improvements can still matter",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "Although some design ideas, like the sidebar IA restructure, were not adopted temporarily, the process clarified how donation flows work.",
              "Once users decide to donate, the process is generally smooth. The real pain points appear before and around the process: poor structure, cluttered pages, confusing workflows, missing information, vague language, and hard-to-find donation buttons.",
              "Even minor usability enhancements can lead to a roughly 10% increase in conversion. For large organisations, this could mean over $100,000 in additional annual donations."
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "ohisama",
    "title": "Sushi restaurant Digital Menu for faster service.",
    "subtitle": "a digital ordering flow for a London sushi restaurant reducing wait-time friction without adding staff workload",
    "chips": [
      "2024",
      "Restaurant UX",
      "Digital Menu"
    ],
    "hero": {
      "src": "/case-assets/ohisama/assets/01-case-study-photo.jpg",
      "alt": "Ohisama Sushi digital menu mobile screens",
      "background": "#ffffff"
    },
    "meta": [
      {
        "label": "Role",
        "values": [
          "Product Design"
        ]
      },
      {
        "label": "Team",
        "values": [
          "1 Product Designer",
          "5 Restaurant Staff"
        ]
      },
      {
        "label": "Users",
        "values": [
          "London sushi restaurant customers",
          "Restaurant staff"
        ]
      },
      {
        "label": "Timeline",
        "values": [
          "2024"
        ]
      }
    ],
    "metaPlacement": "afterFirstFigure",
    "sections": [
      {
        "id": "observation",
        "label": "Observation",
        "title": "A product designer's observation",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "During a late-night shift working as a waitress, a frustrated customer complained about long wait time."
            ]
          },
          {
            "type": "figure",
            "src": "/case-assets/ohisama/assets/02-frame11712761642x.jpg",
            "alt": "Observation visual showing the restaurant wait-time friction",
            "caption": "That Day, Me, the Manager, and the Chef Being Scolded"
          }
        ]
      },
      {
        "id": "problems",
        "label": "Problems",
        "title": "Finding where long waits were really coming from",
        "surface": "base",
        "blocks": [
          {
            "type": "stages",
            "items": [
              {
                "index": "1",
                "eyebrow": "Review platforms",
                "title": "Step 1. Review platform rasing some concerns",
                "body": [
                  "Checking Tripadvisor and Google reviews, I found 80% of complaints mentioned slow service and long wait times. This motivated me to raise the issue with the team for collaborative solutions."
                ],
                "figureLayout": "grid",
                "figureCaption": "Customer review evidence from Tripadvisor and Google reviews.",
                "figures": [
                  {
                    "src": "/case-assets/ohisama/assets/03-frame11712761642x.jpg",
                    "alt": "Review screenshot mentioning waiting over an hour for food"
                  },
                  {
                    "src": "/case-assets/ohisama/assets/04-frame11712761672x.jpg",
                    "alt": "Review screenshot describing a long wait and missing order items"
                  },
                  {
                    "src": "/case-assets/ohisama/assets/05-frame11712761692x.jpg",
                    "alt": "Review screenshot describing slow service and poor sushi quality"
                  },
                  {
                    "src": "/case-assets/ohisama/assets/06-frame11712761702x.jpg",
                    "alt": "Review screenshot describing awful service and a one and a half hour wait"
                  }
                ]
              },
              {
                "index": "2",
                "eyebrow": "Kitchen workshop",
                "title": "Step 2. Kitchen workshops break down the problem",
                "split": {
                  "body": [
                    "Over lunch in the kitchen, the manager acknowledged review insights. Together, we brainstormed and narrowed down the issues behind long wait times to four key factors."
                  ],
                  "figure": {
                    "src": "/case-assets/ohisama/assets/08-step2-kitchen-workshop-illustration.png",
                    "alt": "Illustration of a kitchen workshop with staff discussing review insights",
                    "caption": "We Ran a Workshop Right in the Kitchen"
                  }
                },
                "figures": [
                  {
                    "src": "/case-assets/ohisama/assets/08-Flowchart_Template_1.jpg",
                    "alt": "Affinity map of long wait to order pain points",
                    "caption": "Affinity mapping categorised key issues behind long wait times."
                  }
                ],
                "callout": "Workshop Results: Compared to other high expenses solutions, improving the menu is a cost-effective choice for small-scale restaurants compared to hiring more staff or renovating."
              }
            ]
          }
        ]
      },
      {
        "id": "research",
        "label": "Research",
        "title": "Tracing menu friction across customers and competitors",
        "surface": "subtle",
        "blocks": [
          {
            "type": "stages",
            "items": [
              {
                "index": "1",
                "eyebrow": "Menu use",
                "title": "Step 1. Menu-using pain points identification",
                "body": [
                  "I observed daily to spot menu elements slowing down ordering, then researched cases where customers need assistance to order."
                ],
                "cards": [
                  {
                    "title": "Research methods I employed",
                    "body": "Guerilla Research, Customer Observation"
                  },
                  {
                    "title": "Key pain points",
                    "body": "Preserved as a source heading. The Cargo page leaves the detailed list to the supporting visual."
                  }
                ],
                "figures": [
                  {
                    "src": "/case-assets/ohisama/assets/09-frame11712761632x.jpg",
                    "alt": "Menu-using pain points visual",
                    "caption": "Key pain points"
                  }
                ]
              },
              {
                "index": "2",
                "eyebrow": "Competitor visits",
                "title": "Step 2. Personal visits to competitors inspired operational innovation",
                "body": [
                  "I visited 4 sushi, 1 Chinese, and 1 Indian restaurant in Westminster and Soho. Focusing on their menu, especially the UI features. Along the way, I unexpectedly discovered useful insights into online ordering systems. For more details please visit here."
                ],
                "figures": [
                  {
                    "src": "/case-assets/ohisama/assets/10-competitoranalysis2x.jpg",
                    "alt": "Local competitors in Westminster and Soho",
                    "caption": "I visited the local competitors in Westminster and Soho."
                  }
                ],
                "proseBlocks": [
                  {
                    "title": "Business Model and Operational Efficiency:",
                    "items": [
                      "In izakaya-style Japanese restaurants with inadequate facilities, staff are completely unable to provide the warm service - which is precisely the biggest selling point of izakaya!",
                      "Lzakaya-style sushi lacks QR code ordering despite its approachable fine dining approach.",
                      "Online ordering boosts productivity by easing multi-task server workloads."
                    ]
                  },
                  {
                    "title": "UX/UI feature takeaway:"
                  }
                ],
                "postProseFigures": [
                  {
                    "src": "/case-assets/ohisama/assets/11-frame19840771973x.jpg",
                    "alt": "UX UI feature competitor analysis",
                    "caption": "UX/UI feature competitor analysis"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "goals",
        "label": "Goals",
        "title": "Balancing business constraints with customer self-service",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "Due to budget constraints, the owner proposed prioritising a mobile-first approach with an online ordering system to ease staff fatigue, allowing them to focus on warm service. The system should support both in-house and takeaway orders.",
              "User goals and business goals"
            ]
          },
          {
            "type": "figure",
            "src": "/case-assets/ohisama/assets/12-designgoals3x.jpg",
            "alt": "User goals and business goals for the Ohisama digital menu"
          }
        ]
      },
      {
        "id": "ia",
        "label": "Information Architecture",
        "title": "Organising the menu around how people expect to order",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "To align with user expectations, I conducted a moderated card sorting session with colleagues and customers, then produced the information architecture direction."
            ]
          },
          {
            "type": "cards",
            "items": [
              {
                "title": "6",
                "body": "participants in moderated card sorting"
              },
              {
                "title": "2",
                "body": "customers included alongside colleagues"
              },
              {
                "title": "1",
                "body": "information architecture direction produced"
              }
            ]
          },
          {
            "type": "figure",
            "src": "/case-assets/ohisama/assets/13-Flowchart-Template-5.jpg",
            "alt": "Information architecture flow for the Ohisama digital menu",
            "caption": "Information Architecture"
          }
        ]
      },
      {
        "id": "design",
        "label": "Design",
        "title": "Turning menu assistance into self-service ordering",
        "surface": "base",
        "blocks": [
          {
            "type": "stages",
            "items": [
              {
                "index": "1",
                "eyebrow": "Menu Translator",
                "title": "Menu Translator",
                "feature": {
                  "media": {
                    "src": "/case-assets/ohisama/assets/14-translator.mp4",
                    "alt": "Menu translator prototype"
                  },
                  "title": "Menu Translator",
                  "body": "A translator helps bridge language barriers for diverse customers.",
                  "evidence": {
                    "src": "/case-assets/ohisama/assets/15-frame11712761613x.jpg",
                    "alt": "Customer testimonial for Menu Translator",
                    "caption": "Customer testmonial"
                  }
                }
              },
              {
                "index": "2",
                "eyebrow": "Dish details",
                "title": "Dish details",
                "feature": {
                  "media": {
                    "src": "/case-assets/ohisama/assets/16-dish-details.mp4",
                    "alt": "Dish details prototype"
                  },
                  "title": "Dish details",
                  "body": "Clear dish details let customers explore menu items independently, easing server workload and reducing order errors.",
                  "evidence": {
                    "src": "/case-assets/ohisama/assets/17-frame11712761613x.jpg",
                    "alt": "Waiting staff testimonial for Dish details",
                    "caption": "Waiting staff's testmonial"
                  }
                }
              },
              {
                "index": "3",
                "eyebrow": "Collect",
                "title": "Collect",
                "feature": {
                  "media": {
                    "src": "/case-assets/ohisama/assets/18-collect.mp4",
                    "alt": "Collect feature prototype"
                  },
                  "title": "Collect",
                  "body": "The 'Collect' feature lets guests pre-order online, improving the experience and reducing kitchen stress during busy times.",
                  "evidence": {
                    "src": "/case-assets/ohisama/assets/19-frame11712761612x.jpg",
                    "alt": "Chef testimonial for Collect",
                    "caption": "Chef's testmonial"
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "id": "testing",
        "label": "Testing",
        "title": "Testing whether the digital menu reduced staff dependency",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "I conducted tests during less busy hours and explained the testing process and offered green tea as an incentive."
            ]
          },
          {
            "type": "testing",
            "methods": [
              {
                "visual": "ab",
                "title": "A/B testing",
                "body": "I provided both a paper menu and a digital menu to new customers at the same table who were unfamiliar with our offerings, observing their experience and comparing the time taken to complete their orders."
              },
              {
                "visual": "prototype",
                "title": "Test with prototype simulated functionality",
                "body": "Customers would use the menu on their phones while I quickly documented their actions and preferences before processing their orders at the counter."
              }
            ],
            "findings": [
              {
                "visual": "qr",
                "title": "Existing QR code usage pattern",
                "body": "Approximately 4 out of 7 new customers directly scanned the standing QR code."
              },
              {
                "visual": "allergy",
                "title": "Waitstaff are still frequently asked about allergy information",
                "body": "Customers still frequently asked about allergy-related information, such as dishes that do not contain gluten."
              },
              {
                "visual": "translation",
                "title": "The translator is functional but requires better accuracy",
                "body": "Guests had no major complaints, but occasionally corrected translation errors or unnatural content after dining."
              }
            ]
          }
        ]
      },
      {
        "id": "iteration",
        "label": "Iteration",
        "title": "Adjusting the flow around how guests actually used it",
        "surface": "base",
        "blocks": [
          {
            "type": "iterations",
            "items": [
              {
                "image": {
                  "src": "/case-assets/ohisama/assets/20-2024-12-16-23.15.38.png",
                  "alt": "Optimised ordering through improved button options"
                },
                "title": "Optimising Ordering Choices",
                "body": "Most guests access the menu via QR codes, making the 'Dine In' option rarely used. With high Deliveroo demand, we replaced 'Dine In' with a Deliveroo link to align with customer behaviour."
              },
              {
                "image": {
                  "src": "/case-assets/ohisama/assets/21-2024-12-16-23.23.42.png",
                  "alt": "Repositioned to prioritise key allergen information"
                },
                "title": "Prioritising Allergen Information",
                "body": "We noticed that many guests lost focus when scrolling to the bottom, leading to low attention on allergen information. To address this, we moved this crucial detail to the top of the menu for better visibility."
              }
            ]
          }
        ]
      },
      {
        "id": "result",
        "label": "Result",
        "title": "A lighter ordering flow for guests and staff",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "After testing the digital menu with approximately 37 new customers over a month, I found that ordering duration decreased while table turnover rates increased.",
              "Additionally, staff errors were reduced, and customers reported a more satisfying experience. Finally, peak collection orders were also minimised.",
              "Staff errors were reduced, customers reported a more satisfying experience, and peak collection orders were also minimised."
            ]
          },
          {
            "type": "figure",
            "src": "/case-assets/ohisama/assets/22-chart3x.jpg",
            "alt": "Result chart showing ordering errors and Deliveroo returns evidence"
          }
        ]
      },
      {
        "id": "reflection",
        "label": "Reflection",
        "title": "What small restaurants reveal about practical product adoption",
        "surface": "base",
        "blocks": [
          {
            "type": "reflection",
            "takeaways": [
              {
                "title": "Products must align with specific use scenarios",
                "body": "Did customers feel dissatisfied because we cancelled paper menus? Many elderly customers! They're not used to using digital menus and even refused to use QR codes when I offered them. This happened particularly when we first started using PDFs. Therefore, we decided to keep both paper and digital menus."
              },
              {
                "title": "Limited funding constraints",
                "body": "This digital menu initially faced some obstacles in convincing the boss to adopt it. Many of our customers are regulars, so they already know what they want and don't need much explanation of the dishes."
              },
              {
                "title": "When user experience meets business models",
                "body": "This project has been my favourite so far, as it has given me a deep understanding of how, as a UX designer, I can incorporate business perspectives into product thinking and success metrics."
              }
            ],
            "metrics": [
              {
                "value": "14",
                "label": "Deliveroo order returns between 5-9 p.m. over one month"
              },
              {
                "value": "19",
                "label": "in-store ordering errors between 5-9 p.m. over one month"
              },
              {
                "value": "July 2024",
                "label": "Instagram influencer promotion brought a significant influx of new customers"
              }
            ],
            "figure": {
              "src": "/case-assets/ohisama/assets/23-Untitled_Artwork-12.jpg",
              "alt": "Illustration comparing paper menu friction with digital menu relief",
              "caption": "Reflection on matching the menu experience to real restaurant use scenarios."
            },
            "closing": [
              "Through this project, I also noticed the management differences between small independent restaurants and large chain restaurants.",
              "My next step is to expand this project's scope by designing an internal dashboard for owners and managers to predict customer flow better and manage inventory, thereby reducing labour costs and operational expenses."
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "tfl-go",
    "title": "The Future of TfL Go",
    "subtitle": "TfL Go is the official travel app designed to enhance the travel experience in London.",
    "chips": [],
    "hero": {
      "src": "/case-assets/tfl-go/assets/hero-tfl-go-device-emphasis.png",
      "alt": "TfL Go concept hero showing enlarged app, watch and accessibility illustration",
      "background": "#ecebe1"
    },
    "meta": [
      {
        "label": "Role",
        "values": [
          "Product Design"
        ]
      },
      {
        "label": "Team",
        "values": [
          "Me",
          "TfL lead designer"
        ]
      },
      {
        "label": "Users",
        "values": [
          "London public transport passengers"
        ]
      },
      {
        "label": "Timeline",
        "values": [
          "2024"
        ]
      }
    ],
    "sections": [
      {
        "id": "tfl-go-as-a-daily-travel-companion",
        "label": "Introduction",
        "title": "TfL Go as a daily travel companion",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "TfL Go is the official travel app designed to enhance the travel experience in London. As a passionate London transport enthusiast who uses the app daily, I've observed numerous friction points that commuters face while navigating London where TfL Go could improve. Based on these observations, I've designed innovative, accessible features to make journeys easier for everyone."
            ]
          },
          {
            "type": "meta",
            "items": [
              {
                "label": "Type",
                "values": [
                  "UX/UI design- app design"
                ]
              },
              {
                "label": "My role",
                "values": [
                  "Product Design"
                ]
              },
              {
                "label": "Timeline",
                "values": [
                  "2024 concept project"
                ]
              },
              {
                "label": "My contribution",
                "values": [
                  "Prototype",
                  "User research",
                  "UX design",
                  "UI design"
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "question",
        "label": "Observation",
        "title": "A question sparks from daily observations",
        "surface": "base",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "Have you experienced this? Navigating in London can be stressful when unfamiliar with your travel routes. That’s where my curiosity started from. And How might we help to make navigation easier and reduce friction for all of our users ?"
            ]
          }
        ]
      },
      {
        "id": "discovery",
        "label": "Discovery",
        "title": "Research shaped the feature priorities",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "I conducted effective research on this topic based on my experience as a frequent TfL customer and years of observing passenger behaviour. I focused on two methods: analysing app platform reviews and creating user journey mapping ."
            ]
          },
          {
            "type": "method",
            "label": "App Platform",
            "title": "Review Analysis",
            "tone": "blue",
            "body": [
              "200 TfL Go reviews from June 2024 to the present have shaped user profiles , and their needs informed an inclusive design strategy."
            ]
          },
          {
            "type": "figure",
            "src": "/case-assets/tfl-go/assets/T2119277037171526292525509984542-frame11712762233x.jpg",
            "alt": "TfL Go review analysis board"
          },
          {
            "type": "method",
            "label": "Userjourney",
            "title": "mapping",
            "tone": "black",
            "body": [
              "I chose to take the perspective of a tourist experiencing poor signal in the underground where they will face most challenges.",
              "Based on the user pain points and potential solutions mapping , I prioritised designing the features most frequently requested in the review analysis."
            ]
          },
          {
            "type": "figure",
            "src": "/case-assets/tfl-go/assets/J2144542254005765972688055255326-phone.jpg",
            "alt": "User journey mapping for tourist with poor underground signal"
          }
        ]
      },
      {
        "id": "design",
        "label": "Design",
        "title": "Feature concepts translated into TfL Go interactions",
        "surface": "base",
        "blocks": [
          {
            "type": "gallery",
            "layout": "paired",
            "figures": [
              {
                "type": "figure",
                "src": "/case-assets/tfl-go/assets/K2119405583713432307157556216094-share.mp4",
                "alt": "Share and save planned trip prototype"
              },
              {
                "type": "figure",
                "src": "/case-assets/tfl-go/assets/share-save-explanation-crop.png",
                "alt": "Share and save planned trip explanation"
              },
              {
                "type": "figure",
                "src": "/case-assets/tfl-go/assets/K2119402505154760589844196573470-language.mp4",
                "alt": "Language support prototype"
              },
              {
                "type": "figure",
                "src": "/case-assets/tfl-go/assets/language-explanation-crop.png",
                "alt": "Multi-language support explanation"
              },
              {
                "type": "figure",
                "src": "/case-assets/tfl-go/assets/V2119402334208783258777781747998-step-bystep.mp4",
                "alt": "Step by step guidance prototype"
              },
              {
                "type": "figure",
                "src": "/case-assets/tfl-go/assets/step-by-step-explanation-crop.png",
                "alt": "Step-by-step guidance explanation"
              },
              {
                "type": "figure",
                "src": "/case-assets/tfl-go/assets/A2119403032473386680905439068446-offline.mp4",
                "alt": "Offline mode prototype"
              },
              {
                "type": "figure",
                "src": "/case-assets/tfl-go/assets/offline-explanation-crop.png",
                "alt": "Offline mode explanation"
              },
              {
                "type": "figure",
                "src": "/case-assets/tfl-go/assets/C2119374877004992793206002499870-2024-12-17-18.08.21.png",
                "alt": "Accessing TfL Go from anywhere final artifact"
              }
            ]
          }
        ]
      },
      {
        "id": "reflection",
        "label": "Reflection",
        "title": "What the concept still needs before validation",
        "surface": "subtle",
        "blocks": [
          {
            "type": "paragraphs",
            "items": [
              "I believe thorough research ensures that my design addresses real user needs, and my design philosophy is always focusing on getting the basic things right first.",
              "Even if it's just a small touch, it’s essential to ensure seamless integration with the existing product.",
              "Oh i wish! If there were a PM, feature prioritisation would be much simpler!",
              "A comprehensive testing section would be ideal, the success of these features can be measured through key metrics: task completion rates, reduction in navigation errors, improved user satisfaction scores, and increased usage frequency."
            ]
          }
        ]
      }
    ]
  }
] satisfies PortfolioCase[];
