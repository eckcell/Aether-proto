/**
 * Pythagorean Gematria Mapping:
 * 1: A, J, S
 * 2: B, K, T
 * 3: C, L, U
 * 4: D, M, V
 * 5: E, N, W
 * 6: F, O, X
 * 7: G, P, Y
 * 8: H, Q, Z
 * 9: I, R
 */

const GEMATRIA_MAP: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9,
};

export const getCharWeight = (char: string): number => {
  const upper = char.toUpperCase();
  return GEMATRIA_MAP[upper] || 0;
};

/**
 * Calculates the 'Soul Seed' - a single digit (1-9) vibration based on a name.
 * Uses the Pythagorean system and digit reduction.
 */
export const calculateSoulSeed = (name: string): number => {
  if (!name || name.trim() === '') return 0;

  const normalized = name.toUpperCase().replace(/[^A-Z]/g, '');
  if (normalized.length === 0) return 0;

  let sum = 0;
  for (const char of normalized) {
    sum += GEMATRIA_MAP[char] || 0;
  }

  // Reduce to single digit (1-9)
  // Exception: in some systems 11, 22 are master numbers, but prompt requests 1-9.
  return reduceToSingleDigit(sum);
};

const reduceToSingleDigit = (num: number): number => {
  if (num === 0) return 0;
  // Mathematical shortcut for digital root: (n-1) % 9 + 1
  return ((num - 1) % 9) + 1;
};
