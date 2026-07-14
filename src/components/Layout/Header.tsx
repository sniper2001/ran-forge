import { EPISODE_3_CONFIG } from '@/types';

export default function Header() {
  return (
    <header className="bg-ran-secondary border-b border-ran-accent">
      <div className="container py-6">
        <h1 className="text-3xl font-bold text-ran-accent">⚔️ RAN Forge</h1>
        <p className="text-gray-400 mt-2">Episode {EPISODE_3_CONFIG.EPISODE} Stats & Skill Calculator | Max Level {EPISODE_3_CONFIG.MAX_LEVEL}</p>
      </div>
    </header>
  );
}
