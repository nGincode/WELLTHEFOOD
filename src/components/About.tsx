import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Leaf, Flame, Award, Sparkles } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import ImageReveal from './ImageReveal';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Leaf,
    title: 'Segar dari Peternakan',
    desc: 'Kami mendapatkan bahan-bahan segar setiap hari dari petani lokal dan pemasok terpercaya.',
    color: 'bg-leaf/10',
    hoverColor: 'bg-leaf',
  },
  {
    icon: Heart,
    title: 'Dibuat dengan Cinta',
    desc: 'Setiap hidangan dibuat dengan penuh gairah dan perhatian terhadap detail.',
    color: 'bg-rose-50',
    hoverColor: 'bg-rose-500',
  },
  {
    icon: Flame,
    title: 'Rasa Berani',
    desc: 'Teknik modern bertemu resep klasik untuk cita rasa yang tak terlupakan.',
    color: 'bg-orange-50',
    hoverColor: 'bg-orange-500',
  },
  {
    icon: Award,
    title: 'Kualitas Utama',
    desc: 'Bahan premium, eksekusi presisi, tanpa kompromi.',
    color: 'bg-golden/10',
    hoverColor: 'bg-golden',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, x: -100 },
          {
            opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 sm:py-32 bg-cream overflow-hidden">
      {/* Floating decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-0 w-96 h-96 bg-leaf/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 left-0 w-72 h-72 bg-golden/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        {/* Small floating dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 30}%`,
              backgroundColor: i % 2 === 0 ? 'rgba(45,90,61,0.1)' : 'rgba(212,168,83,0.15)',
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, -5, 0],
              scale: [1, 1.3, 0.8, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.7,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          {/* Text */}
          <div ref={textRef}>
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-leaf font-semibold text-sm tracking-widest uppercase mb-4"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.span>
              Filosofi Kami
            </motion.span>

            <TextReveal
              className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal leading-tight mb-6"
              delay={0.2}
              stagger={0.04}
            >
              Kami Percaya Makanan Enak Berawal dari Bahan Berkualitas
            </TextReveal>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-warm-gray text-lg leading-relaxed mb-6"
            >
              Di Well The Food, kami tidak sekadar memasak — kami menciptakan
              pengalaman. Perjalanan kami dimulai dengan keyakinan sederhana:
              setiap santapan harus menjadi perayaan rasa, kesegaran, dan
              keahlian.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-warm-gray leading-relaxed mb-8"
            >
              Dari sayuran yang dipilih langsung dari petani hingga protein
              premium, kami memperhatikan setiap detail. Para koki kami
              memadukan teknik kuliner modern dengan resep klasik, menciptakan
              hidangan yang mengejutkan dan menyenangkan di setiap gigitan.
              Baik Anda datang untuk makan siang cepat atau makan malam santai,
              kami menjanjikan pengalaman yang patut dinikmati.
            </motion.p>

            {/* Stats with animated counters */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-6"
            >
              {[
                { end: 5, suffix: '+', label: 'Tahun Keunggulan' },
                { end: 50, suffix: '+', label: 'Hidangan Andalan' },
                { end: 10, suffix: 'K+', label: 'Pelanggan Bahagia' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center group interactive"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="block font-heading font-bold text-3xl text-leaf">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={2000 + i * 300} />
                  </span>
                  <span className="text-sm text-warm-gray">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Image with reveal animation */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <ImageReveal
              src="/images/about-interior.jpg"
              alt="Interior restoran Well The Food"
              className="rounded-3xl shadow-2xl shadow-charcoal/10"
              imgClassName="h-[500px]"
              direction="right"
              delay={0.2}
            />

            {/* Floating card with bounce */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl shadow-charcoal/10 max-w-[220px] interactive"
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 1, duration: 0.6, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  className="w-10 h-10 rounded-full bg-leaf/10 flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Award className="w-5 h-5 text-leaf" />
                </motion.div>
                <span className="font-heading font-bold text-charcoal">Terbaik</span>
              </div>
              <p className="text-sm text-warm-gray">
                Konsisten mendapat rating 4.8+ dari pelanggan setia kami.
              </p>
            </motion.div>

            {/* Secondary floating element */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-golden/20 flex items-center justify-center"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="w-6 h-6 text-golden" />
            </motion.div>
          </motion.div>
        </div>

        {/* Values Grid with enhanced hover */}
        <div ref={valuesRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              className="value-card group p-6 rounded-2xl bg-white border border-charcoal/5 hover:border-leaf/20 hover:shadow-lg hover:shadow-leaf/5 transition-all duration-500 interactive spotlight"
              initial={{ opacity: 0, y: 60, rotateX: -15 }}
              animate={valuesInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: 'easeOut' }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className={`w-12 h-12 rounded-xl ${value.color} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <value.icon className="w-6 h-6 text-leaf group-hover:text-white transition-colors duration-300" />
              </motion.div>
              <h3 className="font-heading font-bold text-lg text-charcoal mb-2 group-hover:text-leaf transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-sm text-warm-gray leading-relaxed">{value.desc}</p>

              {/* Hover line animation */}
              <motion.div
                className="mt-4 h-0.5 bg-gradient-to-r from-leaf to-golden rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
