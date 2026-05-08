import { motion } from 'framer-motion';

interface Shape {
  type: 'circle' | 'square' | 'triangle';
  size: number;
  x: string;
  y: string;
  color: string;
  duration: number;
  delay: number;
}

interface FloatingShapesProps {
  shapes: Shape[];
  className?: string;
}

export default function FloatingShapes({ shapes, className = '' }: FloatingShapesProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        >
          {shape.type === 'circle' && (
            <div
              className="w-full h-full rounded-full"
              style={{ backgroundColor: shape.color }}
            />
          )}
          {shape.type === 'square' && (
            <div
              className="w-full h-full rounded-lg rotate-45"
              style={{ backgroundColor: shape.color }}
            />
          )}
          {shape.type === 'triangle' && (
            <div
              className="w-0 h-0"
              style={{
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid ${shape.color}`,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
