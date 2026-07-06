/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import PortfolioNav from './PortfolioNav';
import InfoOverlay from './InfoOverlay';

interface EditorialHeaderProps {
  brandLabel: string;
  brandHref: string;
  leftLabel: string;
  rightLabel: string;
  actionLabel: string;
  actionHref: string;
}

export default function EditorialHeader({
  brandLabel: _brandLabel,
  brandHref: _brandHref,
  leftLabel: _leftLabel,
  rightLabel: _rightLabel,
  actionLabel: _actionLabel,
  actionHref: _actionHref,
}: EditorialHeaderProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <>
      <PortfolioNav
        className="editorial-header"
        homeHref="/"
        workHref="/#work"
        illustrationHref="/illustration"
        onAboutClick={() => setIsInfoOpen(true)}
      />
      {isInfoOpen ? <InfoOverlay onClose={() => setIsInfoOpen(false)} /> : null}
    </>
  );
}
