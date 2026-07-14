// RAN Online Episode 3 Configuration
export const EPISODE_3_CONFIG = {
  MAX_LEVEL: 157,
  EPISODE: 3,
  STAT_POINTS_PER_LEVEL: 3,
} as const;

// RAN Online Stats: STR, DEX, INT, VIT
export interface CharacterStats {
  STR: number;  // Strength - Physical Attack
  DEX: number;  // Dexterity - Accuracy, Evasion, Ranged Damage
  INT: number;  // Intelligence - Magic Attack, MP
  VIT: number;  // Vitality - HP, Defense
}

// Skill Definition
export interface Skill {
  id: string;
  name: string;
  description: string;
  requirements: SkillRequirement[];
  class: string[];
  level: number;
  episode?: number;
  type?: string;
}

// Skill Requirement
export interface SkillRequirement {
  type: string;
  stat?: keyof CharacterStats;
  value: number;
  skill?: string;
}

// Character
export interface Character {
  id: string;
  name: string;
  class: string;
  level: number;
  stats: CharacterStats;
  skills: string[];
  availableStatPoints: number;
}

// Calculation Result
export interface CalculationResult {
  canLearnSkill: boolean;
  missingRequirements: string[];
  recommendations: string[];
}
