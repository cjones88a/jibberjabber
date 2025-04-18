# Jibber Jabber 🎨 ✏️ 🎮

A fun and interactive learning app designed to help kids master letter and number recognition through engaging exercises and games.

## Features

- 📚 Progressive learning modules for letters and numbers
- 🎯 Interactive exercises with immediate feedback
- 🏆 Achievement system to track progress
- 🎨 Kid-friendly, colorful interface
- 🔒 Secure user authentication
- 📊 Progress tracking

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma (SQLite)
- NextAuth.js
- Framer Motion (for animations)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cjones88a/jibberjabber.git
cd jibberjabber
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learning Modules

### Letters
- Uppercase and lowercase recognition
- Letter sounds
- Writing practice
- Word association

### Numbers
- Number recognition (0-9)
- Counting exercises
- Basic math concepts
- Number sequencing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
