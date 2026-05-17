import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { motion, AnimatePresence } from 'motion/react';
import { Compass } from 'lucide-react';
import { statesData } from '../data';

// Official High-Resolution GeoJSON for Brazil States
const GEO_URL = "https://www.amcharts.com/lib/4/geodata/json/brazilLow.json";

interface BrazilMapProps {
  selectedState: string | null;
  onStateClick: (id: string) => void;
}

export const BrazilMap: React.FC<BrazilMapProps> = ({ selectedState, onStateClick }) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto mt-12 rounded-[50px] shadow-2xl border-[6px] border-white aspect-square bg-[#f8fafc] overflow-hidden group">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#2D5A27_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 850,
          center: [-55, -15]
        }}
        className="w-full h-full drop-shadow-xl"
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              // AMCharts IDs are in format BR-SP, BR-RJ etc.
              const parts = geo.properties.id.split('-');
              const stateId = parts.length > 1 ? parts[1] : parts[0];
              const isSelected = selectedState === stateId;
              const stateName = statesData[stateId]?.name || geo.properties.name;
              
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => onStateClick(stateId)}
                  className="outline-none transition-all duration-500 cursor-pointer"
                  style={{
                    default: {
                      fill: isSelected ? "#2D5A27" : "#cbd5e1",
                      stroke: isSelected ? "#FBC02D" : "#f1f5f9",
                      strokeWidth: isSelected ? 2 : 1,
                      outline: "none",
                    },
                    hover: {
                      fill: "#FBC02D",
                      stroke: "#ffffff",
                      strokeWidth: 2,
                      filter: "drop-shadow(0 0 15px rgba(251, 192, 45, 0.7))",
                      outline: "none",
                      transition: "all 0.3s ease"
                    },
                    pressed: {
                      fill: "#1e3a1a",
                      outline: "none"
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      
      {/* Map Labels/Indicators */}
      <div className="absolute top-8 left-8 z-20">
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-black/5">
          <div className="w-3 h-3 rounded-full bg-brand-green animate-pulse"></div>
          <p className="text-[10px] md:text-xs font-black text-brand-green uppercase tracking-widest">Live Interactive Map</p>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-20 flex flex-col items-end gap-2">
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-gray-100">
           <div className="flex items-center gap-2 mb-1">
             <div className="w-2 h-2 rounded-full bg-brand-yellow"></div>
             <p className="text-[9px] font-bold text-gray-400 uppercase">Geografia Oficial</p>
           </div>
           <p className="text-xs font-black text-brand-blue uppercase tracking-tighter">Bases IBGE / 2024</p>
        </div>
      </div>

      {/* Floating hints */}
      <AnimatePresence>
        {!selectedState && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center z-30"
          >
            <div className="bg-black/60 backdrop-blur-md px-8 py-4 rounded-3xl text-white text-sm font-bold animate-bounce shadow-2xl flex items-center gap-3">
              <Compass className="text-brand-yellow animate-spin-slow" size={20} />
              <span>Clique em um estado para explorar</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

