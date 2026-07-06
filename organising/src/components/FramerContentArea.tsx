/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Award, MapPin, Compass } from 'lucide-react';

/**
 * -------------------------------------------------------------
 * TYPES & INTERFACES
 * -------------------------------------------------------------
 * Defined to match Framer's Property Controls schema.
 */
interface FramerContentItem {
  id: string;
  title: string;
  category: string;
  sysId: string;
  bannerImage: string;
  dropCap: string;
  dropCapText: string;
  quote?: string;
  paragraphs: string[];
  leadFaculty?: string[];
  requirement?: string[];
  location?: string;
}

interface FramerContentAreaProps {
  item?: FramerContentItem;
  accentColor?: string;
  textColor?: string;
  bgColor?: string;
  dividerColor?: string;
  isFirstSection?: boolean;
}

/**
 * Beautiful default mock data for design previewing inside Framer canvas.
 */
const DEFAULT_ITEM: FramerContentItem = {
  id: "PH-01",
  title: "起点：我们没有明确的问题，只有一个赌注",
  category: "STRATEGY :: CH-01",
  sysId: "SYS_ID: LP-PH-01.GENESIS",
  bannerImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200",
  dropCap: "到",
  dropCapText: " 2025 年，我们开始认真看待一个更大的战略命题：在不断涌现且竞争趋近白热化的医疗 AI 赛道上，AI 到底能不能帮 OpenLoop 创造开创性的商业价值与新模式的盈利增长？",
  quote: "AI 能不能把我们现有的合规、运营等临床服务与基础设施，变成一种别人极难复制的底层竞争优势？",
  paragraphs: [
    "起初，医疗 AI 市场上的机会看上去多如星海——从高频被讨论的 AIs Scribe 到诊后随访助理，再到合规文档自动化和智能化大数据分析。这些都是好故事，但在这些细分领域，每一个背后都已经站满了拥有成熟商业壁垒的单点 AI 玩家。",
    "如果我们仅仅重复建设一个单点 AI 工具，它最终只会沦为庞大市场里的一个备用功能（Feature），而非 OpenLoop 的战略利器。因此，团队回撤了一大步：我们要做的不是拼凑又一个 AI 玩具，而是寻找能与我们现有的“临床、药房、合规三合一”实体履约闭环进行深层咬合的战略放大器。"
  ],
  leadFaculty: ["战略规划部 (Strategy Team)", "商业情报组 (Market Intel)"],
  requirement: ["战略目标: 核心资产 AI 变现", "市场重构: 摆脱同质化点工具竞争"],
  location: "OpenLoop 战略决策会议室"
};

/**
 * FramerContentArea Component
 * An eye-safe, typographically elegant editor-view detail display.
 * Engineered with Framer Motion layout state and custom cascading entrances.
 */
export default function FramerContentArea({
  item = DEFAULT_ITEM,
  accentColor = "#34d399", // Emerald-400 accent color
  textColor = "#171717",   // Slate-900 / Brutal Dark text color
  bgColor = "#ffffff",     // Pure base card white background
  dividerColor = "#f3f4f6", // Neutral light divider lines
  isFirstSection = true,    // Toggles between first-page hero image vs typographic header
}: FramerContentAreaProps) {
  
  // Motion Presets for polished entrance choreographies
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 380, damping: 28 } 
    }
  };

  const facultyList = item.leadFaculty || [];
  const reqList = item.requirement || [];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: bgColor,
        color: textColor,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        fontFamily: "var(--font-ui-family)",
        userSelect: "none"
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          {/* Header Area Switch: Banner Hero or Elegant Typography Partition */}
          {isFirstSection ? (
            <div style={{ position: "relative", width: "100%", height: "350px", overflow: "hidden", backgroundColor: "#0a0a0a" }}>
              {/* Scale-up parallax interactive image */}
              <motion.img
                initial={{ scale: 1.06, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.45 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                src={item.bannerImage}
                alt={item.title}
                referrerPolicy="no-referrer"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "grayscale(100%)",
                }}
              />
              {/* Text gradient protection overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.3) 60%, transparent 100%)",
                  zIndex: 1
                }}
              />
              
              {/* Typography inside the Banner */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "40px 48px",
                  maxWidth: "960px",
                  margin: "0 auto",
                  zIndex: 2,
                  color: "#ffffff"
                }}
              >
                <motion.span
                  variants={itemVariants}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "var(--font-ui-family)",
                    fontSize: "11px",
                    letterSpacing: "0.25em",
                    textTransform: "none",
                    color: "#d4d4d4",
                    marginBottom: "12px"
                  }}
                >
                  <Compass style={{ width: "14px", height: "14px", color: accentColor }} />
                  {item.category}
                </motion.span>
                <motion.h2
                  variants={itemVariants}
                  style={{
                    margin: 0,
                    padding: 0,
                    fontFamily: "var(--font-ui-family)",
                    fontSize: "36px",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    lineHeight: "1.15",
                    maxWidth: "700px"
                  }}
                >
                  {item.title}
                </motion.h2>
                <motion.div
                  variants={itemVariants}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginTop: "16px",
                    fontFamily: "var(--font-ui-family)",
                    fontSize: "11px",
                    color: "#a3a3a3"
                  }}
                >
                  <span>{item.sysId}</span>
                  <span style={{ color: "#525252" }}>// FIRST COMPOSITION</span>
                </motion.div>
              </div>
            </div>
          ) : (
            /* Pure Typography header for secondary / subsequent pages */
            <div
              style={{
                width: "100%",
                maxWidth: "960px",
                margin: "0 auto",
                padding: "64px 48px 24px 48px",
                borderBottom: `1px solid ${dividerColor}`
              }}
            >
              <motion.span
                variants={itemVariants}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-ui-family)",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "none",
                  color: "#737373",
                  marginBottom: "12px"
                }}
              >
                <Compass style={{ width: "14px", height: "14px", color: accentColor }} />
                {item.category}
              </motion.span>
              <motion.h2
                variants={itemVariants}
                style={{
                  margin: 0,
                  padding: 0,
                  fontFamily: "var(--font-ui-family)",
                  fontSize: "32px",
                  fontWeight: 600,
                  letterSpacing: "-0.015em",
                  lineHeight: "1.2",
                  color: textColor
                }}
              >
                {item.title}
              </motion.h2>
              <motion.div
                variants={itemVariants}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: "16px",
                  fontFamily: "var(--font-ui-family)",
                  fontSize: "11px",
                  color: "#737373"
                }}
              >
                <span>{item.sysId}</span>
                <span style={{ color: "#d4d4d4" }}>// TYPOGRAPHIC DIVISION</span>
              </motion.div>
            </div>
          )}

          {/* Main Column Grid Space */}
          <div
            style={{
              width: "100%",
              maxWidth: "960px",
              margin: "0 auto",
              padding: "48px 48px 64px 48px",
              display: "grid",
              gridTemplateColumns: isFirstSection ? "1fr" : "1fr",
              gap: "48px"
            }}
          >
            {/* Dynamic grid template that perfectly mimics clean dual-column layouts on desktop */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isFirstSection ? "repeat(auto-fit, minmax(300px, 1fr))" : "1fr",
                gap: "48px"
              }}
            >
              {/* Left Column: Syllabus Body Texts */}
              <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                {/* Intro paragraph with stylish initial drop cap */}
                <motion.div variants={itemVariants} style={{ position: "relative" }}>
                  <span
                    style={{
                      float: "left",
                      fontFamily: "var(--font-quote-family)",
                      fontSize: "64px",
                      fontWeight: 500,
                      lineHeight: "0.85",
                      paddingRight: "10px",
                      paddingTop: "4px",
                      color: textColor
                    }}
                  >
                    {item.dropCap}
                  </span>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-quote-family)",
                      fontSize: "17px",
                      lineHeight: "1.65",
                      color: textColor
                    }}
                  >
                    {item.dropCapText}
                  </p>
                </motion.div>

                {/* Grid Section Divider */}
                <motion.div
                  style={{
                    position: "relative",
                    height: "1px",
                    backgroundColor: dividerColor,
                    margin: "12px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      background: bgColor,
                      padding: "0 16px",
                      fontFamily: "var(--font-ui-family)",
                      fontSize: "9px",
                      color: "#a3a3a3",
                      letterSpacing: "0.15em"
                    }}
                  >
                    // CONTINUOUS COMPOSITIONS //
                  </span>
                </motion.div>

                {/* Sub-paragraphs mapping */}
                {item.paragraphs.map((p, idx) => (
                  <motion.p
                    key={idx}
                    variants={itemVariants}
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-quote-family)",
                      fontSize: "16px",
                      lineHeight: "1.65",
                      color: "#404040"
                    }}
                  >
                    {p}
                  </motion.p>
                ))}

                {/* Quote block inside columns */}
                {item.quote && (
                  <motion.div
                    variants={itemVariants}
                    style={{
                      padding: "16px 20px",
                      borderLeft: `2px solid ${textColor}`,
                      backgroundColor: "rgba(0, 0, 0, 0.02)",
                      fontStyle: "italic",
                      fontFamily: "var(--font-quote-family)",
                      fontSize: "18px",
                      lineHeight: "1.5",
                      color: "#404040",
                      margin: "12px 0"
                    }}
                  >
                    "{item.quote}"
                  </motion.div>
                )}
              </div>

              {/* Right Column: Metas, Lead Faculty, Requirements, Location */}
              {isFirstSection && (
                <motion.div
                  variants={itemVariants}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "28px",
                    borderLeft: `1px solid ${dividerColor}`,
                    paddingLeft: "32px"
                  }}
                >
                  {/* Lead Faculty List */}
                  {facultyList.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-ui-family)",
                          fontSize: "10px",
                          letterSpacing: "0.15em",
                          color: "#737373",
                          textTransform: "none"
                        }}
                      >
                        LEAD FACULTY
                      </span>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {facultyList.map((faculty, idx) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <User style={{ width: "14px", height: "14px", color: "#a3a3a3" }} />
                            <span style={{ fontFamily: "var(--font-quote-family)", fontSize: "15px", color: textColor }}>
                              {faculty}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Requirements List */}
                  {reqList.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-ui-family)",
                          fontSize: "10px",
                          letterSpacing: "0.15em",
                          color: "#737373",
                          textTransform: "none"
                        }}
                      >
                        REQUIREMENT
                      </span>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {reqList.map((req, idx) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <Award style={{ width: "14px", height: "14px", color: "#a3a3a3" }} />
                            <span style={{ fontFamily: "var(--font-quote-family)", fontSize: "15px", color: textColor }}>
                              {req}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Location Area */}
                  {item.location && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-ui-family)",
                          fontSize: "10px",
                          letterSpacing: "0.15em",
                          color: "#737373",
                          textTransform: "none"
                        }}
                      >
                        LOCATION
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <MapPin style={{ width: "14px", height: "14px", color: "#a3a3a3" }} />
                        <span style={{ fontFamily: "var(--font-quote-family)", fontSize: "15px", color: textColor }}>
                          {item.location}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Dynamic Signature Brand */}
                  <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: `1px dashed ${dividerColor}` }}>
                    <span style={{ fontFamily: "var(--font-ui-family)", fontSize: "9px", color: "#a3a3a3", display: "block" }}>
                      ACS REGISTRY SYSTEM // CLOUD VERIFIED
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
