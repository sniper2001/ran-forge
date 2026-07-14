import { useState } from 'react';
import { Character, EPISODE_3_CONFIG } from '@/types';
import Calculator from '@/components/Calculator/Calculator';
import Header from '@/components/Layout/Header';
import classes from '@/data/classes.json';
import skills from '@/data/skills.json';

function App() {
  const [selectedClass, setSelectedClass] = useState('warrior');
  const [character, setCharacter] = useState<Character>({
    id: '1',
    name: 'New Adventurer',
    class: 'warrior',
    level: 1,
    stats: {
      STR: 10,
      DEX: 6,
      INT: 3,
      CON: 9,
      WIS: 5,
      CHA: 4,
    },
    skills: [],
    availableStatPoints: 0,
  });

  return (
    <div className="min-h-screen bg-ran-primary">
      <Header />
      <main className="container py-8">
        {/* Episode Info Bar */}
        <div className="bg-gradient-to-r from-ran-accent to-red-600 p-4 rounded-lg mb-6 text-white font-semibold">
          <span>⚔️ Episode {EPISODE_3_CONFIG.EPISODE}</span> • 
          <span className="ml-2">Max Level: {EPISODE_3_CONFIG.MAX_LEVEL}</span> • 
          <span className="ml-2">Stat Points/Level: {EPISODE_3_CONFIG.STAT_POINTS_PER_LEVEL}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Class Selection */}
          <div className="md:col-span-1">
            <div className="stat-card">
              <h2 className="text-xl font-bold mb-4">Select Class</h2>
              <div className="space-y-2">
                {classes.classes.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedClass(c.id);
                      setCharacter(prev => ({ ...prev, class: c.id }));
                    }}
                    className={`w-full p-2 rounded-lg text-left transition-all ${
                      character.class === c.id
                        ? 'bg-ran-accent text-white'
                        : 'bg-ran-primary hover:bg-ran-secondary'
                    }`}
                  >
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-sm opacity-75">{c.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Calculator */}
          <div className="md:col-span-2">
            <Calculator character={character} setCharacter={setCharacter} skills={skills.skills} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
