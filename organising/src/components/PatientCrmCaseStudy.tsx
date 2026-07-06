/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import EditorialHeader from './ui/EditorialHeader';
import CaseStudyTopNav from './ui/CaseStudyTopNav';
import CaseHero from './ui/CaseHero';
import ProjectPager from './ui/ProjectPager';
import SectionShell from './ui/SectionShell';
import FigureFrame from './ui/FigureFrame';
import Lightbox from './ui/Lightbox';
import Callout from './ui/Callout';
import MetaGrid from './ui/MetaGrid';
import { caseStudyPagerItems, getAdjacentPagerItems } from '../projectPagerItems';
import {
  CaseStudyCardGrid,
  ConceptDirectionToggle,
  ContextMediaExtension,
  DesignProcessTabs,
  PainPointDecisionMatrix,
  ReviewerQuoteCard,
  ResearchMethodCards,
  ResearchSummaryPanel,
  SuccessCriteriaPanel,
  VideoShowcase,
  type CaseStudyCardItem,
  type CaseStudyMetric,
  type CaseStudyPainPoint,
  type CaseStudyReviewQuote,
} from './ui/CaseStudyDisplay';
import clientManagementImg from '../assets/images/launch-ops/client-management.jpg';
import clientJourneyImg from '../assets/images/launch-ops/client/01-client-journey.jpg';
import crmContextAgentImg from '../assets/images/patient-crm/framer/crm-context-agent.jpg';
import crmContextDetailImg from '../assets/images/patient-crm/framer/crm-context-detail.jpg';
import crmFragmentationImg from '../assets/images/patient-crm/framer/crm-fragmentation.png';
import managerWorkflowImg from '../assets/images/patient-crm/framer/manager-workflow.png';
import managerInformationArchitectureImg from '../assets/images/patient-crm/framer/manager-information-architecture.svg';
import managerWorkflowStructureImg from '../assets/images/patient-crm/framer/manager-workflow-structure.svg';
import allocationParadoxImg from '../assets/images/patient-crm/framer/allocation-paradox.png';
import aiCrmPrototypeVideo from '../assets/videos/patient-crm/ai-crm-prototype.mov';
import heroCrmCardVideo from '../assets/videos/patient-crm/crm-card-v4.mp4';
import finalDesignVideo from '../assets/videos/patient-crm/crm-agent-final-design-cropped.mp4';
import dashboardConceptOneVideo from '../assets/videos/patient-crm/crm-dashboard-ai-generated-1.mp4';
import dashboardConceptTwoVideo from '../assets/videos/patient-crm/crm-dashboard-ai-generated-2.mp4';
import managerViewVideo from '../assets/videos/patient-crm/crm-manager-view.mp4';

const projectMetaItems = [
  { label: 'Role', values: ['Product Design', 'AI Experience Design'] },
  { label: 'Team', values: ['4 developers', '1 PM'] },
  { label: 'Users', values: ['Patient support agents', 'Patient support managers'] },
  { label: 'Timeline', values: ['Feb 2026 - Present', 'Ongoing'] },
];

interface PatientCrmSection {
  id: string;
  category: string;
  title: string;
  body: string[];
  quote?: string;
  metrics?: { label: string; values: string[] }[];
  methods?: CaseStudyCardItem[];
  insights?: string[];
  principles?: CaseStudyCardItem[];
  directions?: CaseStudyCardItem[];
  painPoints?: CaseStudyPainPoint[];
  successCriteria?: CaseStudyMetric[];
  successCriteriaLabel?: string;
  managerNeeds?: CaseStudyCardItem[];
  practicalIdeas?: CaseStudyCardItem[];
  reviewerQuote?: CaseStudyReviewQuote;
  finalVideo?: string;
  testingConclusion?: string;
  conclusion?: string;
  secondaryImages?: {
    src: string;
    alt: string;
  }[];
  image?: string;
  imageAlt?: string;
}

const sections: PatientCrmSection[] = [
  {
    id: 'crm-context',
    category: 'Context',
    title: 'What is CRM and why it is needed',
    body: [
      'Imagine you ordered a weight loss medication online. After checkout, at some point you might want to call to ask where your medication is. When this happens, you call a support agent.',
      'To answer your questions, the agent needs to quickly understand your situation.',
      'That is where the CRM comes in, a central encyclopedia for the patient journey.',
      'However, before I joined the team, OpenLoop did not have a mature unified system in place.',
    ],
    image: clientManagementImg,
    imageAlt: 'Patient CRM interface overview',
    secondaryImages: [
      {
        src: crmContextAgentImg,
        alt: 'Support agent context from the original Framer case study',
      },
      {
        src: crmContextDetailImg,
        alt: 'CRM detail view from the original Framer case study',
      },
    ],
  },
  {
    id: 'crm-problem',
    category: 'Problem Framing',
    title: 'From fragmentation to information overload',
    body: [
      'Agents still had to jump between multiple disconnected systems to piece together patient information. As OpenLoop scaled, this workflow became increasingly difficult to sustain.',
      'To support growth, OpenLoop quickly brought patient information into one place. While this reduced fragmentation, it also created a new challenge: information was now centralized, but difficult to navigate.',
      'Finding information was no longer a system problem, but a discoverability problem.',
    ],
    quote: 'How might we help agents quickly find the right information when they needed it?',
    insights: [
      'Centralizing information solved the tool-switching problem, but did not solve findability.',
      'The CRM needed to reveal patient context, not just store patient data.',
      'The design challenge moved from access to discoverability.',
    ],
    image: crmFragmentationImg,
    imageAlt: 'Patient list view in the CRM',
  },
  {
    id: 'crm-research',
    category: 'Research',
    title: 'Pain Points & Strategic Design Principles',
    body: [
      'We studied 5+ OpenLoop agents directly and tested the workflow against industry benchmarks. We used four key research methods to separate first-hand workflow evidence from broader operational benchmarks.',
      'Our research uncovered these pain points. Here is how they shaped our design decisions.',
    ],
    metrics: [
      { label: 'Research', values: ['5+ agent conversations', 'Industry workflow benchmarks', 'Operational signal review'] },
      { label: 'Focus', values: ['Findability', 'Patient journey context', 'Decision confidence'] },
    ],
    methods: [
      {
        label: '01',
        title: 'Observational Case Study',
        body: 'On-site observation at large US weight loss medical clinics.',
      },
      {
        label: '02',
        title: 'Industry Benchmarking',
        body: 'Compared CRM and healthcare operations patterns against industry references.',
      },
      {
        label: '03',
        title: 'Quantitative Metrics Analysis',
        body: 'Reviewed operational signals that showed where work was slowing down.',
      },
      {
        label: '04',
        title: 'Workflow Observation',
        body: 'Watched how support agents moved from patient questions to answers.',
      },
    ],
    principles: [
      {
        label: 'Principle',
        title: 'Prioritize journey context',
        body: 'Show where the patient is in treatment before exposing every possible detail.',
      },
      {
        label: 'Principle',
        title: 'Make status legible',
        body: 'Let agents understand what needs attention without reading the whole record.',
      },
      {
        label: 'Principle',
        title: 'Reduce decision pressure',
        body: 'Support the next action instead of asking agents to interpret raw system history.',
      },
    ],
    painPoints: [
      {
        percentage: '28%',
        painPoint: 'Multiple System Switching',
        designDecision: 'Minimize Context Switching',
        description: 'To answer a simple patient question, agents often switched between 4 to 6 systems. Frequent context switching interrupted workflows and increased cognitive load.',
        category: 'Operational Complexity',
      },
      {
        percentage: '22%',
        painPoint: 'Fragmented Patient Data',
        designDecision: 'Prioritize by Frequency',
        description: 'Patient information was scattered across systems, but most inquiries focused on recurring topics such as insurance, appointments, and new patient status.',
        category: 'Information Architecture',
      },
      {
        percentage: '18%',
        painPoint: 'Unsynced Data',
        designDecision: 'Improve Status Visibility',
        description: 'Updates were not always reflected across systems in real time, making it difficult for agents to know whether information was current.',
        category: 'Data Integrity',
      },
      {
        percentage: '15%',
        painPoint: 'Unable to Resolve Directly',
        designDecision: 'Support Smooth Escalation',
        description: 'Some issues required handoff to other teams. The system needed clear escalation paths and preserved context during transfer.',
        category: 'Collaboration & Handoff',
      },
    ],
    successCriteria: [
      { title: 'Time spent piecing information together', badge: 'REDUCED' },
      { title: 'Identification of blockers', badge: 'FASTER' },
      { title: 'Understanding of current patient status', badge: 'FASTER' },
      { title: 'Confidence in deciding next actions', badge: 'INCREASED' },
    ],
    successCriteriaLabel: 'Success criteria',
    quote: 'If agents are working faster, why has patient wait time not improved significantly?',
    image: clientJourneyImg,
    imageAlt: 'Patient journey detail screen',
  },
  {
    id: 'crm-manager-resistance',
    category: 'Design',
    title: 'Rapidly turning concepts into tangible workflows',
    body: [
      'But when we spoke with managers, they did not want to switch systems. They were already used to judging from experience, so the design had to make the new workflow tangible before asking them to trust it.',
      'Instead of a long research cycle, we used AI prototyping to rapidly move from concepts into workflows that managers could evaluate.',
    ],
    directions: [
      {
        label: 'Direction 01',
        title: 'Escalation tracker',
        body: 'A workflow-first approach that visualizes bottleneck states directly overlaying the active patient journey.',
      },
      {
        label: 'Direction 02',
        title: 'Operational chart view',
        body: 'A traditional dashboard approach focused on static charts, operational tables, and raw percentage metrics.',
      },
    ],
    reviewerQuote: {
      quote: 'This finally made sense to managers.',
      name: 'Gloria',
      role: 'Senior PM',
    },
    finalVideo: finalDesignVideo,
  },
  {
    id: 'crm-testing',
    category: 'Testing',
    title: 'Testing revealed a critical strategy gap',
    body: [
      'We ran lightweight walkthroughs using real patient scenarios. Initial testing showed positive results.',
    ],
    successCriteria: [
      { title: 'Time spent piecing information together', badge: 'REDUCED' },
      { title: 'Identification of blockers', badge: 'FASTER' },
      { title: 'Understanding of current patient status', badge: 'FASTER' },
      { title: 'Confidence in deciding next actions', badge: 'INCREASED' },
    ],
    successCriteriaLabel: 'Testing signals',
    testingConclusion:
      'However, the overall operational performance did not improve as much as expected. This raised a new question:',
    quote: "If agents are working faster, why hasn't patient wait time improved significantly?",
  },
  {
    id: 'crm-transition',
    category: 'Transition',
    title: 'Manager Allocation & System Paradox',
    body: [
      'However, the overall operational performance did not improve as much as expected. To understand why, we stepped back and looked beyond individual cases.',
      'We found that some queues were overloaded while others moved smoothly.',
    ],
    image: allocationParadoxImg,
    imageAlt: 'Queue allocation paradox analysis',
  },
  {
    id: 'crm-manager',
    category: 'New User Group',
    title: 'A new user appeared: managers',
    body: [
      'The CRM solved for agents, but uncovered a critical gap — managers had no unified view.',
      'When we looked at how managers actually worked, we found that they faced the same problem: information scattered across multiple tools. To make allocation decisions, they had to piece it all together manually.',
    ],
    insights: [
      'Which step is most blocked right now?',
      'Which team is working most efficiently?',
      'Which teams need more support?',
    ],
    managerNeeds: [
      {
        label: 'Blocker',
        title: 'Which step is most blocked right now?',
        body: '',
      },
      {
        label: 'Efficiency',
        title: 'Which team is working most efficiently?',
        body: '',
      },
      {
        label: 'Resource allocation',
        title: 'Which teams need more support?',
        body: '',
      },
    ],
    practicalIdeas: [
      {
        label: 'Idea 01',
        title: 'Make bottlenecks visible',
        body: 'Surface queue pressure and blocked journey steps without forcing managers into every patient record.',
      },
      {
        label: 'Idea 02',
        title: 'Find urgent cases faster',
        body: 'Help managers identify which patient groups needed intervention first.',
      },
    ],
    image: managerWorkflowImg,
    imageAlt: 'CRM detail screen used for operational review',
  },
  {
    id: 'crm-manager-resistance-problem',
    category: 'Problem',
    title: 'Second challenge: manager resistance to new CRM managers',
    body: [
      'But when we spoke with managers, they did not want to switch systems. They were already used to judging from experience. Simply saying "there is a new tool" would not convince them. Instead of a long research cycle, we used AI prototyping to rapidly explore two directions:',
    ],
    directions: [
      {
        label: 'Escalation tracker',
        title: 'Direction 01: Escalation tracker',
        body: 'A workflow-first approach that visualizes bottleneck states directly overlaying the active patient journey.',
        videoSrc: dashboardConceptOneVideo,
      },
      {
        label: 'Operational chart view',
        title: 'Direction 02: Operational chart view',
        body: 'A traditional dashboard approach focused on static charts, operational tables, and raw percentage metrics.',
        videoSrc: dashboardConceptTwoVideo,
      },
    ],
    reviewerQuote: {
      quote: 'I shared your walkthrough with the managers today — everyone got super excited haha!',
      name: 'Gloria',
      role: 'Senior PM',
    },
    conclusion:
      'The Escalation Tracker quickly became the preferred direction during concept testing. Managers found it more intuitive than a traditional dashboard because it connected operational issues directly to the patient journey.',
    finalVideo: managerViewVideo,
  },
  {
    id: 'crm-outcome',
    category: 'Outcome',
    title: 'From information access to operational visibility',
    body: [
      'The project began with a simple question: how can agents find information faster? It ended with a broader realization: improving operational performance required making the entire workflow visible.',
    ],
    successCriteria: [
      { title: 'Queue imbalance visibility', badge: 'INCREASED' },
      { title: 'Resource allocation speed', badge: 'FASTER' },
      { title: 'Patient wait time', badge: 'REDUCED' },
      { title: 'Confidence in prioritization', badge: 'INCREASED' },
    ],
    successCriteriaLabel: 'Outcome signals',
  },
  {
    id: 'crm-iteration',
    category: 'Iteration',
    title: 'Evolving Into an Operational System',
    body: [
      'As adoption grew, the CRM evolved beyond a single workflow. We introduced role-based views, permission models, and operational tooling to support different teams, responsibilities, and levels of operational access across the organization.',
    ],
  },
];

function InsightList({ items }: { items: string[] }) {
  return (
    <Callout variant="card" className="case-card case-surface-base">
      <span className="case-caption-label block">What this changed</span>
      <ul className="mt-[var(--space-section-body-element)] space-y-[var(--space-text-stack)]">
        {items.map((item) => (
          <li key={item} className="case-body-copy flex gap-[var(--space-section-body-element)]">
            <span className="text-[var(--color-primary)]">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Callout>
  );
}

export default function PatientCrmCaseStudy() {
  const navItems = useMemo(
    () => sections.map((section) => ({
      id: section.id,
      label: section.category,
    })),
    []
  );
  const [selectedSectionId, setSelectedSectionId] = useState(navItems[0]?.id ?? '');
  const { previous, next } = getAdjacentPagerItems(caseStudyPagerItems, 'patient-crm');

  useEffect(() => {
    const handleScroll = () => {
      const stickyStackHeight = Array.from(
        document.querySelectorAll<HTMLElement>('.editorial-header, .case-study-top-nav')
      ).reduce((total, element) => total + element.offsetHeight, 0);
      const scrollReference = window.scrollY + stickyStackHeight + 32;
      const activeSection = navItems.reduce((activeId, item) => {
        const element = document.getElementById(item.id);
        if (!element) return activeId;
        return element.offsetTop <= scrollReference ? item.id : activeId;
      }, navItems[0]?.id ?? '');

      setSelectedSectionId(activeSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const handleNavSelect = (id: string) => {
    setSelectedSectionId(id);
    const element = document.getElementById(id);
    if (!element) return;

    const stickyStackHeight = Array.from(
      document.querySelectorAll<HTMLElement>('.editorial-header, .case-study-top-nav')
    ).reduce((total, stickyElement) => total + stickyElement.offsetHeight, 0);
    window.scrollTo({
      top: element.offsetTop - stickyStackHeight - 16,
      behavior: 'smooth',
    });
  };

  return (
    <main className="min-h-screen bg-[var(--surface-base)] text-[var(--text-primary)]">
      <EditorialHeader
        brandLabel="Kaiwei"
        brandHref="/"
        leftLabel="Portfolio"
        rightLabel="Case Study"
        actionLabel="LaunchPad"
        actionHref="/"
      />
      <CaseStudyTopNav
        items={navItems}
        selectedId={selectedSectionId}
        onSelect={handleNavSelect}
      />

      <CaseHero
        variant="showcase"
        title="Patient CRM"
        subtitle="A telehealth CRM that unifies fragmented workflows—reducing hours of manual work to seconds."
        chips={['2026', 'Product design', 'Healthcare operations']}
        meta={projectMetaItems}
        artifact={{
          type: 'video',
          src: heroCrmCardVideo,
          ariaLabel: 'Patient CRM final design preview',
          autoPlay: true,
          muted: true,
          loop: true,
          playsInline: true,
          preload: 'metadata',
        }}
      />

      {sections.map((section, index) => (
        <SectionShell
          key={section.id}
          id={section.id}
          phaseId={section.id}
          category={section.category}
          title={section.title}
          sysId={section.title}
          chapterLabel="PATIENT CRM"
          isFocused={false}
          surface={index % 2 === 0 ? 'subtle' : 'base'}
        >
          {section.id === 'crm-context' ? (
            <div className="case-narrative-flow">
              <ContextMediaExtension
                intro={(
                  <>
                    Imagine you ordered a weight loss medication online. After checkout, at some point you might want to call to ask where your medication is. When this happens, you <strong>call a support agent.</strong>
                  </>
                )}
                stripImage={{
                  src: crmContextAgentImg,
                  alt: 'Five-panel illustration showing a patient calling support and an agent checking medication information',
                }}
                detailCopy={(
                  <>
                    <p>To answer your questions, the agent needs to quickly understand your situation.</p>
                    <p>
                      That's where the <strong>CRM</strong> comes in, <strong>a central “encyclopedia” for the patient journey.</strong>
                    </p>
                  </>
                )}
                detailImage={{
                  src: crmContextDetailImg,
                  alt: 'Illustration of a patient journey encyclopedia',
                }}
                closing="However, before I joined the team, OpenLoop did not have a mature unified system in place."
              />
            </div>
          ) : section.id === 'crm-transition' ? (
            <div className="case-context-media-explain">
              <div className="case-body-copy case-paragraph-stack">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.image && section.imageAlt ? (
                <FigureFrame
                  src={section.image}
                  alt={section.imageAlt}
                  variant="flush"
                  imageClassName="block w-full"
                />
              ) : null}
            </div>
          ) : section.id === 'crm-problem' ? (
            <div className="case-narrative-flow">
              <div className="case-body-copy case-paragraph-stack">
                <p>{section.body[0]}</p>
              </div>

              {section.image && section.imageAlt ? (
                <FigureFrame
                  src={section.image}
                  alt={section.imageAlt}
                  variant="flush"
                  imageClassName="block w-full"
                />
              ) : null}

              <div className="case-body-copy case-paragraph-stack">
                {section.body.slice(1).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {section.quote ? (
                <Callout variant="quote">
                  <p className="case-body-copy italic">"{section.quote}"</p>
                </Callout>
              ) : null}

              {section.insights ? (
                <InsightList items={section.insights} />
              ) : null}
            </div>
          ) : section.id === 'crm-research' && section.methods && section.painPoints && section.successCriteria && section.principles && section.quote ? (
            <ResearchSummaryPanel
              methods={section.methods}
              painPoints={section.painPoints}
              successCriteria={section.successCriteria}
              principles={section.principles}
              quote={section.quote}
            />
          ) : section.id === 'crm-manager-resistance' && section.directions ? (
            <div className="case-narrative-flow">
              <div className="case-body-copy case-paragraph-stack">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="case-section-divider" role="presentation">
                <span>Design process</span>
              </div>
              <DesignProcessTabs
                reviewerQuote={section.reviewerQuote}
                processImages={{
                  organizing: {
                    src: managerInformationArchitectureImg,
                    alt: 'Information architecture map used to organize operational context',
                  },
                  workflow: {
                    src: managerWorkflowStructureImg,
                    alt: 'Workflow structure wireframes from the original Framer case study',
                  },
                  prototype: {
                    type: 'video',
                    src: aiCrmPrototypeVideo,
                    alt: 'AI-generated prototype dashboard used to compare CRM design directions',
                  },
                }}
              />
              {section.finalVideo ? (
                <>
                  <div className="case-section-divider" role="presentation">
                    <span>Final design</span>
                  </div>
                  <VideoShowcase src={section.finalVideo} showLabel={false} />
                </>
              ) : null}
            </div>
          ) : section.id === 'crm-manager' ? (
            <div className="case-narrative-flow">
              <div className="case-body-copy case-paragraph-stack">
                <p>{section.body[0]}</p>
              </div>

              <div className="case-narrative-flow">
                <span className="case-caption-label block">Manager's daily workflow</span>
                <div className="case-body-copy case-paragraph-stack">
                  <p>{section.body[1]}</p>
                </div>
                {section.image && section.imageAlt ? (
                  <FigureFrame
                    src={section.image}
                    alt={section.imageAlt}
                    variant="flush"
                    imageClassName="block w-full"
                  />
                ) : null}
              </div>

              {section.managerNeeds ? (
                <div className="case-narrative-flow">
                  <span className="case-caption-label block">Three things managers need to know each day</span>
                  <CaseStudyCardGrid items={section.managerNeeds} columns="md:grid-cols-3" />
                </div>
              ) : null}

              {section.practicalIdeas ? (
                <div className="case-narrative-flow">
                  <span className="case-caption-label block">Two practical ideas</span>
                  <CaseStudyCardGrid items={section.practicalIdeas} columns="md:grid-cols-2" />
                </div>
              ) : null}
            </div>
          ) : section.id === 'crm-testing' && section.successCriteria && section.quote ? (
            <div className="case-narrative-flow">
              <div className="case-body-copy case-paragraph-stack">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <SuccessCriteriaPanel items={section.successCriteria} label={section.successCriteriaLabel} />
              {section.testingConclusion ? (
                <div className="case-body-copy case-paragraph-stack">
                  <p>{section.testingConclusion}</p>
                </div>
              ) : null}
              <Callout variant="quote">
                <p className="case-body-copy italic">"{section.quote}"</p>
              </Callout>
            </div>
          ) : (
            <div className="case-narrative-flow">
            <div className="case-body-copy case-paragraph-stack">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {section.quote ? (
              <Callout variant="quote">
                <p className="case-body-copy italic">"{section.quote}"</p>
              </Callout>
            ) : null}

            {section.metrics ? (
              <Callout variant="card" className="case-card case-surface-base">
                <MetaGrid items={section.metrics} className="grid grid-cols-1 gap-y-[var(--space-3xl)] md:grid-cols-2 md:gap-y-0" />
              </Callout>
            ) : null}

            {section.methods ? (
              <ResearchMethodCards items={section.methods} />
            ) : null}

            {section.painPoints ? (
              <PainPointDecisionMatrix items={section.painPoints} />
            ) : null}

            {section.successCriteria ? (
              <SuccessCriteriaPanel items={section.successCriteria} label={section.successCriteriaLabel} />
            ) : null}

            {section.insights ? (
              <InsightList items={section.insights} />
            ) : null}

            {section.principles ? (
              <div className="case-narrative-flow">
                <span className="case-caption-label block">Design principles</span>
                <CaseStudyCardGrid items={section.principles} columns="md:grid-cols-3" />
              </div>
            ) : null}

            {section.directions ? (
              <ConceptDirectionToggle items={section.directions} />
            ) : null}

            {section.managerNeeds ? (
              <div className="case-narrative-flow">
                <span className="case-caption-label block">Manager workflow needs</span>
                <CaseStudyCardGrid items={section.managerNeeds} columns="md:grid-cols-3" />
              </div>
            ) : null}

            {section.reviewerQuote ? (
              <ReviewerQuoteCard {...section.reviewerQuote} />
            ) : null}

            {section.conclusion ? (
              <div className="case-body-copy case-paragraph-stack">
                <p>{section.conclusion}</p>
              </div>
            ) : null}

            {section.finalVideo ? (
              <VideoShowcase src={section.finalVideo} />
            ) : null}

            {section.image && section.imageAlt ? (
              <FigureFrame
                src={section.image}
                alt={section.imageAlt}
                variant="flush"
                imageClassName="block w-full"
              />
            ) : null}

            {section.secondaryImages ? (
              <div className="grid grid-cols-1 gap-[var(--space-section-body-element)] md:grid-cols-2">
                {section.secondaryImages.map((image) => (
                  <div key={image.alt}>
                    <FigureFrame
                      src={image.src}
                      alt={image.alt}
                      variant="flush"
                      imageClassName="block w-full"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          )}
        </SectionShell>
      ))}
      <div className="mx-auto w-full max-w-[var(--container-main)] px-[var(--space-page-x)] pb-[var(--space-section-padding-y)] md:px-[var(--space-page-x-desktop)]">
        <ProjectPager
          ariaLabel="Browse case studies"
          previous={previous}
          next={next}
        />
      </div>
    </main>
  );
}
