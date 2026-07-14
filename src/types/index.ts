// Episode 3 Configuration
export const EPISODE_3_CONFIG = {
  MAX_LEVEL: 157,
  EPISODE: 3,
  STAT_POINTS_PER_LEVEL: 3,
} as const;

// Character Stats
export interface CharacterStats {
  STR: number;  // Strength
  DEX: number;  // Dexterity
  INT: number;  // Intelligence
  CON: number;  // Constitution
  WIS: number;  // Wisdom
  CHA: number;  // Charisma
}

// Skill Definition
export interface Skill {
  id: string;
  name: string;
  description: string;
  requirements: SkillRequirement[];
  class: string[];
  level: number;
  episode?: number; // Episode when skill was introduced
}

// Skill Requirement
export interface SkillRequirement {
  type: 'stat' | 'skill' | 'level';
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
