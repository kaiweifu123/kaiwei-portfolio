/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Code2, Laptop, UsersRound } from 'lucide-react';
import Card from './Card';

export interface InsightCardsItem {
  index: string;
  icon: 'user' | 'competitors' | 'product';
  bullets: {
    parts: {
      text: string;
      highlight?: boolean;
    }[];
  }[];
}

const iconMap = {
  user: Laptop,
  competitors: UsersRound,
  product: Code2,
};

export default function InsightCards({ items }: { items: InsightCardsItem[] }) {
  return (
    <div className="grid gap-[var(--space-section-body-element)] md:grid-cols-3">
      {items.map((item) => {
        const Icon = iconMap[item.icon];

        return (
          <Card key={item.index} className="flex min-h-[220px] flex-col p-[var(--space-card-lg)]">
            <div className="flex items-start justify-between gap-[var(--space-component)]">
              <span className="case-metric text-[length:var(--font-heading-md)] leading-[var(--line-height-title)] text-[var(--text-primary)]">
                {item.index}
              </span>
              <Icon
                aria-hidden="true"
                className="h-[44px] w-[44px] stroke-[1.8] text-[var(--text-primary)]"
              />
            </div>

            <ul className="mt-[var(--space-section-body-element)] grid gap-[var(--space-section-body-element)] pl-[var(--space-md)]">
              {item.bullets.map((bullet, bulletIndex) => (
                <li key={`${item.index}-${bulletIndex}`} className="case-card-body list-disc text-[length:var(--font-body-sm)]">
                  {bullet.parts.map((part, partIndex) => (
                    <span
                      key={`${part.text}-${partIndex}`}
                      className={part.highlight ? 'text-[var(--color-primary)]' : undefined}
                    >
                      {part.text}
                    </span>
                  ))}
                </li>
              ))}
            </ul>
          </Card>
        );
      })}
    </div>
  );
}
