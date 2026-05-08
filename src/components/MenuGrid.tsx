import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ShoppingBag, Eye, X, Sparkles } from 'lucide-react';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  rating: number;
  category: string;
  tags: string[];
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'WTF Signature Burger',
    description: 'Daging sapi premium, cheddar tua, bawang bombay karamel, truffle aioli, roti brioche. Bestseller kami sejak hari pertama.',
    price: 'Rp 85.000',
    image: '/images/menu-burger.jpg',
    rating: 4.9,
    category: 'Utama',
    tags: ['Bestseller', 'Pilihan Chef'],
  },
  {
    id: 2,
    name: 'Garden Fresh Bowl',
    description: 'Campuran sayuran hijau, quinoa, alpukat, tomat ceri, feta, vinaigrette lemon-herb. Pelangi nutrisi dalam satu mangkuk.',
    price: 'Rp 65.000',
    image: '/images/menu-salad.jpg',
    rating: 4.7,
    category: 'Sehat',
    tags: ['Vegetarian', 'Rendah Kalori'],
  },
  {
    id: 3,
    name: 'Creamy Truffle Pasta',
    description: 'Fettuccine gulung tangan, jamur liar, krim truffle hitam, parmesan renyah. Kenikmatan murni.',
    price: 'Rp 95.000',
    image: '/images/menu-pasta.jpg',
    rating: 4.8,
    category: 'Utama',
    tags: ['Premium'],
  },
  {
    id: 4,
    name: 'Grilled Ribeye Steak',
    description: 'Ribeye prime 300g, mentega herba, kentang panggang bawang putih, sayuran musiman. Dimasak sempurna.',
    price: 'Rp 185.000',
    image: '/images/menu-steak.jpg',
    rating: 4.9,
    category: 'Premium',
    tags: ['Premium', 'Pilihan Chef'],
  },
  {
    id: 5,
    name: 'Street-Style Tacos',
    description: 'Tiga tortilla lembut, daging sapi rebus perlahan, bawang bombay acar, crema cilantro-lime, salsa verde segar.',
    price: 'Rp 75.000',
    image: '/images/menu-tacos.jpg',
    rating: 4.6,
    category: 'Utama',
    tags: ['Pedas'],
  },
  {
    id: 6,
    name: 'Molten Lava Cake',
    description: 'Fondant cokelat gelap, es krim vanilla bean, coulis raspberry, daun emas edible. Penutup megah.',
    price: 'Rp 55.000',
    image: '/images/menu-dessert.jpg',
    rating: 4.9,
    category: 'Penutup',
    tags: ['Bestseller'],
  },
];

const categories = ['Semua', 'Utama', 'Sehat', 'Premium', 'Penutup'];

// 3D Tilt Card Component
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

export default function MenuGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const filteredItems =
    activeCategory === 'Semua'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.menu-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, scale: 0.9, rotateX: -10 },
          {
            opacity: 1, y: 0, scale: 1, rotateX: 0,
            duration: 0.9, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="menu" ref={sectionRef} className="relative py-24 sm:py-32 bg-cream-dark overflow-hidden">
        {/* Animated background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-leaf/3 rounded-full blur-3xl"
          style={{ animation: 'float-slow 10s ease-in-out infinite' }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 border border-golden/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-24 h-24 border border-leaf/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-leaf font-semibold text-sm tracking-widest uppercase mb-4"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.span>
              Menu Kami
            </motion.span>

            <TextReveal
              className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal leading-tight mb-4"
              delay={0.1}
              stagger={0.03}
            >
              Hidangan Andalan yang Akan Bikin Kamu Jatuh Cinta
            </TextReveal>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-warm-gray text-lg max-w-2xl mx-auto"
            >
              Setiap hidangan adalah sebuah mahakarya, dibuat dengan penuh gairah dan bahan terbaik.
            </motion.p>
          </div>

          {/* Category Filter with enhanced animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            {categories.map((cat, i) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 interactive ${
                  activeCategory === cat
                    ? 'bg-leaf text-white shadow-lg shadow-leaf/25'
                    : 'bg-white text-charcoal/70 hover:bg-leaf/10 hover:text-leaf'
                }`}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-leaf rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Menu Grid with 3D tilt cards */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: 1000 }}>
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -30 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="menu-card"
                >
                  <TiltCard>
                    <div
                      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-charcoal/10 transition-shadow duration-500 interactive spotlight"
                      onMouseEnter={() => setHoveredCard(item.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <motion.img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          animate={{
                            scale: hoveredCard === item.id ? 1.12 : 1,
                          }}
                          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredCard === item.id ? 1 : 0 }}
                          transition={{ duration: 0.4 }}
                        />

                        {/* Shimmer overlay on hover */}
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 55%, transparent 60%)',
                            backgroundSize: '200% 100%',
                          }}
                          animate={{
                            backgroundPosition: hoveredCard === item.id ? ['200% 0', '-200% 0'] : '200% 0',
                          }}
                          transition={{ duration: 1.2, ease: 'easeInOut' }}
                        />

                        {/* Tags */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <motion.span
                              key={tag}
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                tag === 'Bestseller'
                                  ? 'bg-golden text-charcoal'
                                  : tag === 'Pilihan Chef'
                                  ? 'bg-leaf text-white'
                                  : 'bg-white/90 text-charcoal'
                              }`}
                              initial={{ opacity: 0, scale: 0.8, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>

                        {/* Hover overlay buttons */}
                        <motion.div
                          className="absolute bottom-4 left-4 right-4 flex gap-2"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{
                            y: hoveredCard === item.id ? 0 : 20,
                            opacity: hoveredCard === item.id ? 1 : 0,
                          }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                        >
                          <motion.button
                            onClick={() => setSelectedItem(item)}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/95 text-charcoal text-sm font-semibold rounded-xl backdrop-blur-sm interactive"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Eye className="w-4 h-4" />
                            Detail
                          </motion.button>
                          <motion.a
                            href="https://wellthefood.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-leaf text-white text-sm font-semibold rounded-xl interactive"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ShoppingBag className="w-4 h-4" />
                            Pesan
                          </motion.a>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <motion.h3
                            className="font-heading font-bold text-lg text-charcoal transition-colors duration-300"
                            animate={{ color: hoveredCard === item.id ? '#2D5A3D' : '#1A1A1A' }}
                          >
                            {item.name}
                          </motion.h3>
                          <motion.span
                            className="inline-flex items-center gap-1 px-2 py-1 bg-golden/10 rounded-lg"
                            whileHover={{ scale: 1.1 }}
                          >
                            <motion.span
                              animate={{ rotate: [0, 15, -15, 0] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            >
                              <Star className="w-3.5 h-3.5 text-golden fill-golden" />
                            </motion.span>
                            <span className="text-xs font-bold text-charcoal">{item.rating}</span>
                          </motion.span>
                        </div>
                        <p className="text-sm text-warm-gray leading-relaxed line-clamp-2 mb-3">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <motion.span
                            className="font-heading font-bold text-xl text-leaf"
                            animate={{ scale: hoveredCard === item.id ? 1.05 : 1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            {item.price}
                          </motion.span>
                          <span className="text-xs text-warm-gray-light uppercase tracking-wider">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* View Full Menu */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <motion.a
              href="https://wellthefood.com/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-leaf text-leaf font-semibold rounded-full interactive"
              whileHover={{ scale: 1.05, backgroundColor: '#2D5A3D', color: '#ffffff' }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              Lihat Menu Lengkap
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <ShoppingBag className="w-5 h-5" />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50, rotateX: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl"
              style={{ perspective: 1000 }}
            >
              <motion.button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-lg interactive"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-charcoal" />
              </motion.button>

              <motion.div
                className="h-64 overflow-hidden"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
              </motion.div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <motion.h3
                    className="font-heading font-bold text-2xl text-charcoal"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedItem.name}
                  </motion.h3>
                  <motion.span
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-golden/10 rounded-lg shrink-0"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                  >
                    <Star className="w-4 h-4 text-golden fill-golden" />
                    <span className="text-sm font-bold text-charcoal">{selectedItem.rating}</span>
                  </motion.span>
                </div>

                <motion.p
                  className="text-warm-gray leading-relaxed mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedItem.description}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {selectedItem.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-cream-dark text-charcoal"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="font-heading font-bold text-2xl text-leaf">
                    {selectedItem.price}
                  </span>
                  <motion.a
                    href="https://wellthefood.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-leaf text-white font-semibold rounded-full interactive"
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(45,90,61,0.3)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Pesan Sekarang
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
