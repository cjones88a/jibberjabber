import { MobileLayout } from '@/components/layout/MobileLayout';
import { Character } from '@/components/characters/Character';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';

const levels = [
  { id: 1, letter: 'A', unlocked: true, stars: 3 },
  { id: 2, letter: 'B', unlocked: true, stars: 2 },
  { id: 3, letter: 'C', unlocked: true, stars: 0 },
  { id: 4, letter: 'D', unlocked: false, stars: 0 },
  { id: 5, letter: 'E', unlocked: false, stars: 0 },
  { id: 6, letter: 'F', unlocked: false, stars: 0 },
  { id: 7, letter: 'G', unlocked: false, stars: 0 },
  { id: 8, letter: 'H', unlocked: false, stars: 0 },
  { id: 9, letter: 'I', unlocked: false, stars: 0 },
  { id: 10, letter: 'J', unlocked: false, stars: 0 },
];

function LevelBubble({ level, index }: { level: typeof levels[0], index: number }) {
  return (
    <motion.button
      className={`relative w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold
        ${level.unlocked 
          ? 'bg-primary text-primary-foreground hover:bg-primary-hover' 
          : 'bg-muted text-muted-foreground cursor-not-allowed'
        }`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      {level.letter}
      {level.stars > 0 && (
        <div className="absolute -top-2 -right-2 bg-[#FFD700] text-black rounded-full w-6 h-6 flex items-center justify-center text-sm">
          ⭐
        </div>
      )}
    </motion.button>
  );
}

export default function LevelSelect() {
  return (
    <MobileLayout className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">
          Choose a Level
        </h1>
        <div className="flex gap-2">
          <Badge variant="xp">
            150 XP
          </Badge>
          <Badge variant="streak">
            🔥 3
          </Badge>
        </div>
      </div>

      {/* Level path */}
      <div className="relative">
        {/* Path line */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-muted -translate-y-1/2 rounded-full" />
        
        {/* Level bubbles */}
        <div className="relative grid grid-cols-2 gap-8 max-w-xs mx-auto">
          {levels.map((level, index) => (
            <div key={level.id} className={`flex justify-center ${
              index % 2 === 0 ? '-translate-y-8' : 'translate-y-8'
            }`}>
              <LevelBubble level={level} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Helper character */}
      <div className="fixed bottom-6 right-6">
        <Character
          name="jabber"
          animation="bounce"
          speaking={true}
        />
      </div>
    </MobileLayout>
  );
} 