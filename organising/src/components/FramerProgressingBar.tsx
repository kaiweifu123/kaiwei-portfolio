/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * -------------------------------------------------------------
 * TYPES & INTERFACES
 * -------------------------------------------------------------
 * Defined to match the architecture of the ACS Archive
 * and Framer Canvas Component inputs.
 */
interface SectionProgressItem {
  id: string;
  title: string;
  category?: string;
  progress: number; // 0 to 100
  isEnrolled?: boolean;
}

interface FramerProgressingBarProps {
  items?: SectionProgressItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  accentColor?: string;
  activeBgColor?: string;
  inactiveBgColor?: string;
  textColor?: string;
  activeTextColor?: string;
}

/**
 * Default mock data for Framer Canvas previews
 */
const DEFAULT_ITEMS: SectionProgressItem[] = [
  { id: "PH-01", title: "Can AI Create New Revenue?", category: "STRATEGY", progress: 100, isEnrolled: true },
  { id: "PH-02", title: "机会：最好的机会，其实一直在公司内部", category: "INSIGHT", progress: 85, isEnrolled: true },
  { id: "PH-03", title: "Demo：在得到所有答案之前，先证明它能成", category: "PROTOTYPE", progress: 50, isEnrolled: false },
  { id: "PH-04", title: "转变：原型只负责激发兴趣，服务必须硬核履约", category: "TRANSITION", progress: 0, isEnrolled: false },
  { id: "PH-05", title: "用户反馈：用户不是被代码挡住了，是被决策压垮了", category: "FEEDBACK", progress: 0, isEnrolled: false },
  { id: "RESULT", title: "From demo concept to live launch system", category: "RESULT", progress: 0, isEnrolled: false },
];

/**
 * FramerProgressingBar
 * A highly polished, interactive progress-tracking side navigation stepper.
 * Fully compatible with Framer custom code components & web integrations.
 */
export default function FramerProgressingBar({
  items = DEFAULT_ITEMS,
  selectedId: controlledSelectedId,
  onSelect,
  accentColor = "var(--color-primary)",
  activeBgColor = "var(--surface-section)",
  inactiveBgColor = "var(--surface-section)",
  textColor = "var(--text-sidebar-primary)",
  activeTextColor = "var(--text-sidebar-primary)",
}: FramerProgressingBarProps) {
  // Support both controlled and uncontrolled active selection state
  const [localSelectedId, setLocalSelectedId] = useState<string>("PH-01");
  const activeId = controlledSelectedId !== undefined ? controlledSelectedId : localSelectedId;

  const handleItemSelect = (id: string) => {
    if (controlledSelectedId === undefined) {
      setLocalSelectedId(id);
    }
    if (onSelect) {
      onSelect(id);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "340px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid var(--border-sidebar-color)",
        background: inactiveBgColor,
        fontFamily: "var(--font-ui-family)",
        userSelect: "none",
      }}
    >
      {/* Scrollable Container */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {items.map((item) => {
          const isSelected = item.id === activeId;

          return (
            <motion.button
              key={item.id}
              onClick={() => handleItemSelect(item.id)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.995 }}
              style={{
                position: "relative",
                width: "100%",
                textAlign: "left",
                padding: "20px 24px",
                borderBottom: "1px solid var(--border-sidebar-color)",
                background: isSelected ? activeBgColor : "transparent",
                color: isSelected ? activeTextColor : textColor,
                cursor: "pointer",
                border: "none",
                outline: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
            >
              {/* Background Highlight transition using LayoutId (Framer motion standard) */}
              {isSelected && (
                <motion.div
                  layoutId="activeIndicatorBg"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: activeBgColor,
                    zIndex: 0,
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}

              {/* Vertical Progress Bar indicator on the left side */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  background: "rgba(100, 100, 100, 0.12)",
                  overflow: "hidden",
                  zIndex: 2,
                }}
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${item.progress}%` }}
                  style={{
                    width: "100%",
                    background: isSelected ? accentColor : "var(--border-sidebar-color)",
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>

              {/* Real-time floating percentage label on hover */}
              <motion.div
                className="framer-progress-percent"
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 0.8, x: 0 }}
                style={{
                  position: "absolute",
                  right: "16px",
                  bottom: "16px",
                  fontSize: "9px",
                  fontFamily: "var(--font-ui-family)",
                  color: "var(--text-tertiary-neutral)",
                  zIndex: 2,
                }}
              >
                {Math.round(item.progress)}%
              </motion.div>

              {/* Core Text Contents wrapped to guarantee z-indexing above layout indicator */}
              <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
                {/* Meta details header line */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: "var(--space-progress-title-gap)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-ui-family)",
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      textTransform: "none",
                      opacity: isSelected ? 0.7 : 0.5,
                      color: isSelected ? "var(--color-primary)" : "var(--text-sidebar-secondary)",
                    }}
                  >
                    {item.id}
                  </span>

                  {/* Optional enrolled tag */}
                  {item.isEnrolled && (
                    <AnimatePresence>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                          fontSize: "8px",
                          fontFamily: "var(--font-ui-family)",
                          padding: "2px 6px",
                          borderRadius: "2px",
                          background: "var(--surface-section)",
                          color: "var(--text-sidebar-primary)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        ENROLLED
                      </motion.span>
                    </AnimatePresence>
                  )}
                </div>

                {/* Section title */}
                <h3
                  style={{
                    margin: 0,
                    padding: 0,
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "var(--line-height-progress-title)",
                    letterSpacing: "-0.01em",
                    paddingRight: "24px",
                    color: isSelected ? activeTextColor : textColor,
                  }}
                >
                  {item.title}
                </h3>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
