import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Truck, Phone, Clock, Zap, ChefHat, UtensilsCrossed } from 'lucide-react';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 30,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 30,
    });
  }, []);

  const features = [
    { icon: Clock, label: 'Pengantaran 30 Menit', desc: 'Hangat & segar sampai rumah' },
    { icon: Truck, label: 'Gratis Ongkir', desc: 'Untuk pemesanan di atas Rp 150K' },
    { icon: Phone, label: 'Pemesanan Mudah', desc: 'Online atau telepon kapan saja' },
  ];

  const floatingIcons = [
    { Icon: ChefHat, x: '10%', y: '20%', delay: 0 },
    { Icon: UtensilsCrossed, x: '85%', y: '15%', delay: 1 },
    { Icon: Zap, x: '15%', y: '75%', delay: 2 },
    { Icon: Truck, x: '80%', y: '70%', delay: 0.5 },
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/images/hero-food.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal/85" />
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${50 + mousePos.x}% ${50 + mousePos.y}%, rgba(45,90,61,0.4) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Animated pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="absolute text-white/10 pointer-events-none"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay,
          }}
        >
          <Icon className="w-12 h-12 sm:w-16 sm:h-16" />
        </motion.div>
      ))}

      {/* Large decorative circle */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-golden/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-leaf/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-golden/20 border border-golden/30 mb-8"
          >
            <motion.span
              animate={{ x: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Truck className="w-4 h-4 text-golden" />
            </motion.span>
            <span className="text-golden text-sm font-semibold tracking-wide">
              Pesan Langsung di Grab
            </span>
          </motion.div>

          {/* Headline */}
          <TextReveal
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6"
            delay={0.1}
            stagger={0.04}
          >
            Lagi Ngidam Sesuatu yang Lezat?
          </TextReveal>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Lewati antrean dan nikmati hidangan andalan kami dari kenyamanan rumah Anda.
            Segar, hangat, dan diantar dengan penuh perhatian — karena makanan enak
            harus sampai ke Anda.
          </motion.p>

          {/* CTA Buttons with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.a
              href="https://wellthefood.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-golden text-charcoal font-bold text-base rounded-full interactive"
              whileHover={{ scale: 1.05, y: -3, boxShadow: '0 20px 40px rgba(212,168,83,0.3)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <span>Pesan Sekarang</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.a>
            <motion.a
              href="tel:+622112345678"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold text-base rounded-full interactive"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Phone className="w-5 h-5" />
              </motion.span>
              Telepon untuk Pesan
            </motion.a>
          </motion.div>

          {/* Features with staggered animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.label}
                className="flex flex-col items-center text-center interactive"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.9 + i * 0.15, duration: 0.5, type: 'spring' }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-3"
                  whileHover={{ rotate: [0, -10, 10, 0], backgroundColor: 'rgba(212,168,83,0.2)' }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.span
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    <feature.icon className="w-6 h-6 text-golden" />
                  </motion.span>
                </motion.div>
                <span className="text-white font-semibold text-sm mb-1">{feature.label}</span>
                <span className="text-white/50 text-xs">{feature.desc}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
