import { MobileLayout } from '@/components/layout/MobileLayout';
import { Character } from '@/components/characters/Character';
import { Button } from '@/components/ui/Button';
import { MotionDiv } from '@/components/motion';

export default function WelcomeScreen() {
  return (
    <MobileLayout className="items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/10 rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Logo and title */}
      <MotionDiv 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold mb-2">
          JibberJabber
        </h1>
        <p className="text-muted-foreground">
          Learning made fun!
        </p>
      </MotionDiv>

      {/* Characters */}
      <div className="flex justify-center gap-8 mb-16">
        <MotionDiv
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Character 
            name="jibber" 
            animation="wave" 
            speaking={true}
          />
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Character 
            name="jabber" 
            animation="bounce"
          />
        </MotionDiv>
      </div>

      {/* Action button */}
      <MotionDiv
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Button 
          className="w-full text-lg"
          size="lg"
        >
          Let's Go!
        </Button>
      </MotionDiv>
    </MobileLayout>
  );
}
