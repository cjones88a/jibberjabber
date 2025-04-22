import { MobileLayout } from '@/components/layout/MobileLayout';
import { Character } from '@/components/characters/Character';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { motion } from 'framer-motion';

const activities = [
  { id: 1, name: 'Find the Letter', icon: '🔍' },
  { id: 2, name: 'Match Upper/Lower', icon: '🔤' },
  { id: 3, name: 'Trace the Letter', icon: '✏️' },
  { id: 4, name: 'Find the Word', icon: '📝' },
];

export default function LessonIntro({ params }: { params: { id: string } }) {
  return (
    <MobileLayout className="p-6">
      {/* Header */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">
          Let's Learn "{params.id}"!
        </h1>
        <p className="text-muted-foreground">
          Complete all activities to earn stars
        </p>
      </motion.div>

      {/* Character */}
      <motion.div 
        className="flex justify-center mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <Character
          name="jibber"
          animation="dance"
          speaking={true}
        />
      </motion.div>

      {/* Activities preview */}
      <Card className="mb-8">
        <div className="p-4 space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="flex items-center gap-4 p-3 rounded-xl bg-secondary/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-2xl">{activity.icon}</span>
              <span className="font-medium">{activity.name}</span>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">0/4</span>
        </div>
        <Progress value={0} />
      </div>

      {/* Action button */}
      <Button className="w-full" size="lg">
        Start Lesson
      </Button>
    </MobileLayout>
  );
} 