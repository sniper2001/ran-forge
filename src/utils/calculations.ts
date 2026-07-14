import { Character, SkillRequirement, CalculationResult, EPISODE_3_CONFIG } from '@/types';

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
          `${stat}: ${currentValue}/${req.value} (need +${needed})`
        );
        recommendations.push(`Increase ${stat} by ${needed} point(s)`);
      }
    } else if (req.type === 'level') {
      if (character.level < req.value) {
        const needed = req.value - character.level;
        missingRequirements.push(
          `Level: ${character.level}/${req.value} (need +${needed})`
        );
        recommendations.push(`Level up ${needed} more time(s)`);
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

export const calculateAvailableStatPoints = (level: number, basePoints: number = 30): number => {
  const pointsFromLevel = (level - 1) * EPISODE_3_CONFIG.STAT_POINTS_PER_LEVEL;
  return basePoints + pointsFromLevel;
};

export const getMaxLevel = (): number => {
  return EPISODE_3_CONFIG.MAX_LEVEL;
};

export const getStatRecommendations = (characterClass: string): Record<string, number> => {
  const recommendations: Record<string, Record<string, number>> = {
    swordsman: { STR: 60, VIT: 40, DEX: 0, INT: 0 },
    archer: { DEX: 60, INT: 25, VIT: 15, STR: 0 },
    shaman: { INT: 60, DEX: 20, VIT: 20, STR: 0 },
    brawler: { STR: 50, DEX: 35, VIT: 15, INT: 0 },
  };

  return recommendations[characterClass] || {};
};

export const calculateTotalStats = (stats: Character['stats']): number => {
  return Object.values(stats).reduce((a, b) => a + b, 0);
};

export const isValidLevel = (level: number): boolean => {
  return level >= 1 && level <= EPISODE_3_CONFIG.MAX_LEVEL;
};
