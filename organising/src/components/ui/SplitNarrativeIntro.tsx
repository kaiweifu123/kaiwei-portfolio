/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Callout from './Callout';

interface SplitNarrativeIntroProps {
  eyebrow: string;
  signal?: string;
  title: string;
  quote?: string;
  children: React.ReactNode;
  className?: string;
}

export default function SplitNarrativeIntro({
  eyebrow,
  signal,
  title,
  quote,
  children,
  className,
}: SplitNarrativeIntroProps) {
  return (
    <section className={`case-split-narrative ${className ?? ''}`}>
      <div className="case-split-narrative-aside">
        <strong>{eyebrow}</strong>
        {signal}
      </div>
      <div className="case-split-narrative-body">
        <h3 className="case-split-narrative-title">{title}</h3>
        {quote && (
          <Callout variant="quote">
            <p className="case-body-copy italic">"{quote}"</p>
          </Callout>
        )}
        <div className="case-body-copy">
          {children}
        </div>
      </div>
    </section>
  );
}
