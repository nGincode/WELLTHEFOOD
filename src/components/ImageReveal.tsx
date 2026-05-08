import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
}

export default function ImageReveal({
  src,
  alt,
  className = '',
  imgClassName = '',
  direction = 'left',
  delay = 0,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const clipPaths = {
    left: 'inset(0 100% 0 0)',
    right: 'inset(0 0 0 100%)',
    top: 'inset(100% 0 0 0)',
    bottom: 'inset(0 0 100% 0)',
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Reveal overlay */}
      <motion.div
        className="absolute inset-0 z-10 bg-leaf"
        initial={{ scaleX: 1, scaleY: 1 }}
        animate={isInView ? { scaleX: 0, scaleY: 0 } : { scaleX: 1, scaleY: 1 }}
        transition={{
          duration: 0.8,
          delay: delay + 0.3,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{
          transformOrigin:
            direction === 'left'
              ? 'right'
              : direction === 'right'
              ? 'left'
              : direction === 'top'
              ? 'bottom'
              : 'top',
        }}
      />

      {/* Image with clip-path reveal */}
      <motion.div
        className="w-full h-full"
        initial={{ clipPath: clipPaths[direction] }}
        animate={isInView ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: clipPaths[direction] }}
        transition={{
          duration: 1,
          delay,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      </motion.div>
    </div>
  );
}
