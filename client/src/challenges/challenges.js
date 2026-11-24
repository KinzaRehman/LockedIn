/*Challenge catalogue and per-user challenge selection.
Challenges.jsx imports this module. The selection is stored on this
device (localStorage), keyed by user id, so each account keeps its own
saved progress. Edit the `challenges` list below to change what the
Challenge selection page offers — reading is the only challenge with a
goal the user sets here (daily minutes).*/

export const challenges = {
  reading: {
    title: 'Reading',
    description: 'Read every day and hit your daily minutes goal.',
  },
  workout: {
    title: 'Workout',
    description: 'Move your body every day, even if it is just a short session.',
  },
  water: {
    title: 'Drink water',
    description: 'Hit your daily water goal.',
  },
  meditation: {
    title: 'Meditation',
    description: 'Take a few quiet minutes for yourself every day.',
  },
  journaling: {
    title: 'Journaling',
    description: 'Write a few lines every day about how it went.',
  },
  noSugar: {
    title: 'No added sugar',
    description: 'Skip added sugar for the day.',
  },
};

const STORAGE_PREFIX = 'locked-in:challenges:';

function storageKey(userId) {
  return `${STORAGE_PREFIX}${userId ?? 'guest'}`;
}

function emptySelection() {
  return { selected: [], entries: {} };
}

// Read the saved selection for one user. Returns { selected, entries }
// and never throws — a missing or damaged saved value falls back to empty.
export function readChallengeSelection(userId) {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    if (!raw) return emptySelection();
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.selected)) return emptySelection();
    return {
      selected: parsed.selected.filter(type => Object.hasOwn(challenges, type)),
      entries: parsed.entries && typeof parsed.entries === 'object' ? parsed.entries : {},
    };
  } catch {
    return emptySelection();
  }
}

// Save the selection for one user. Throws when the browser cannot store
// it (for example storage is full or unavailable), so the caller can
// show an error instead of navigating away.
export function saveChallengeSelection(userId, selected, minutes) {
  const entries = {};
  if (selected.includes('reading') && Number.isFinite(minutes) && minutes > 0) {
    entries.reading = { minutes };
  }
  localStorage.setItem(
    storageKey(userId),
    JSON.stringify({ selected, entries }),
  );
}
