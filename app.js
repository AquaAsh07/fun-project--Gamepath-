const roadmap = [
  {
    title: 'Project map & guardrails',
    summary: 'Agree on the product shape and keep the build focused.',
    steps: [
      { title: 'Plan Gamepath and create this project tracker', description: 'Set the phased scope, define the first release direction, and establish a simple progress tracker.', done: true },
      { title: 'Define the MVP rules and boundaries', description: 'Decide how a game, role, character, and challenge are selected—and what is intentionally out of scope for v1.' },
      { title: 'Confirm the game data and challenge targets', description: 'Map the launch roster and categories for Marvel Rivals, VALORANT, and FC 27; clarify level goals such as Lord (20) and Champion (70).' }
    ]
  },
  {
    title: 'Core experience',
    summary: 'Design the path from choosing a game to getting a challenge.',
    steps: [
      { title: 'Sketch the main user flow and screen layout', description: 'Plan the game picker, role/category reveal, character reveal, and final challenge card.' },
      { title: 'Choose the randomizer interaction', description: 'Settle the wheel or flashcard reveal behavior, including rerolls, animation, and accessible controls.' },
      { title: 'Define challenge settings and completion states', description: 'Specify goal selection, such as Lord or Champion, and what the user sees after getting a path.' }
    ]
  },
  {
    title: 'Build the MVP',
    summary: 'Turn the approved flow into a usable browser experience.',
    steps: [
      { title: 'Build the responsive Gamepath interface', description: 'Create the game selection and focused reveal screens for desktop and mobile.' },
      { title: 'Implement data-driven random selections', description: 'Use structured game, category, character, and challenge data instead of hard-coded screen logic.' },
      { title: 'Add fairness, reroll, and empty-state handling', description: 'Avoid invalid results, explain unavailable data, and make rerolls feel deliberate.' }
    ]
  },
  {
    title: 'Game content & progression',
    summary: 'Make each supported game feel complete and accurate.',
    steps: [
      { title: 'Add Marvel Rivals roles, characters, and rank goals', description: 'Connect Duelist, Tank, and Support to the correct roster, with configurable character-level milestones.' },
      { title: 'Add VALORANT agent and role paths', description: 'Define the agent categories and the challenge types that make sense for VALORANT.' },
      { title: 'Add FC 27 modes and challenge paths', description: 'Choose suitable FC 27 categories and build a first set of replayable challenges.' }
    ]
  },
  {
    title: 'Test, polish & launch',
    summary: 'Verify the paths, refine the details, and make it shareable.',
    steps: [
      { title: 'Test on mobile and desktop', description: 'Check keyboard access, touch targets, layout, and the full path from game choice to challenge.' },
      { title: 'Polish visuals, copy, and loading states', description: 'Tighten the reveal moments and make every state clear, fast, and consistent.' },
      { title: 'Deploy the first release and collect feedback', description: 'Publish a stable MVP, share it with players, and use feedback to scope the next phase.' }
    ]
  }
];

const STORAGE_KEY = 'gamepath-roadmap-v1';
const phaseList = document.querySelector('#phase-list');
const progressPercent = document.querySelector('#progress-percent');
const progressCount = document.querySelector('#progress-count');
const phaseCount = document.querySelector('#phase-count');
const progressFill = document.querySelector('#progress-fill');
const progressBar = document.querySelector('.progress-track');
const nextStep = document.querySelector('#next-step');

function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return saved && typeof saved === 'object' ? saved : {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Keep the checklist usable if browser storage is blocked or full.
  }
}

function getStepKey(phaseIndex, stepIndex) {
  return `${phaseIndex}-${stepIndex}`;
}

function render() {
  const progress = readProgress();
  const flatSteps = roadmap.flatMap((phase, phaseIndex) => phase.steps.map((step, stepIndex) => ({
    ...step,
    key: getStepKey(phaseIndex, stepIndex),
    phaseIndex,
    stepIndex
  })));
  const completed = flatSteps.filter((step) => step.done || progress[step.key] === true).length;
  const percent = Math.round((completed / flatSteps.length) * 100);
  const upcoming = flatSteps.find((step) => !step.done && progress[step.key] !== true);
  const currentPhase = upcoming?.phaseIndex ?? -1;

  progressPercent.textContent = String(percent);
  progressCount.textContent = `${completed} of ${flatSteps.length} steps`;
  phaseCount.textContent = `${roadmap.length} phases`;
  progressFill.style.width = `${percent}%`;
  progressBar.setAttribute('aria-valuenow', String(percent));
  nextStep.textContent = upcoming ? upcoming.title : 'Every planned step is complete. Time to celebrate—and choose what to build next.';

  phaseList.innerHTML = roadmap.map((phase, phaseIndex) => {
    const phaseSteps = phase.steps.map((step, stepIndex) => ({
      ...step,
      key: getStepKey(phaseIndex, stepIndex)
    }));
    const phaseDone = phaseSteps.filter((step) => step.done || progress[step.key] === true).length;
    const isComplete = phaseDone === phaseSteps.length;
    const isCurrent = phaseIndex === currentPhase;
    const stateLabel = isComplete ? 'COMPLETE' : isCurrent ? 'IN PROGRESS' : 'UPCOMING';
    const phaseNumber = String(phaseIndex + 1).padStart(2, '0');

    return `
      <details class="phase-card${isCurrent ? ' is-current' : ''}" ${isCurrent || phaseIndex === 0 ? 'open' : ''}>
        <summary class="phase-header">
          <span class="phase-number">${phaseNumber}</span>
          <span class="phase-title-wrap">
            <span class="phase-kicker">Phase ${phaseIndex + 1} · ${phaseDone}/${phaseSteps.length} steps</span>
            <span class="phase-title">${phase.title}</span>
            <span class="phase-summary">${phase.summary}</span>
          </span>
          <span class="phase-state">${stateLabel}</span>
          <span class="phase-chevron" aria-hidden="true">⌄</span>
        </summary>
        <div class="steps">
          ${phaseSteps.map((step, stepIndex) => {
            const checked = step.done || progress[step.key] === true;
            return `
              <label class="step">
                <input type="checkbox" data-step="${step.key}" ${checked ? 'checked' : ''} ${step.done ? 'disabled' : ''} aria-label="Mark ${step.title} ${checked ? 'incomplete' : 'complete'}">
                <span class="step-copy">
                  <span class="step-title">${step.title}</span>
                  <span class="step-description">${step.description}</span>
                </span>
                <span class="step-number">${String(stepIndex + 1).padStart(2, '0')}</span>
              </label>`;
          }).join('')}
        </div>
      </details>`;
  }).join('');
}

phaseList.addEventListener('change', (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || input.type !== 'checkbox') return;
  const progress = readProgress();
  progress[input.dataset.step] = input.checked;
  saveProgress(progress);
  render();
});

document.querySelector('#reset-button').addEventListener('click', () => {
  const shouldReset = window.confirm('Reset your saved checklist progress? The first completed step will stay complete.');
  if (!shouldReset) return;
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* Ignore unavailable storage. */ }
  render();
});

render();
