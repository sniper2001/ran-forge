import { Character, SkillRequirement, CalculationResult, EPISODE_3_CONFIG } from '@/types';

/**
 * Check if a character meets specific skill requirements
 */
export const checkSkillRequirements = (
  character: Character,
  requirements: SkillRequirement[]
): CalculationResult => {
  const missingRequirements: string[] = [];
  const recommendations: string[] = [];

  requirements.forEach((req) => {
    if (req.type === 'stat') {
      const stat = req.stat as keyof typeof character.stats;
      const currentValue = character.stats[stat];

      if (currentValue < req.value) {
        const needed = req.value - currentValue;
        missingRequirements.push(
          `${stat}: ${currentValue}/${req.value} (need ${needed} more)`
        );
        recommendations.push(`Increase ${stat} by ${needed} points`);
      }
    } else if (req.type === 'level') {
      if (character.level < req.value) {
        const needed = req.value - character.level;
        missingRequirements.push(
          `Level: ${character.level}/${req.value} (need ${needed} more)`
        );
        recommendations.push(`Level up ${needed} more times`);
      }
    } else if (req.type === 'skill') {
      if (!character.skills.includes(req.skill || '')) {
        missingRequirements.push(`${req.skill}: Not learned`);
        recommendations.push(`Learn skill: ${req.skill}`);
      }
    }
  });

  return {
    canLearnSkill: missingRequirements.length === 0,
    missingRequirements,
    recommendations,
  };
};

/**
 * Calculate total stat points available for the character
 * Episode 3: 3 points per level
 */
export const calculateAvailableStatPoints = (level: number, basePoints: number = 0): number => {
  const pointsFromLevel = (level - 1) * EPISODE_3_CONFIG.STAT_POINTS_PER_LEVEL;
  return basePoints + pointsFromLevel;
};

/**
 * Get maximum level for Episode 3
 */
export const getMaxLevel = (): number => {
  return EPISODE_3_CONFIG.MAX_LEVEL;
};

/**
 * Calculate damage based on character stats
 */
export const calculateDamage = (
  baseAttack: number,
  stats: Character['stats']
): number => {
  const strMultiplier = stats.STR * 0.5;
  const dexBonus = stats.DEX * 0.25;
  return baseAttack + strMultiplier + dexBonus;
};

/**
 * Get stat recommendations based on class
 */
export const getStatRecommendations = (characterClass: string): Record<string, number> => {
  const recommendations: Record<string, Record<string, number>> = {
    warrior: { STR: 4, CON: 3, DEX: 1, INT: 0, WIS: 1, CHA: 1 },
    archer: { DEX: 4, STR: 2, CON: 1, INT: 1, WIS: 1, CHA: 1 },
    mage: { INT: 4, WIS: 2, CON: 1, STR: 0, DEX: 1, CHA: 1 },
    priest: { WIS: 4, CHA: 2, INT: 1, CON: 1, STR: 0, DEX: 1 },
  };

  return recommendations[characterClass] || {};
};

/**
 * Validate character level is within Episode 3 range
 */
export const isValidLevel = (level: number): boolean => {
  return level >= 1 && level <= EPISODE_3_CONFIG.MAX_LEVEL;
};

/**
 * Calculate total stats used
 */
export const calculateTotalStats = (stats: Character['stats']): number => {
  return Object.values(stats).reduce((a, b) => a + b, 0);
};
