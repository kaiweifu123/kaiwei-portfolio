/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SectionItem } from '../types';
import { X, Check } from 'lucide-react';

interface SyllabusModalFormProps {
  item: SectionItem | null; // null means we are adding a new item
  onClose: () => void;
  onSave: (savedItem: SectionItem) => void;
}

const PRESET_BANNERS = [
  { name: 'Architecture Detail', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Brutalist Concrete', url: 'https://images.unsplash.com/photo-1549558545-aee92510392f?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Minimalist Void', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Library / Bookshelf', url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Industrial Structure', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80' }
];

export default function SyllabusModalForm({
  item,
  onClose,
  onSave,
}: SyllabusModalFormProps) {
  const isEdit = !!item;

  const [id, setId] = useState(item?.id || '');
  const [title, setTitle] = useState(item?.title || '');
  const [category, setCategory] = useState(item?.category || '');
  const [sysId, setSysId] = useState(item?.sysId || '');
  const [dropCap, setDropCap] = useState(item?.dropCap || '');
  const [dropCapText, setDropCapText] = useState(item?.dropCapText || '');
  const [quote, setQuote] = useState(item?.quote || '');
  const [paragraphsText, setParagraphsText] = useState(item?.paragraphs.join('\n\n') || '');
  const [leadFacultyText, setLeadFacultyText] = useState(item?.leadFaculty.join(', ') || '');
  const [requirementText, setRequirementText] = useState(item?.requirement.join(', ') || '');
  const [location, setLocation] = useState(item?.location || '');
  const [bannerImage, setBannerImage] = useState(item?.bannerImage || PRESET_BANNERS[0].url);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    const newErrors: Record<string, string> = {};
    if (!id.trim()) newErrors.id = 'Mnemonic code is required (e.g. ARC-101)';
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!category.trim()) newErrors.category = 'Syllabus Division Category is required';
    if (!dropCap.trim() || dropCap.trim().length !== 1) newErrors.dropCap = 'Drop Cap must be a single character';
    if (!dropCapText.trim()) newErrors.dropCapText = 'Core opening descriptive text is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Process lists
    const paragraphs = paragraphsText
      .split('\n\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const leadFaculty = leadFacultyText
      .split(',')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const requirement = requirementText
      .split(',')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const saved: SectionItem = {
      id: id.trim().toUpperCase(),
      title: title.trim(),
      category: category.trim().toUpperCase(),
      sysId: sysId.trim() || `SYS_ID: ${id.trim().toUpperCase()}.A.2026`,
      dropCap: dropCap.trim().substring(0, 1),
      dropCapText: dropCapText.trim(),
      quote: quote.trim() || undefined,
      paragraphs: paragraphs.length ? paragraphs : ['Syllabus details pending compilation.'],
      leadFaculty: leadFaculty.length ? leadFaculty : ['Staff Pen-Assign'],
      requirement: requirement.length ? requirement : ['1.0 Credits'],
      location: location.trim() || 'Virtual Grid',
      bannerImage,
    };

    onSave(saved);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Container */}
      <div 
        className="bg-white border border-[var(--color-brutal-dark)] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative select-none animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="h-16 px-6 border-b border-[var(--color-brutal-border)] bg-[var(--color-brutal-bg)] flex items-center justify-between">
          <span className="font-sans text-xs tracking-widest font-semibold">
            {isEdit ? `EDIT SYLLABUS RECORD // ${item.id}` : 'CREATE NEW SYLLABUS ENTRY'}
          </span>
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-200 transition-colors rounded text-neutral-600 hover:text-black cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {/* Identifiers Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-[10px] text-neutral-500 tracking-widest mb-1.5">
                Mnemonic Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  setErrors(prev => ({ ...prev, id: '' }));
                }}
                disabled={isEdit}
                placeholder="E.G. ARC-101"
                className={`w-full text-xs font-sans border bg-transparent p-2.5 rounded outline-none focus:border-neutral-500 ${
                  errors.id ? 'border-red-400' : 'border-[var(--color-brutal-border)]'
                }`}
              />
              {errors.id && <p className="text-[10px] font-sans text-red-500 mt-1">{errors.id}</p>}
            </div>

            <div>
              <label className="block font-sans text-[10px] text-neutral-500 tracking-widest mb-1.5">
                Syllabus Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setErrors(prev => ({ ...prev, category: '' }));
                }}
                placeholder="E.G. CINEMATIC ARTS :: LAB 03"
                className={`w-full text-xs font-sans border bg-transparent p-2.5 rounded outline-none focus:border-neutral-500 ${
                  errors.category ? 'border-red-400' : 'border-[var(--color-brutal-border)]'
                }`}
              />
              {errors.category && <p className="text-[10px] font-sans text-red-500 mt-1">{errors.category}</p>}
            </div>
          </div>

          <div>
            <label className="block font-sans text-[10px] text-neutral-500 tracking-widest mb-1.5">
              Course Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors(prev => ({ ...prev, title: '' }));
              }}
              placeholder="E.G. THE PHENOMENOLOGY OF CONCRETE LIGHT"
              className={`w-full text-xs font-sans border bg-transparent p-2.5 rounded outline-none focus:border-neutral-500 ${
                errors.title ? 'border-red-400' : 'border-[var(--color-brutal-border)]'
              }`}
            />
            {errors.title && <p className="text-[10px] font-sans text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block font-sans text-[10px] text-neutral-500 tracking-widest mb-1.5">
              System ID Code (Optional)
            </label>
            <input
              type="text"
              value={sysId}
              onChange={(e) => setSysId(e.target.value)}
              placeholder="E.G. SYS_ID: ARC-101.B.2026"
              className="w-full text-xs font-sans border border-[var(--color-brutal-border)] bg-transparent p-2.5 rounded outline-none focus:border-neutral-500"
            />
          </div>

          {/* Banner configuration */}
          <div>
            <label className="block font-sans text-[10px] text-neutral-500 tracking-widest mb-1.5">
              Banner Hero Image
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
              {PRESET_BANNERS.map((preset) => {
                const isSelected = bannerImage === preset.url;
                return (
                  <button
                    type="button"
                    key={preset.name}
                    onClick={() => setBannerImage(preset.url)}
                    className={`h-11 border text-[9px] font-sans p-1 rounded overflow-hidden flex items-center justify-center text-center leading-none transition-all ${
                      isSelected
                        ? 'border-[var(--color-brutal-dark)] bg-neutral-900 text-white'
                        : 'border-[var(--color-brutal-border)] bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {preset.name}
                  </button>
                );
              })}
            </div>
            <input
              type="text"
              value={bannerImage}
              onChange={(e) => setBannerImage(e.target.value)}
              placeholder="Or enter custom Image URL..."
              className="w-full text-xs font-sans border border-[var(--color-brutal-border)] bg-transparent p-2.5 rounded outline-none focus:border-neutral-500"
            />
          </div>

          {/* Drop cap and Opening paragraph */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-2">
              <label className="block font-sans text-[10px] text-neutral-500 tracking-widest mb-1.5">
                Dropcap
              </label>
              <input
                type="text"
                value={dropCap}
                onChange={(e) => {
                  setDropCap(e.target.value);
                  setErrors(prev => ({ ...prev, dropCap: '' }));
                }}
                maxLength={1}
                placeholder="A"
                className={`w-full text-center text-xl font-serif font-semibold border bg-transparent p-2 rounded outline-none focus:border-neutral-500 ${
                  errors.dropCap ? 'border-red-400' : 'border-[var(--color-brutal-border)]'
                }`}
              />
              {errors.dropCap && <p className="text-[8px] font-sans text-red-500 mt-1">{errors.dropCap}</p>}
            </div>

            <div className="md:col-span-10">
              <label className="block font-sans text-[10px] text-neutral-500 tracking-widest mb-1.5">
                First Sentence / Lead Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={dropCapText}
                onChange={(e) => {
                  setDropCapText(e.target.value);
                  setErrors(prev => ({ ...prev, dropCapText: '' }));
                }}
                placeholder="n investigation into state representation mechanisms..."
                rows={2}
                className={`w-full text-xs font-serif border bg-transparent p-2.5 rounded outline-none focus:border-neutral-500 resize-none ${
                  errors.dropCapText ? 'border-red-400' : 'border-[var(--color-brutal-border)]'
                }`}
              />
              {errors.dropCapText && <p className="text-[10px] font-sans text-red-500 mt-1">{errors.dropCapText}</p>}
            </div>
          </div>

          {/* Quote Block */}
          <div>
            <label className="block font-sans text-[10px] text-neutral-500 tracking-widest mb-1.5">
              Highlight Quote (Optional)
            </label>
            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="E.G. 'THE WEIGHT OF THE ARCHITECTURAL FORM CORRESPONDS DIRECTLY TO ITS INTELLECTUAL ARMOR.'"
              rows={2}
              className="w-full text-xs font-serif border border-[var(--color-brutal-border)] bg-transparent p-2.5 rounded outline-none focus:border-neutral-500 resize-none"
            />
          </div>

          {/* Additional paragraphs */}
          <div>
            <label className="block font-sans text-[10px] text-neutral-500 tracking-widest mb-1.5">
              Remaining Paragraphs (Separate with two blank lines)
            </label>
            <textarea
              value={paragraphsText}
              onChange={(e) => setParagraphsText(e.target.value)}
              placeholder="First added paragraph goes here.&#10;&#10;Second added paragraph goes here."
              rows={4}
              className="w-full text-xs font-serif border border-[var(--color-brutal-border)] bg-transparent p-2.5 rounded outline-none focus:border-neutral-500"
            />
          </div>

          {/* Side columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-[10px] text-neutral-500 tracking-widest mb-1.5">
                Lead Faculty (Separate with commas)
              </label>
              <input
                type="text"
                value={leadFacultyText}
                onChange={(e) => setLeadFacultyText(e.target.value)}
                placeholder="E.G. Petr Simon, Radim Střelka"
                className="w-full text-xs font-sans border border-[var(--color-brutal-border)] bg-transparent p-2.5 rounded outline-none focus:border-neutral-500"
              />
            </div>

            <div>
              <label className="block font-sans text-[10px] text-neutral-500 tracking-widest mb-1.5">
                Requirements (Separate with commas)
              </label>
              <input
                type="text"
                value={requirementText}
                onChange={(e) => setRequirementText(e.target.value)}
                placeholder="E.G. 12.0 ECTS Credits, Capacity: 14 / 25"
                className="w-full text-xs font-sans border border-[var(--color-brutal-border)] bg-transparent p-2.5 rounded outline-none focus:border-neutral-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-sans text-[10px] text-neutral-500 tracking-widest mb-1.5">
              Physical / Virtual Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="E.G. Studio 4, Level B2"
              className="w-full text-xs font-sans border border-[var(--color-brutal-border)] bg-transparent p-2.5 rounded outline-none focus:border-neutral-500"
            />
          </div>
        </form>

        {/* Footer with actions */}
        <div className="h-20 px-6 border-t border-[var(--color-brutal-border)] bg-[var(--color-brutal-bg)] flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 border border-[var(--color-brutal-border)] hover:bg-neutral-200 hover:text-black transition-all rounded font-sans text-xs text-neutral-600 cursor-pointer"
          >
            CANCEL
          </button>
          <button
            id="modal-save-button"
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-[var(--color-brutal-dark)] text-white hover:bg-neutral-800 transition-all rounded font-sans text-xs flex items-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            COMMIT RECORD
          </button>
        </div>
      </div>
    </div>
  );
}
