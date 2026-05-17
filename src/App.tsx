import React, { useState, useEffect } from 'react';
import { 
  Plane, Compass, Map, Camera, Car, Star, Navigation, 
  CheckCircle2, MessageCircle, Heart, Instagram, Facebook, 
  Linkedin, Youtube, Menu, X, ChevronRight, Send, Smartphone,
  ImageIcon, Trash2, Maximize2, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrazilMap } from './components/BrazilMap';
import { 
  TourismSpotsModal, ServiceSelectionModal, 
  PhotographersModal, DriversModal, AuthModal 
} from './components/Modals';
import { statesData, testimonials } from './data';

export default function App() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [isSpotsModalOpen, setIsSpotsModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ type: 'login' | 'photo' | 'driver', isOpen: boolean }>({ type: 'login', isOpen: false });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ratingSuccess, setRatingSuccess] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && selectedPhotos.length < 5) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPhotos(prev => [...prev, reader.result as string].slice(0, 5));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number) => {
    setSelectedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStateClick = (id: string) => {
    setSelectedState(id);
    setIsSpotsModalOpen(true);
  };

  const handleConfirmSpots = (spots: string[]) => {
    setIsSpotsModalOpen(false);
    setTimeout(() => setIsServiceModalOpen(true), 300);
  };

  const handleServiceSelect = (service: 'photo' | 'driver' | 'both') => {
    setIsServiceModalOpen(false);
    setTimeout(() => {
      if (service === 'photo') setIsPhotoModalOpen(true);
      if (service === 'driver') setIsDriverModalOpen(true);
      if (service === 'both') {
        setIsPhotoModalOpen(true);
        // Sequential modal opening might be better handled by a queue, but here we just open the primary one
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-brand-green p-1.5 md:p-2 rounded-xl text-white">
              <Plane size={scrolled ? 20 : 24} />
            </div>
            <span className={`text-lg md:text-xl font-bold ${scrolled ? 'text-brand-green' : 'text-white'}`}>Explore BR</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {['Início', 'Destinos', 'Avaliações'].map(item => (
              <a key={`nav-item-${item}`} href={`#${item.toLowerCase()}`} className={`${scrolled ? 'text-gray-600' : 'text-white/90'} hover:text-brand-yellow transition-colors`}>{item}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => setAuthModal({ type: 'login', isOpen: true })}
              className={`hidden lg:block px-5 py-2 rounded-full border-2 text-sm font-bold transition-all ${scrolled ? 'border-brand-green text-brand-green hover:bg-brand-green hover:text-white' : 'border-white text-white hover:bg-white hover:text-brand-green'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setAuthModal({ type: 'photo', isOpen: true })}
              className="bg-brand-yellow text-brand-blue px-3 md:px-4 py-2 rounded-lg text-[10px] md:text-xs font-bold shadow-md hover:scale-105 transition-transform"
            >
              Fotógrafo
            </button>
            <button 
              onClick={() => setAuthModal({ type: 'driver', isOpen: true })}
              className="bg-brand-blue text-white px-3 md:px-4 py-2 rounded-lg text-[10px] md:text-xs font-bold shadow-md hover:scale-105 transition-transform"
            >
              Motorista
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-gray-600' : 'text-white'}`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {['Início', 'Destinos', 'Avaliações'].map(item => (
                  <a 
                    key={`mobile-nav-${item}`} 
                    href={`#${item.toLowerCase()}`} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-800 text-lg font-bold"
                  >
                    {item}
                  </a>
                ))}
                <button 
                  onClick={() => { setAuthModal({ type: 'login', isOpen: true }); setMobileMenuOpen(false); }}
                  className="w-full py-4 border-2 border-brand-green text-brand-green rounded-2xl font-bold"
                >
                  Entrar na Conta
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="início" className="gradient-hero min-h-screen flex items-center pt-28 pb-20 md:pt-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white z-10 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Descubra o Brasil que você ainda não conhece
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg mx-auto md:mx-0">
              Escolha seu destino, conte com fotógrafos e motoristas locais, e crie memórias inesquecíveis.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 items-center justify-center md:justify-start">
              <a 
                href="#mapa" 
                className="w-full sm:w-auto bg-brand-yellow text-brand-blue flex items-center justify-center gap-3 font-extrabold py-4 px-10 rounded-full text-base shadow-xl shadow-brand-yellow/20 hover:shadow-brand-yellow/40 hover:-translate-y-1 transition-all active:scale-95 animate-float group"
              >
                Explorar Agora
                <Compass size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              </a>
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <div className="flex items-center justify-center sm:justify-start gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm">
                  <CheckCircle2 size={16} className="text-brand-yellow" />
                  <span>+500 Destinos</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm">
                  <Camera size={16} className="text-brand-yellow" />
                  <span>Equipe Profissional</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative grid grid-cols-2 gap-3 md:gap-4"
          >
            <div className="relative group overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl transform scale-95 hover:scale-105 transition-transform">
              <img 
                src="https://i.postimg.cc/fkn09Wsg/alogoas.png" 
                alt="Alagoas" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
                <span className="text-[10px] md:text-xs font-bold text-white tracking-wider">Alagoas</span>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl mt-4 md:mt-8 transform hover:scale-105 transition-transform">
              <img 
                src="https://i.postimg.cc/PqRbqjCW/balneario.png" 
                alt="Balneário Camboriú" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
                <span className="text-[10px] md:text-xs font-bold text-white tracking-wider">Balneário Camboriú</span>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl mt-2 md:mt-4 transform hover:scale-105 transition-transform">
              <img 
                src="https://i.postimg.cc/hGBW3k4n/Rio-de-janeiro.png" 
                alt="Rio de Janeiro" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
                <span className="text-[10px] md:text-xs font-bold text-white tracking-wider">Rio de Janeiro</span>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl transform hover:scale-105 transition-transform">
              <img 
                src="https://i.postimg.cc/sxcvvYTL/Florianopolis.png" 
                alt="Florianópolis" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
                <span className="text-[10px] md:text-xs font-bold text-white tracking-wider">Florianópolis</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">Como funciona?</h2>
          <div className="w-20 h-1.5 bg-brand-yellow mx-auto rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: <Map className="text-brand-green" size={40} />, title: "Escolha seu destino", text: "Clique no estado e descubra pontos turísticos incríveis." },
            { icon: <Camera className="text-brand-blue" size={40} />, title: "Escolha seus serviços", text: "Fotógrafo, motorista ou ambos para sua conveniência." },
            { icon: <MessageCircle className="text-brand-yellow" size={40} />, title: "Entre em contato", text: "Fale direto via WhatsApp e agende sua viagem." }
          ].map((item, idx) => (
            <motion.div 
              key={`how-it-works-${idx}`}
              whileHover={{ y: -10 }}
              className="bg-white p-6 md:p-10 rounded-[30px] md:rounded-[40px] shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="absolute -top-4 -right-4 bg-brand-yellow w-8 h-8 rounded-full flex items-center justify-center font-bold text-brand-blue text-sm">
                  {idx + 1}
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Map */}
      <section id="destinos" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 id="mapa" className="text-3xl md:text-5xl font-bold text-brand-green mb-4">Escolha um estado para começar</h2>
          <p className="text-gray-500 text-lg">Clique em qualquer estado do Brasil no mapa interativo</p>
        </div>
        
        <BrazilMap selectedState={selectedState} onStateClick={handleStateClick} />

        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: "Norte", color: "#2D5A27" },
            { name: "Nordeste", color: "#E63946" },
            { name: "Centro-Oeste", color: "#FB8500" },
            { name: "Sudeste", color: "#1D3557" },
            { name: "Sul", color: "#FBC02D" }
          ].map(reg => (
            <div key={`region-${reg.name}`} className="flex items-center gap-2 justify-center bg-gray-50 py-3 rounded-full border border-gray-100">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: reg.color }}></div>
              <span className="text-sm font-bold text-gray-700">{reg.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="avaliações" className="py-24 bg-brand-blue/5 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">O que dizem nossos viajantes ❤️</h2>
          <div className="w-20 h-1.5 bg-brand-yellow mx-auto rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={`testimonial-${idx}`} className="bg-white p-8 rounded-3xl shadow-sm relative pt-16 hover:shadow-md transition-shadow border border-blue-50 flex flex-col h-full">
              <div className="absolute top-0 left-8 -translate-y-1/2">
                <img src={`https://i.pravatar.cc/100?img=${t.img}`} className="w-20 h-20 rounded-full border-4 border-white shadow-lg" alt={t.name} />
              </div>
              
              <div className="flex gap-1 text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => <Star key={`testimonial-star-${idx}-${i}`} size={16} fill="currentColor" />)}
              </div>
              
              <p className="text-gray-600 italic mb-6 flex-1">"{t.text}"</p>

              {/* Photos Carousel */}
              {(t as any).photos && (t as any).photos.length > 0 && (
                <div className="mb-6 relative group">
                  <div 
                    id={`carousel-${idx}`}
                    className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x transition-all scroll-smooth"
                  >
                    {(t as any).photos.map((photo: string, pIdx: number) => (
                      <motion.div 
                        key={`${idx}-photo-${pIdx}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setLightboxImage(photo)}
                        className="flex-shrink-0 w-32 h-32 rounded-2xl overflow-hidden shadow-sm cursor-pointer snap-center relative group/img border-2 border-transparent hover:border-brand-green/30 transition-all"
                      >
                        <img src={photo} className="w-full h-full object-cover" alt="Viagem" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize2 className="text-white" size={20} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  {(t as any).photos.length > 1 && (
                    <>
                      <div className="absolute inset-y-0 -right-2 flex items-center z-10">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            const el = document.getElementById(`carousel-${idx}`);
                            if (el) el.scrollBy({ left: 200, behavior: 'smooth' });
                          }}
                          className="p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg text-brand-blue hover:bg-brand-yellow hover:text-brand-blue transition-all border border-gray-100 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 pointer-events-auto"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                      <div className="absolute inset-y-0 -left-2 flex items-center z-10">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            const el = document.getElementById(`carousel-${idx}`);
                            if (el) el.scrollBy({ left: -200, behavior: 'smooth' });
                          }}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-brand-blue hover:bg-brand-yellow hover:text-brand-blue transition-all border border-gray-100 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 pointer-events-auto"
                        >
                          <ChevronLeft size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mt-auto">
                <div>
                  <h4 className="font-bold text-brand-blue">{t.name}</h4>
                  <p className="text-xs text-gray-400">Visitou: {t.location}</p>
                </div>
                <Heart className="text-brand-green" fill="currentColor" size={20} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Evaluation Form */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto bg-gray-50 p-6 md:p-10 rounded-[30px] md:rounded-[40px] border border-gray-100 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-green text-center mb-8">Deixe sua avaliação</h2>
          <form className="space-y-6" onSubmit={e => { e.preventDefault(); setRatingSuccess(true); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Nome Completo</label>
                <input required placeholder="Digite seu nome" className="w-full p-4 rounded-2xl border-2 border-white bg-white focus:border-brand-green outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Destino Visitado</label>
                <div className="relative">
                  <select required className="w-full p-4 rounded-2xl border-2 border-white bg-white focus:border-brand-green outline-none appearance-none">
                    <option key="placeholder-eval">Escolha um estado</option>
                    {Object.entries(statesData).map(([code, s]) => <option key={`eval-state-${code}`} value={code}>{s.name}</option>)}
                  </select>
                  <ChevronRight size={18} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="space-y-2 text-center md:text-left">
              <label className="text-sm font-semibold text-gray-700 block text-center md:text-left">Sua Avaliação</label>
              <div className="flex justify-center md:justify-start gap-2">
                {[1, 2, 3, 4, 5].map(star => <Star key={`rating-input-star-${star}`} size={28} className="text-brand-yellow cursor-pointer hover:scale-110 transition-transform" fill={star <= 4 ? "currentColor" : "none"} />)}
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-700 block text-center md:text-left">Sua Experiência em Fotos (até 5)</label>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {selectedPhotos.map((photo, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-2xl overflow-hidden group border-2 border-brand-green">
                    <img src={photo} className="w-full h-full object-cover" alt="Preview" />
                    <button 
                      onClick={() => removePhoto(i)}
                      type="button"
                      className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {selectedPhotos.length < 5 && (
                  <label className="w-20 h-20 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-brand-green hover:text-brand-green cursor-pointer transition-colors bg-white">
                    <ImageIcon size={24} />
                    <span className="text-[10px] mt-1 font-bold">Adicionar</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Seu Comentário</label>
              <textarea required rows={4} placeholder="Conte-nos como foi sua experiência..." className="w-full p-4 rounded-2xl border-2 border-white bg-white focus:border-brand-green outline-none resize-none"></textarea>
            </div>
            <button type="submit" className="w-full bg-brand-green text-white font-bold py-4 md:py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all text-base md:text-lg flex items-center justify-center gap-2">
              <Send size={20} /> Enviar Avaliação
            </button>
            {ratingSuccess && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center font-bold text-green-600">
                Obrigado pelo seu feedback! ⭐
              </motion.p>
            )}
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-brand-green px-6 text-white text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Ficou com alguma dúvida? Fale conosco!</h2>
        <div className="w-20 h-1.5 bg-brand-yellow mx-auto mb-10 rounded-full"></div>
        <a 
          href="https://wa.me/5511999999999" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-brand-yellow text-brand-blue font-bold py-5 px-8 md:py-6 md:px-12 rounded-full text-lg md:text-xl shadow-2xl hover:scale-105 transition-all w-full md:w-auto"
        >
          <MessageCircle size={28} /> Chamar no WhatsApp
        </a>
        <p className="mt-8 text-white/70 text-sm font-medium tracking-wide">Atendimento 24 horas</p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-brand-green p-2 rounded-xl text-white">
                <Plane size={24} />
              </div>
              <span className="text-2xl font-bold">Explore BR</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
              Sua plataforma definitiva para turistar pelo Brasil com segurança, 
              conforto e memórias registradas por quem entende do assunto.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Youtube, Linkedin].map((Icon, i) => (
                <a key={`social-icon-${i}`} href="#" className="bg-white/5 p-3 rounded-full hover:bg-brand-green transition-colors">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-gray-500">
              {['Sobre nós', 'Como Funciona', 'Seja um Fotógrafo', 'Seja um Motorista', 'Política de Privacidade'].map(l => (
                <li key={`footer-link-${l}`}><a href="#" className="hover:text-brand-green transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Fale Conosco</h4>
            <ul className="space-y-4 text-gray-500">
              <li className="flex items-center gap-2"><Smartphone size={18} /> (11) 99999-9999</li>
              <li className="flex items-center gap-2"><MessageCircle size={18} /> contato@explorebr.com.br</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
          © 2025 Explore BR. Todos os direitos reservados. Feito com ❤️ para quem ama o Brasil.
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {isSpotsModalOpen && (
          <TourismSpotsModal 
            key="spots-modal"
            stateId={selectedState} 
            isOpen={isSpotsModalOpen} 
            onClose={() => setIsSpotsModalOpen(false)} 
            onConfirm={handleConfirmSpots}
          />
        )}
        {isServiceModalOpen && (
          <ServiceSelectionModal 
            key="service-modal"
            isOpen={isServiceModalOpen} 
            onClose={() => setIsServiceModalOpen(false)} 
            onSelect={handleServiceSelect}
          />
        )}
        {isPhotoModalOpen && (
          <PhotographersModal 
            key="photo-modal"
            isOpen={isPhotoModalOpen} 
            onClose={() => setIsPhotoModalOpen(false)} 
          />
        )}
        {isDriverModalOpen && (
          <DriversModal 
            key="driver-modal"
            isOpen={isDriverModalOpen} 
            onClose={() => setIsDriverModalOpen(false)} 
          />
        )}
        {authModal.isOpen && (
          <AuthModal 
            key={`auth-modal-${authModal.type}`}
            type={authModal.type} 
            isOpen={authModal.isOpen} 
            onClose={() => setAuthModal({ ...authModal, isOpen: false })} 
          />
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <button 
              className="absolute top-8 right-8 text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              src={lightboxImage} 
              className="max-w-full max-h-full rounded-3xl shadow-2xl object-contain"
              alt="Ampliada" 
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

