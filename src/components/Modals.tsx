import React, { useState } from 'react';
import { X, Camera, Car, Star, CheckCircle2, MessageCircle, Drone, User, Info, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { statesData, photographers, drivers } from '../data';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, subtitle, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 100 }}
        className="glass-modal w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-hidden rounded-t-[32px] md:rounded-3xl shadow-2xl flex flex-col"
      >
        <div className="p-5 md:p-6 border-b border-gray-100 flex justify-between items-center bg-white/50 sticky top-0 z-10 backdrop-blur-md">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-brand-green">{title}</h3>
            {subtitle && <p className="text-gray-500 text-xs md:text-sm mt-0.5 md:p-1">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export const TourismSpotsModal: React.FC<{ 
  stateId: string | null, 
  isOpen: boolean, 
  onClose: () => void, 
  onConfirm: (selected: string[]) => void 
}> = ({ stateId, isOpen, onClose, onConfirm }) => {
  const [selectedSpots, setSelectedSpots] = useState<string[]>([]);
  const state = stateId ? statesData[stateId] : null;

  if (!state) return null;

  const toggleSpot = (spot: string) => {
    setSelectedSpots(prev => prev.includes(spot) ? prev.filter(s => s !== spot) : [...prev, spot]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Pontos Turísticos — ${state.name}`}>
      <div className="space-y-4">
        {state.spots.map((spot, idx) => (
          <div key={`spot-${stateId}-${spot}`} className={`p-3 md:p-4 rounded-2xl border-2 transition-all ${selectedSpots.includes(spot) ? 'border-brand-green bg-brand-green/5' : 'border-gray-100 bg-white'}`}>
            <div className="flex gap-4">
              <img src={`https://picsum.photos/seed/${stateId}-spot-${idx}/300/200`} alt={spot} className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover shadow-sm" />
              <div className="flex-1">
                <h4 className="font-bold text-brand-green text-sm md:text-base mb-1">{spot}</h4>
                <p className="text-[10px] md:text-sm text-gray-500 flex items-center gap-1"><Info size={12} /> Localizado em {state.name}</p>
                <button 
                  onClick={() => toggleSpot(spot)}
                  className={`mt-2 md:mt-3 text-[11px] md:text-sm font-semibold flex items-center gap-1 ${selectedSpots.includes(spot) ? 'text-brand-green' : 'text-gray-400'}`}
                >
                  {selectedSpots.includes(spot) ? <><CheckCircle2 size={14} /> Selecionado</> : "Selecionar destino"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center pb-4 md:pb-0">
        <button 
          onClick={() => onConfirm(selectedSpots)}
          disabled={selectedSpots.length === 0}
          className="w-full md:w-auto bg-brand-yellow text-brand-blue font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg"
        >
          Confirmar ({selectedSpots.length})
        </button>
      </div>
    </Modal>
  );
};

export const ServiceSelectionModal: React.FC<{ 
  isOpen: boolean, 
  onClose: () => void, 
  onSelect: (service: 'photo' | 'driver' | 'both') => void 
}> = ({ isOpen, onClose, onSelect }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Quer tornar sua viagem ainda mais especial?" subtitle="Escolha os serviços que deseja contratar:">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 rounded-3xl bg-brand-green/5 border-2 border-brand-green/20 flex flex-col items-center text-center">
        <Camera size={48} className="text-brand-green mb-4" />
        <h4 className="text-xl font-bold mb-2">Fotógrafo Profissional</h4>
        <p className="text-gray-600 text-sm mb-6">Registre cada momento da sua viagem com profissionais locais. Alguns oferecem filmagem com drone!</p>
        <button onClick={() => onSelect('photo')} className="w-full bg-brand-green text-white font-bold py-3 rounded-2xl hover:bg-green-600 transition-colors">Quero um Fotógrafo</button>
      </div>
      <div className="p-6 rounded-3xl bg-brand-blue/5 border-2 border-brand-blue/20 flex flex-col items-center text-center">
        <Car size={48} className="text-brand-blue mb-4" />
        <h4 className="text-xl font-bold mb-2">Motorista Particular</h4>
        <p className="text-gray-600 text-sm mb-6">Tenha um motorista local para te levar com conforto e segurança até cada destino escolhido.</p>
        <button onClick={() => onSelect('driver')} className="w-full bg-brand-blue text-white font-bold py-3 rounded-2xl hover:bg-blue-600 transition-colors">Quero um Motorista</button>
      </div>
    </div>
    <div className="mt-8 text-center space-y-4">
      <button onClick={() => onSelect('both')} className="bg-brand-yellow text-brand-blue font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl transition-all text-lg">Quero os dois!</button>
      <br />
      <button onClick={onClose} className="text-gray-400 text-sm hover:underline">Pular por agora</button>
    </div>
  </Modal>
);

export const PhotographersModal: React.FC<{ 
  isOpen: boolean, 
  onClose: () => void 
}> = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState<'all' | 'drone'>('all');
  const filtered = filter === 'all' ? photographers : photographers.filter(p => p.drone);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="📷 Fotógrafos Disponíveis">
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${filter === 'all' ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-500'}`}>Todos</button>
        <button onClick={() => setFilter('drone')} className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${filter === 'drone' ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-500'}`}>Com Drone</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(p => (
          <div key={`photo-${p.id}`} className="p-4 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex gap-4 items-center mb-4">
              <img src={`https://i.pravatar.cc/100?img=${p.img}`} className="w-16 h-16 rounded-full border-2 border-brand-green" alt={p.name} />
              <div>
                <h5 className="font-bold text-gray-800">{p.name}</h5>
                <div className="flex gap-1">
                  {p.drone ? (
                    <span className="text-[10px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">📡 Com Drone</span>
                  ) : (
                    <span className="text-[10px] bg-brand-green/10 text-brand-green px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">📷 Fotógrafo</span>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Preço/dia</span>
                <span className="font-bold text-brand-green">{p.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="flex items-center text-yellow-500"><Star size={14} fill="currentColor" /> {p.rating}</span>
                <span className="text-gray-400">({p.reviews} avaliações)</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                {p.status === 'Available' ? <><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> <span className="text-green-600 font-medium">Disponível</span></> : <><span className="w-2 h-2 rounded-full bg-red-500"></span> <span className="text-red-600 font-medium">Ocupado</span></>}
              </div>
            </div>
            <a href={`https://wa.me/55${p.phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-green-500 text-white font-bold py-3 rounded-2xl hover:bg-green-600 transition-colors">
              <MessageCircle size={18} /> Chamar no WhatsApp
            </a>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export const DriversModal: React.FC<{ 
  isOpen: boolean, 
  onClose: () => void 
}> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🚗 Motoristas Disponíveis">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {drivers.map(d => (
          <div key={`driver-${d.id}`} className="p-4 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex gap-4 items-center mb-4">
              <img src={`https://i.pravatar.cc/100?img=${d.img}`} className="w-16 h-16 rounded-full border-2 border-brand-blue" alt={d.name} />
              <div>
                <h5 className="font-bold text-gray-800">{d.name}</h5>
                <span className="text-[10px] bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded-full font-bold">{d.type}</span>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Car size={16} /> {d.car}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User size={16} /> {d.capacity} lugares
              </div>
              <div className="flex justify-between text-sm">
                <span className="flex items-center text-yellow-500"><Star size={14} fill="currentColor" /> {d.rating}</span>
                <span className="text-gray-400">({d.reviews} av.)</span>
              </div>
            </div>
            <a href={`https://wa.me/55${d.phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-green-500 text-white font-bold py-3 rounded-2xl hover:bg-green-600 transition-colors">
              <MessageCircle size={18} /> Chamar no WhatsApp
            </a>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export const AuthModal: React.FC<{ 
  type: 'login' | 'photo' | 'driver', 
  isOpen: boolean, 
  onClose: () => void 
}> = ({ type, isOpen, onClose }) => {
  const titles = { login: 'Acessar Conta', photo: 'Cadastro de Fotógrafo', driver: 'Cadastro de Motorista' };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={titles[type]}>
      <form className="space-y-4" onSubmit={e => e.preventDefault()}>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">E-mail</label>
          <input type="email" placeholder="seu@email.com" className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-brand-green outline-none transition-colors" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Senha</label>
          <input type="password" placeholder="••••••••" className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-brand-green outline-none transition-colors" />
        </div>
        {type !== 'login' && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">WhatsApp</label>
              <input type="text" placeholder="(DD) 99999-9999" className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-brand-green outline-none transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Estado</label>
              <select className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-brand-green outline-none transition-colors appearance-none bg-white">
                <option key="placeholder">Selecione um estado</option>
                {Object.entries(statesData).map(([code, s]) => <option key={`auth-state-${code}`} value={code}>{s.name}</option>)}
              </select>
            </div>
          </>
        )}
        <button className="w-full bg-brand-green text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all mt-4">{type === 'login' ? 'Entrar' : 'Cadastrar'}</button>
        {type === 'login' && (
          <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-100 font-semibold py-4 rounded-2xl hover:bg-gray-50 transition-all">
            <Smartphone size={20} /> Entrar com Google
          </button>
        )}
      </form>
    </Modal>
  );
};
