# RAN Forge - RAN Online Episode 3 Stats & Skill Calculator

A responsive desktop and mobile-friendly calculator for RAN Online Episode 3, featuring real-time stat calculations and skill requirement analysis.

## Features

- **Character Stats Calculator**: Calculate and optimize character attributes (STR, DEX, INT, CON, WIS, CHA)
- **Skill Requirements Checker**: Verify if your character meets skill requirements (Episode 3 compatible)
- **Build Planner**: Create and compare different character builds
- **Episode 3 Support**: Optimized for Episode 3 with max level 157
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Instant calculations as you adjust stats

## Specifications

- **Episode**: 3
- **Max Level**: 157
- **Classes**: Warrior, Archer, Mage, Priest
- **Stat System**: STR, DEX, INT, CON, WIS, CHA

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Data**: JSON-based game data
- **Testing**: Vitest + React Testing Library

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

The app will be available at `http://localhost:5173`

## Project Structure

```
ran-forge/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Calculator/  # Main calculator components
│   │   └── Layout/      # Layout components
│   ├── data/            # Game data (skills, stats, classes)
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions & calculations
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── server/              # Backend API (Express)
│   ├── routes/          # API routes
│   └── index.ts         # Server entry point
├── tests/               # Test files
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Episode 3 Details

- Maximum Character Level: **157**
- Starting Stats Points: Allocated at character creation
- Stat Points per Level: 3 points
- Total Potential Stats: Varies by class and distribution

## Development

### Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Lint code

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## License

MIT
