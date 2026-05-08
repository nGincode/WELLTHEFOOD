import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Clock, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Text scramble effect
function useTextScramble(text: string, trigger: boolean, speed = 30) {
  const [display, setDisplay] = useState('');
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) return text[index];
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, speed);
    return () => clearInterval(interval);
  }, [text, trigger, speed]);

  return display || text;
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrambleTrigger, setScrambleTrigger] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const scrambledHeadline = useTextScramble(
    'Rasakan Kelezatan, Di Setiap Gigitan!',
    scrambleTrigger
  );

  useEffect(() => {
    const timer = setTimeout(() => setScrambleTrigger(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: 150,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  // Mouse parallax for floating elements
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        ref={imageRef}
        className="absolute inset-0 -top-20 -bottom-20"
        style={{ scale }}
      >
        <img
          src="/images/hero-food.jpg"
          alt="Hidangan gourmet"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" />
        {/* Animated grain overlay */}
        <div className="absolute inset-0 opacity-[0.04] grain-overlay" />
      </motion.div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${8 + i * 12}%`,
              top: `${10 + (i % 4) * 22}%`,
              x: mousePos.x * (0.5 + i * 0.1),
              y: mousePos.y * (0.5 + i * 0.1),
            }}
            animate={{
              y: [0, -40, 0, 20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          >
            <div
              className={`${i % 3 === 0
                  ? 'w-3 h-3 rounded-full bg-golden/40'
                  : i % 3 === 1
                    ? 'w-4 h-4 border border-leaf/30 rotate-45'
                    : 'w-2 h-2 bg-white/20 rounded-sm'
                }`}
            />
          </motion.div>
        ))}
      </div>

      {/* Large decorative circles */}
      <motion.div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-golden/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute -bottom-60 -left-60 w-[600px] h-[600px] rounded-full border border-leaf/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      />

      {/* Content */}
      <motion.div
        ref={contentRef}
        style={{ opacity, y }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 interactive"
        >
          <motion.span
            className="w-2.5 h-2.5 rounded-full bg-golden"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-white/90 text-sm font-medium tracking-wide">
            Buka untuk Dine-In & Delivery
          </span>
        </motion.div>

        {/* Headline with scramble effect */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight mb-6"
        >
          <span className="block">{scrambledHeadline.split(',')[0]},</span>
          <motion.span
            className="block text-golden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.2, duration: 0.8 }}
          >
            {scrambledHeadline.split(',')[1] || 'Di Setiap Gigitan!'}
          </motion.span>
        </motion.h1>

        {/* Subtitle with word-by-word reveal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 3.4 }}
          className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {'Di mana bahan segar bertemu keahlian kuliner yang penuh gairah. Nikmati seni kuliner modern dalam setiap hidangan yang kami ciptakan.'
            .split(' ')
            .map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.3em]"
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 3.4 + i * 0.04, duration: 0.4 }}
              >
                {word}
              </motion.span>
            ))}
        </motion.p>

        {/* CTAs with magnetic hover */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.a
            href="https://wellthefood.com/menu"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-golden text-charcoal font-bold text-base rounded-full interactive"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <span>Jelajahi Menu Kami</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </motion.a>
          <motion.a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold text-base rounded-full interactive"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
          >
            Cerita Kami
          </motion.a>
        </motion.div>

        {/* Info badges with stagger */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2 }}
          className="flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm"
        >
          {[
            { icon: MapPin, text: 'Bengkulu' },
            { icon: Clock, text: 'Buka 10.00 \u2013 22.00' },
          ].map((item, i) => (
            <motion.span
              key={item.text}
              className="inline-flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.2 + i * 0.15 }}
              whileHover={{ scale: 1.1, color: '#D4A853' }}
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              >
                <item.icon className="w-4 h-4 text-golden" />
              </motion.span>
              {item.text}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator with enhanced animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 interactive"
        >
          <span className="text-white/40 text-xs tracking-widest uppercase">Gulir</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ opacity: [1, 0.3, 1], y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-golden"
            />
          </div>
          <ChevronDown className="w-4 h-4 text-white/30" />
        </motion.div>
      </motion.div>

      {/* Side decorative lines */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: '120px' }}
        transition={{ delay: 4.5, duration: 1, ease: 'easeOut' }}
        className="absolute left-8 bottom-0 w-px bg-gradient-to-t from-golden/50 to-transparent hidden lg:block"
      />
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: '120px' }}
        transition={{ delay: 4.7, duration: 1, ease: 'easeOut' }}
        className="absolute right-8 bottom-0 w-px bg-gradient-to-t from-leaf/50 to-transparent hidden lg:block"
      />
    </section>
  );
}
