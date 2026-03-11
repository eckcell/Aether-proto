import { Flame, Leaf, Mountain, Shield, Droplets } from 'lucide-react';

export type ElementType = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';

export interface ElementalProfile {
  element: ElementType;
  weight: string;
  numericWeight: number; // For Prediction Engine
  description: string;
  color: string;
  icon: any;
}

const ELEMENT_DATA: Record<ElementType, Omit<ElementalProfile, 'element'>> = {
  Wood: {
    weight: '3, 8',
    numericWeight: 38,
    description: 'Vitality, growth, and the expansive energy of spring.',
    color: 'text-emerald-400',
    icon: Leaf,
  },
  Fire: {
    weight: '2, 7',
    numericWeight: 27,
    description: 'Passion, illumination, and the transformative heat of summer.',
    color: 'text-rose-400',
    icon: Flame,
  },
  Earth: {
    weight: '5, 0',
    numericWeight: 50,
    description: 'Stability, nourishment, and the grounding center of all cycles.',
    color: 'text-amber-400',
    icon: Mountain,
  },
  Metal: {
    weight: '4, 9',
    numericWeight: 49,
    description: 'Precision, strength, and the harvesting clarity of autumn.',
    color: 'text-slate-300',
    icon: Shield,
  },
  Water: {
    weight: '1, 6',
    numericWeight: 16,
    description: 'Fluidity, wisdom, and the introspective depth of winter.',
    color: 'text-sky-400',
    icon: Droplets,
  },
};

/**
 * Assigns one of the Five Elements based on the user's birth year last digit.
 * Wood: 3, 8
 * Fire: 2, 7
 * Earth: 5, 0
 * Metal: 4, 9
 * Water: 1, 6
 */
export const getBirthElement = (year: number): ElementalProfile => {
  const lastDigit = year % 10;
  
  let element: ElementType;
  if (lastDigit === 3 || lastDigit === 8) element = 'Wood';
  else if (lastDigit === 2 || lastDigit === 7) element = 'Fire';
  else if (lastDigit === 5 || lastDigit === 0) element = 'Earth';
  else if (lastDigit === 4 || lastDigit === 9) element = 'Metal';
  else element = 'Water'; // 1, 6

  return {
    element,
    ...ELEMENT_DATA[element],
  };
};
