/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Check, Copy, Download, Linkedin, X } from 'lucide-react';

function ExperienceSection() {
  return (
    <section className="info-cv-section" aria-label="Experience summary">
      <div className="info-cv-heading-row">
        <h3>Experience</h3>
        <a className="info-cv-download" href="/cv/kaiwei-fu-cv.pdf" download>
          <span>Download CV</span>
          <Download aria-hidden="true" size={14} strokeWidth={2.1} />
        </a>
      </div>
      <div className="info-cv-list">
        <article>
          <div className="info-cv-role-row">
            <h4>OpenLoop - Product Designer</h4>
            <span>San Jose</span>
          </div>
          <p>Led AI-first product design for telehealth platforms in a highly regulated healthcare environment.</p>
        </article>
        <article>
          <div className="info-cv-role-row">
            <h4>Caboodle - Product Designer</h4>
            <span>London</span>
          </div>
          <p>Building AI-powered products across startups, enterprise healthcare, and B2B SaaS.</p>
        </article>
        <article>
          <div className="info-cv-role-row">
            <h4>London Transport Museum - UX Designer</h4>
            <span>London</span>
          </div>
          <p>Contributed research for youth programmes, employability strategy, and live UX evaluation.</p>
        </article>
        <article>
          <div className="info-cv-role-row">
            <h4>FoodCLUB / Freelance - UX/UI Designer</h4>
            <span>London / remote</span>
          </div>
          <p>Worked across mobile, charity, restaurant, hospitality SaaS, illustration, and brand projects.</p>
        </article>
      </div>
    </section>
  );
}

export default function InfoOverlay({ onClose }: { onClose: () => void }) {
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false);
  const emailAddress = 'kaiweifu2022@gmail.com';
  const linkedInUrl = 'https://www.linkedin.com/in/kaiwei-fu-b10474239';

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!hasCopiedEmail) {
      return;
    }

    const timeoutId = window.setTimeout(() => setHasCopiedEmail(false), 1600);

    return () => window.clearTimeout(timeoutId);
  }, [hasCopiedEmail]);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(emailAddress);
    setHasCopiedEmail(true);
  };

  return (
    <div className="info-overlay" role="dialog" aria-modal="true" aria-label="Portfolio information">
      <button className="info-overlay-clickout" type="button" aria-label="Close information" onClick={onClose} />
      <section className="info-panel">
        <img
          className="info-panel-illustration"
          src="/about/about-illustration.svg"
          alt=""
          aria-hidden="true"
        />
        <header className="info-panel-header">
          <h2>Kaiwei Fu</h2>
          <button className="info-panel-close" type="button" aria-label="Close information" onClick={onClose}>
            <X aria-hidden="true" size={18} strokeWidth={2.4} />
          </button>
        </header>
        <div className="info-panel-body">
          <p>I've always been drawn to unfamiliar places.</p>
          <p>
            From <span className="info-panel-highlight">China</span> to <span className="info-panel-highlight">London</span>, across{' '}
            <span className="info-panel-highlight">Europe</span> and now collaborating with teams in{' '}
            <span className="info-panel-highlight">Silicon Valley</span>, every move has pushed me beyond my comfort
            zone. Those experiences taught me to approach problems with{' '}
            <span className="info-panel-highlight">curiosity</span>, <span className="info-panel-highlight">empathy</span>, and an{' '}
            <span className="info-panel-highlight">open mind</span>.
          </p>
          <p>
            Over the past six years, I've evolved from an illustrator into a Product Designer, combining creativity
            with systems thinking. Today, I specialise in simplifying complex, regulated experiences with AI,
            transforming fragmented workflows into intuitive products that improve efficiency, trust, and conversion.
          </p>
        </div>
        <section className="info-panel-contact" aria-label="Contact">
          <h3>Contact</h3>
          <div className="info-contact-actions">
            <div className="info-email-row">
              <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
              <button
                className="info-copy-button"
                data-sound="copy"
                type="button"
                onClick={handleCopyEmail}
                aria-label={hasCopiedEmail ? 'Email copied' : 'Copy email address'}
              >
                {hasCopiedEmail ? <Check aria-hidden="true" size={15} strokeWidth={2.2} /> : <Copy aria-hidden="true" size={15} strokeWidth={2.2} />}
              </button>
            </div>
            <a className="info-contact-link" href={linkedInUrl} target="_blank" rel="noreferrer">
              <Linkedin aria-hidden="true" size={15} strokeWidth={2.1} />
              <span>LinkedIn</span>
            </a>
          </div>
        </section>
        <ExperienceSection />
      </section>
    </div>
  );
}
