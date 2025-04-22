import { MobileLayout } from '@/components/layout/MobileLayout';
import { Character } from '@/components/characters/Character';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';

// Confetti animation component
function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary rounded-full"
          initial={{
            top: "50%",
            left: "50%",
            scale: 0,
          }}
          animate={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.02,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      ))}
    </div>
  );
}

export default function LessonComplete({ params }: { params: { id: string } }) {
  return (
    <MobileLayout className="p-6">
      <Confetti />

      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">
          Perfect Lesson!
        </h1>
        <p className="text-muted-foreground">
          You've mastered the letter "{params.id}"
        </p>
      </motion.div>

      {/* Characters celebration */}
      <div className="flex justify-center gap-8 mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <Character 
            name="jibber" 
            animation="dance"
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <Character 
            name="jabber" 
            animation="jump"
          />
        </motion.div>
      </div>

      {/* Rewards */}
      <motion.div 
        className="flex justify-center gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Badge variant="xp" className="text-lg px-4 py-2">
          +15 XP
        </Badge>
        <Badge variant="streak" className="text-lg px-4 py-2">
          🔥 3 Day Streak
        </Badge>
      </motion.div>

      {/* Stars earned */}
      <motion.div 
        className="flex justify-center gap-4 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[1, 2, 3].map((star, index) => (
          <motion.div
            key={star}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.8 + index * 0.2 }}
          >
            <span className="text-5xl">⭐</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Action buttons */}
      <div className="space-y-4">
        <Button className="w-full" size="lg">
          Next Letter
        </Button>
        <Button variant="outline" className="w-full" size="lg">
          Back to Map
        </Button>
      </div>
    </MobileLayout>
  );
} 