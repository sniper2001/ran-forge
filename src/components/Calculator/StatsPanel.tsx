import { Character, CharacterStats, EPISODE_3_CONFIG } from '@/types';
import { getStatRecommendations, calculateAvailableStatPoints, calculateTotalStats } from '@/utils/calculations';

interface StatsPanelProps {
  character: Character;
  setCharacter: (char: Character) => void;
}

const STAT_KEYS: (keyof CharacterStats)[] = ['STR', 'DEX', 'INT', 'CON', 'WIS', 'CHA'];

export default function StatsPanel({ character, setCharacter }: StatsPanelProps) {
  const handleStatChange = (stat: keyof CharacterStats, value: number) => {
    setCharacter({
      ...character,
      stats: {
        ...character.stats,
        [stat]: Math.max(0, value),
      },
    });
  };

  const handleLevelChange = (value: number) => {
    const newLevel = Math.max(1, Math.min(value, EPISODE_3_CONFIG.MAX_LEVEL));
    setCharacter({ ...character, level: newLevel });
  };

  const recommendations = getStatRecommendations(character.class);
  const totalStats = calculateTotalStats(character.stats);
  const availablePoints = calculateAvailableStatPoints(character.level);
  const usedPoints = totalStats;
  const remainingPoints = availablePoints - usedPoints;

  return (
    <div className="space-y-6">
      {/* Character Info */}
      <div className="stat-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Character Name</label>
            <input
              type="text"
              value={character.name}
              onChange={(e) => setCharacter({ ...character, name: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Level (Max: {EPISODE_3_CONFIG.MAX_LEVEL})</label>
            <input
              type="number"
              value={character.level}
              onChange={(e) => handleLevelChange(parseInt(e.target.value) || 1)}
              min="1"
              max={EPISODE_3_CONFIG.MAX_LEVEL}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Class</label>
            <div className="input-field bg-ran-secondary cursor-not-allowed flex items-center">
              {character.class.charAt(0).toUpperCase() + character.class.slice(1)}
            </div>
          </div>
        </div>
      </div>

      {/* Stat Points Info */}
      <div className="stat-card">
        <h3 className="text-lg font-bold mb-4">Stat Points Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-ran-primary p-3 rounded-lg">
            <p className="text-sm text-gray-400">Available Points</p>
            <p className="text-2xl font-bold text-ran-accent">{availablePoints}</p>
          </div>
          <div className="bg-ran-primary p-3 rounded-lg">
            <p className="text-sm text-gray-400">Used Points</p>
            <p className="text-2xl font-bold text-blue-400">{usedPoints}</p>
          </div>
          <div className={`p-3 rounded-lg ${
            remainingPoints >= 0 ? 'bg-green-900' : 'bg-red-900'
          }`}>
            <p className="text-sm text-gray-400">Remaining</p>
            <p className="text-2xl font-bold">{remainingPoints}</p>
          </div>
          <div className="bg-ran-primary p-3 rounded-lg">
            <p className="text-sm text-gray-400">Points/Level</p>
            <p className="text-2xl font-bold text-yellow-400">{EPISODE_3_CONFIG.STAT_POINTS_PER_LEVEL}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stat-card">
        <h3 className="text-xl font-bold mb-4">Character Stats</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {STAT_KEYS.map((stat) => (
            <div key={stat} className="bg-ran-primary p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <label className="font-semibold text-ran-accent">{stat}</label>
                <span className="text-sm text-gray-400">Rec: {recommendations[stat] || 0}</span>
              </div>
              <input
                type="number"
                value={character.stats[stat]}
                onChange={(e) => handleStatChange(stat, parseInt(e.target.value) || 0)}
                className="input-field text-center"
              />
              <div className="text-xs text-gray-500 mt-1 text-center">Current: {character.stats[stat]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Episode 3 Info */}
      <div className="stat-card bg-blue-900 border-blue-500">
        <h4 className="font-bold text-blue-100 mb-2">Episode 3 Information</h4>
        <ul className="text-sm text-blue-100 space-y-1">
          <li>• Maximum Level: {EPISODE_3_CONFIG.MAX_LEVEL}</li>
          <li>• Stat Points Per Level: {EPISODE_3_CONFIG.STAT_POINTS_PER_LEVEL}</li>
          <li>• Total Possible Stats at Max Level: {calculateAvailableStatPoints(EPISODE_3_CONFIG.MAX_LEVEL)}</li>
        </ul>
      </div>
    </div>
  );
}
