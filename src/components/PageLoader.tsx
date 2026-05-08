import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center"
        >
          {/* Logo animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative mb-8"
          >
            <motion.img
              src="/logo.png"
              alt="Well The Food"
              className="h-24 w-24 object-contain"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Ripple rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-leaf/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center"
          >
            <h2 className="font-heading font-bold text-2xl text-charcoal mb-2">
              Well The Food
            </h2>
            <p className="text-warm-gray text-sm tracking-widest uppercase">
              Everyday food spot you’ll love
            </p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="h-0.5 bg-gradient-to-r from-leaf via-golden to-leaf rounded-full mt-8"
          />

          {/* Exit wipe */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ delay: 1.6, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-leaf origin-bottom"
            style={{ zIndex: -1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
