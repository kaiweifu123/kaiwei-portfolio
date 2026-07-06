/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SegmentedToggleOption<T extends string> {
  value: T;
  label: string;
  activeClassName?: string;
}

interface SegmentedToggleProps<T extends string> {
  options: SegmentedToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  buttonClassName?: string;
  inactiveClassName?: string;
  variant?: 'before-after';
}

export default function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
  className = 'inline-flex rounded-[var(--radius-pill)] bg-[var(--surface-control)] p-[var(--space-2xs)]',
  buttonClassName = 'inline-flex h-8 items-center rounded-[var(--radius-pill)] border px-[var(--space-control-x)] font-sans text-[length:var(--font-label)] font-bold tracking-[var(--tracking-control)] transition-colors',
  inactiveClassName = 'border-transparent bg-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]',
  variant,
}: SegmentedToggleProps<T>) {
  const getActiveClassName = (option: SegmentedToggleOption<T>) => {
    if (variant === 'before-after') {
      return option.value === 'before'
        ? 'border-[var(--border-before-color)] bg-[var(--surface-active-warm)] text-[var(--accent-before)]'
        : 'border-[var(--accent-after-border)] bg-[var(--surface-active-cool)] text-[var(--accent-after)]';
    }

    return option.activeClassName ?? '';
  };

  return (
    <div className={className}>
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`${buttonClassName} ${isActive ? getActiveClassName(option) : inactiveClassName}`}
            aria-pressed={isActive}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
