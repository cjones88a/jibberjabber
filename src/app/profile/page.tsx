import { MobileLayout } from '@/components/layout/MobileLayout';
import { Character } from '@/components/characters/Character';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

const avatarOptions = [
  { emoji: '🐶', name: 'Dog' },
  { emoji: '🐱', name: 'Cat' },
  { emoji: '🐰', name: 'Rabbit' },
  { emoji: '🐼', name: 'Panda' },
  { emoji: '🦁', name: 'Lion' },
  { emoji: '🐸', name: 'Frog' },
  { emoji: '🦊', name: 'Fox' },
  { emoji: '🦉', name: 'Owl' },
];

export default function ProfileScreen() {
  return (
    <MobileLayout className="p-6">
      {/* Header */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-2">
          Create Your Profile
        </h1>
        <p className="text-muted-foreground">
          Choose your favorite animal friend!
        </p>
      </motion.div>

      {/* Avatar selection */}
      <Card className="mb-8">
        <div className="grid grid-cols-4 gap-4 p-4">
          {avatarOptions.map((avatar, index) => (
            <motion.button
              key={avatar.name}
              className="aspect-square rounded-xl bg-secondary/20 flex items-center justify-center text-3xl hover:bg-secondary/30 transition-colors"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {avatar.emoji}
            </motion.button>
          ))}
        </div>
      </Card>

      {/* Name input */}
      <Card className="mb-8">
        <div className="p-4">
          <label className="block text-sm font-medium mb-2">
            Your Name
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter your name"
            maxLength={20}
          />
        </div>
      </Card>

      {/* Helper character */}
      <div className="flex justify-center mb-8">
        <Character
          name="jibber"
          animation="bounce"
          speaking={true}
        />
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-4">
        <Button size="lg">
          Start Learning!
        </Button>
        <Button 
          variant="ghost"
          size="lg"
        >
          Skip for Now
        </Button>
      </div>
    </MobileLayout>
  );
} 