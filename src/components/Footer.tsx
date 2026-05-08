import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Send,
  ChevronRight,
  Heart,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

const quickLinks = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Tentang Kami', href: '#about' },
  { label: 'Menu Kami', href: '#menu' },
  { label: 'Pesan Online', href: 'https://wellthefood.com/' },
];

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/wellthefood', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/wellthefood', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/wellthefood', label: 'Twitter' },
];

const openingHours = [
  { day: 'Senin \u2013 Jumat', time: '10.00 \u2013 22.00' },
  { day: 'Sabtu', time: '09.00 \u2013 23.00' },
  { day: 'Minggu', time: '09.00 \u2013 22.00' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-50px' });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="footer" ref={footerRef} className="relative bg-charcoal text-white overflow-hidden">
      {/* Animated top wave */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-golden/50 to-transparent"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-40 h-40 rounded-full border border-white/5"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-32 h-32 rounded-full border border-golden/5"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative py-16 sm:py-20 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.div
                className="inline-flex items-center gap-2 text-golden text-sm font-semibold mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.span>
                Newsletter
              </motion.div>
              <motion.h3
                className="font-heading font-bold text-2xl sm:text-3xl mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                Tetap Terhubung
              </motion.h3>
              <motion.p
                className="text-white/60 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                Berlangganan newsletter kami untuk penawaran eksklusif, menu terbaru,
                dan kisah kuliner yang dikirim langsung ke kotak masuk Anda.
              </motion.p>
            </div>
            <motion.form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <div className="relative flex-1 group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-golden transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email Anda"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-golden/50 focus:ring-1 focus:ring-golden/50 transition-all"
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-golden rounded-full"
                  initial={{ width: 0 }}
                  whileFocus={{ width: '100%' }}
                />
              </div>
              <motion.button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-golden text-charcoal font-bold rounded-xl hover:bg-golden-light transition-colors shrink-0 interactive"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {subscribed ? (
                  <motion.span
                    className="flex items-center gap-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    <Heart className="w-5 h-5" />
                    Berlangganan!
                  </motion.span>
                ) : (
                  <>
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Send className="w-5 h-5" />
                    </motion.span>
                    Berlangganan
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand Column */}
            <motion.div
              className="sm:col-span-2 lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }} className="flex items-center gap-3 mb-6 group interactive">
                <motion.img
                  src="/logo.png"
                  alt="Well The Food"
                  className="h-12 w-12 object-contain"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div>
                  <span className="font-heading font-bold text-xl tracking-tight block">Well The Food</span>
                  <span className="text-xs text-leaf font-medium tracking-widest uppercase">Kuliner Modern</span>
                </div>
              </a>
              <motion.p
                className="text-white/60 text-sm leading-relaxed mb-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                Di mana bahan segar bertemu keahlian kuliner yang penuh gairah. Setiap
                hidangan menceritakan kisah kualitas, kreativitas, dan cinta untuk
                makanan yang lezat.
              </motion.p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="relative w-10 h-10 rounded-full bg-white/5 flex items-center justify-center interactive overflow-hidden"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setHoveredSocial(social.label)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <motion.div
                      className="absolute inset-0 bg-golden rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: hoveredSocial === social.label ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <social.icon className="w-5 h-5 relative z-10" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <h4 className="font-heading font-bold text-lg mb-6">Tautan Cepat</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.08 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }
                      }}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-2 text-white/60 hover:text-golden transition-colors duration-300 text-sm group interactive"
                    >
                      <motion.span
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -5 }}
                        whileHover={{ x: 0 }}
                      >
                        <ArrowUpRight className="w-3 h-3" />
                      </motion.span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Opening Hours */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <h4 className="font-heading font-bold text-lg mb-6">Jam Buka</h4>
              <ul className="space-y-4">
                {openingHours.map((item, i) => (
                  <motion.li
                    key={item.day}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                    >
                      <Clock className="w-5 h-5 text-golden shrink-0 mt-0.5" />
                    </motion.span>
                    <div>
                      <span className="text-white text-sm font-medium block">{item.day}</span>
                      <span className="text-white/60 text-sm">{item.time}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <h4 className="font-heading font-bold text-lg mb-6">Kunjungi Kami</h4>
              <ul className="space-y-4">
                {[
                  { icon: MapPin, content: 'Jl. Sudirman No. 123,\nJakarta Pusat, 10220\nIndonesia', href: null },
                  { icon: Phone, content: '+62 21 1234 5678', href: 'tel:+622112345678' },
                  { icon: Mail, content: 'hello@wellthefood.com', href: 'mailto:hello@wellthefood.com' },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
                    >
                      <item.icon className="w-5 h-5 text-golden shrink-0 mt-0.5" />
                    </motion.span>
                    {item.href ? (
                      <a href={item.href} className="text-white/60 hover:text-golden transition-colors text-sm interactive">
                        {item.content}
                      </a>
                    ) : (
                      <span className="text-white/60 text-sm leading-relaxed whitespace-pre-line">
                        {item.content}
                      </span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="border-t border-white/10 py-6"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
            >
              &copy; {new Date().getFullYear()} Well The Food. Hak cipta dilindungi.
            </motion.p>
            <motion.p
              className="flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.1 }}
            >
              Dibuat dengan
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-golden fill-golden" />
              </motion.span>
              di Bengkulu
            </motion.p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
