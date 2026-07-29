import { play } from 'cuelume';

let started = false;

const getSoundButton = (target: EventTarget | null) => {
  if (!(target instanceof Element)) return null;
  const button = target.closest('button');
  if (!(button instanceof HTMLButtonElement) || button.disabled) return null;
  return button.dataset.sound === 'tab' || button.dataset.sound === 'copy' || button.dataset.sound === 'sparkle' ? button : null;
};

export const startButtonSounds = () => {
  if (started) return;
  started = true;

  document.addEventListener('pointerover', (event) => {
    if (event.pointerType !== 'mouse') return;
    const button = getSoundButton(event.target);
    if (!button || button.dataset.sound !== 'sparkle') return;
    if (event.relatedTarget instanceof Node && button.contains(event.relatedTarget)) return;
    play('sparkle', { volume: 0.18 });
  });

  document.addEventListener('click', (event) => {
    const button = getSoundButton(event.target);
    if (!button || button.dataset.sound === 'sparkle') return;
    play(button.dataset.sound === 'copy' ? 'success' : 'toggle', { volume: 0.16 });
  });
};
