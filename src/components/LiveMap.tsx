import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Users, Zap, Navigation, ArrowRight, Activity, ShieldCheck } from 'lucide-react';
import { useContent } from '../context/ContentContext';

// Baato Configuration
const BAATO_TOKEN = 'bpk.r-zDFRks6Teo5EgrrzuuA6OJwtEwPdcaKV3BGzJcA8cR';
const BAATO_STYLE = `https://api.baato.io/api/v1/styles/breeze?key=${BAATO_TOKEN}`;
const DARK_STYLE = `https://api.baato.io/api/v1/styles/night?key=${BAATO_TOKEN}`;


// Simulated Live Data (GeoJSON) with Jittering for Privacy
const generateLiveActivity = () => {
  const activities = ['Dog Walking', 'Pet Sitting', 'Vet Visit', 'Grooming', 'Pet Boarding', 'Training'];
  const pets = ['Rocky', 'Bella', 'Luna', 'Milo', 'Simba', 'Zoe', 'Max', 'Daisy', 'Cooper'];

  // Define city center clusters for marker generation
  const clusters = [
    [85.3240, 27.7172], // Ktm
    [83.9856, 28.2096], // Pokhara
    [84.4125, 27.6815], // Chitwan
    [87.2718, 26.4525], // Biratnagar
    [84.8778, 27.0105], // Birgunj
    [83.4474, 27.6866], // Butwal
    [81.6167, 28.0500], // Nepalgunj
    [87.2736, 26.8124], // Dharan
    [85.9264, 26.7271], // Janakpur
    [80.5900, 28.6800], // Dhangadhi
    [87.2718, 26.6667], // Itahari
    [85.0333, 27.4333]  // Hetauda
  ];

  return {
    type: 'FeatureCollection',
    features: clusters.flatMap((center, clusterIdx) =>
      Array.from({ length: 4 }).map((_, i) => {
        const lng = center[0] + (Math.random() - 0.5) * 0.04;
        const lat = center[1] + (Math.random() - 0.5) * 0.04;
        return {
          type: 'Feature',
          id: `${clusterIdx}-${i}`,
          geometry: { type: 'Point', coordinates: [lng, lat] },
          properties: {
            id: `${clusterIdx}-${i}`,
            name: 'Nearby Area',
            activity: activities[Math.floor(Math.random() * activities.length)],
            pet: pets[Math.floor(Math.random() * pets.length)],
            coordinates: [lng, lat]
          }
        };
      })
    )
  };
};

const REGIONS = {
  kathmandu: { name: 'Kathmandu Valley', center: [85.3240, 27.7172] as [number, number], zoom: 12.5, pitch: 55, bearing: -15 },
  pokhara: { name: 'Pokhara Lakeside', center: [83.9856, 28.2096] as [number, number], zoom: 13, pitch: 45, bearing: 20 },
  chitwan: { name: 'Bharatpur / Chitwan', center: [84.4125, 27.6815] as [number, number], zoom: 13, pitch: 45, bearing: 0 },
  biratnagar: { name: 'Biratnagar City', center: [87.2718, 26.4525] as [number, number], zoom: 13, pitch: 45, bearing: 0 },
  birgunj: { name: 'Birgunj Gateway', center: [84.8778, 27.0105] as [number, number], zoom: 13, pitch: 45, bearing: 0 },
  butwal: { name: 'Butwal Junction', center: [83.4474, 27.6866] as [number, number], zoom: 13, pitch: 45, bearing: 0 },
  nepalgunj: { name: 'Nepalgunj Hub', center: [81.6167, 28.0500] as [number, number], zoom: 13, pitch: 45, bearing: 0 },
  dharan: { name: 'Dharan Foothills', center: [87.2736, 26.8124] as [number, number], zoom: 13, pitch: 45, bearing: 0 },
  janakpur: { name: 'Janakpur Dham', center: [85.9264, 26.7271] as [number, number], zoom: 13, pitch: 45, bearing: 0 },
  dhangadhi: { name: 'Dhangadhi West', center: [80.5900, 28.6800] as [number, number], zoom: 13, pitch: 45, bearing: 0 },
  itahari: { name: 'Itahari Crossing', center: [87.2718, 26.6667] as [number, number], zoom: 13, pitch: 45, bearing: 0 },
  hetauda: { name: 'Hetauda Industrial', center: [85.0333, 27.4333] as [number, number], zoom: 13, pitch: 45, bearing: 0 }
};

export default function LiveMap() {
  const { content } = useContent();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [currentRegion, setCurrentRegion] = useState<keyof typeof REGIONS>('kathmandu');
  const [activeMarker, setActiveMarker] = useState<any>(null);
  const [stats, setStats] = useState({ walkers: 124, bookings: 45 });

  useEffect(() => {
    if (map.current) return;

    // Register protocol to handle incorrect Content-Type from Baato
    if (typeof window !== 'undefined' && !('baato_protocol_registered' in window)) {
      maplibregl.addProtocol('baato', async (params) => {
        const response = await fetch(params.url.replace('baato://', 'https://'), {
          headers: { 'Accept': 'application/x-protobuf' }
        });
        if (!response.ok) throw new Error(`Baato Map error: ${response.statusText}`);
        const data = await response.arrayBuffer();
        return { data };
      });
      (window as any).baato_protocol_registered = true;
    }

    if (mapContainer.current) {
      try {
        const isDark = document.documentElement.classList.contains('dark');

        map.current = new maplibregl.Map({
          container: mapContainer.current,
          style: isDark ? DARK_STYLE : BAATO_STYLE,
          center: REGIONS.kathmandu.center as [number, number],
          zoom: REGIONS.kathmandu.zoom,
          pitch: REGIONS.kathmandu.pitch,
          bearing: REGIONS.kathmandu.bearing,
          interactive: true,
          attributionControl: false,
          cooperativeGestures: true,
          refreshExpiredTiles: true,
          transformRequest: (url) => {
            // Intercept Baato tiles and redirect to our custom protocol
            const isBaatoTile = url.includes('baato.io') && (
              url.includes('/tiles/') ||
              url.includes('.pbf') ||
              url.includes('.mvt') ||
              url.includes('/maps/')
            );

            if (isBaatoTile) {
              return {
                url: url.replace(/^https?:\/\//, 'baato://')
              };
            }
            return { url };
          }
        });

        map.current.on('load', () => {
          // Add Live Activity Layer
          const activity = generateLiveActivity();
          activity.features.forEach((feature: any) => {
            const el = document.createElement('div');
            el.className = 'live-marker-container';

            const pulse = document.createElement('div');
            pulse.className = 'live-marker-pulse';

            const core = document.createElement('div');
            core.className = 'live-marker-core';

            el.appendChild(pulse);
            el.appendChild(core);

            const marker = new maplibregl.Marker({ element: el })
              .setLngLat(feature.geometry.coordinates as [number, number])
              .addTo(map.current!);

            el.onclick = (e) => {
              e.stopPropagation();
              setActiveMarker(feature.properties);
              map.current?.flyTo({
                center: feature.geometry.coordinates as [number, number],
                zoom: 15,
                pitch: 60,
                duration: 2000
              });
            };

            el.onmouseenter = () => el.classList.add('scale-125');
            el.onmouseleave = () => el.classList.remove('scale-125');
          });
        });
      } catch (e) {
        console.error('Map init error:', e);
      }
    }

    // Cinematic Auto-Pilot
    const pilotInterval = setInterval(() => {
      if (!activeMarker) {
        setStats(prev => ({
          walkers: prev.walkers + Math.floor(Math.random() * 3) - 1,
          bookings: prev.bookings + (Math.random() > 0.8 ? 1 : 0)
        }));
      }
    }, 5000);

    return () => clearInterval(pilotInterval);
  }, [activeMarker]);

  const handleRegionSwitch = (key: keyof typeof REGIONS) => {
    setCurrentRegion(key);
    setActiveMarker(null);
    map.current?.flyTo({
      ...REGIONS[key],
      duration: 4000,
      essential: true
    });
  };

  return (
    <section className="relative h-[800px] w-full bg-slate-50 overflow-hidden border-y border-[#13EC13]/10">
      {/* Map Implementation - Forced dimensions to prevent height collapse by MapLibre GL */}
      <div
        ref={mapContainer}
        className="z-0"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#f8fafc'
        }}
      />

      {/* Cinematic Radar Sweep Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-40">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(19,236,19,0.1)_360deg)] rounded-full origin-center"
        />
        {/* Radar Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#13EC13]/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-[#13EC13]/10 rounded-full" />
      </div>

      {/* Subtle Vignette - Reduced opacity to 0.4 from 0.9 */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.4)_100%)]" />

      {/* UI Overlay - Top Left: Region Control */}
      <div className="absolute top-12 left-12 z-20 space-y-4 pointer-events-auto">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="glass-morphism-dark p-6 rounded-[32px] border-white/10 shadow-2xl max-w-xs"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-[#13EC13]/10 flex items-center justify-center text-[#13EC13]">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-[#13EC13] font-black text-[10px] uppercase tracking-[0.25em] mb-0.5 opacity-90">
                {content.liveMap?.title || 'Live Network'}
              </p>
              <h3 className="text-white font-bold text-lg">{REGIONS[currentRegion].name}</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Walkers</p>
              <p className="text-white font-bold text-xl">{stats.walkers}</p>
            </div>
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Bookings</p>
              <p className="text-white font-bold text-xl">{stats.bookings}</p>
            </div>
          </div>

          <div className="max-h-[220px] overflow-y-auto pr-2 custom-scrollbar-thin flex flex-wrap gap-2">
            {(Object.keys(REGIONS) as Array<keyof typeof REGIONS>).map(key => (
              <button
                key={key}
                onClick={() => handleRegionSwitch(key)}
                className={`px-4 py-2 rounded-xl text-[10px] uppercase tracking-wider font-bold transition-all border shrink-0 ${currentRegion === key
                  ? 'bg-[#13EC13] text-black border-[#13EC13]'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/30'
                  }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Floating Activity Feed */}
        <AnimatePresence>
          {!activeMarker && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="glass-morphism-dark p-4 rounded-2xl border-white/5 flex items-center gap-4 max-w-sm"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <p className="text-slate-300 text-sm">
                <span className="text-white font-bold">New Trust Check</span>: Certified caregiver joined in {REGIONS[currentRegion].name.split(' ')[0]}.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* UI Overlay - Active Marker Card */}
      <AnimatePresence>
        {activeMarker && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            className="absolute top-12 right-12 z-20 w-80 pointer-events-auto"
          >
            <div className="glass-morphism p-2 rounded-[40px] border-[#13EC13]/40 shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
              <div className="bg-slate-900 rounded-[36px] overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${activeMarker.pet}/400/250`}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-white font-bold text-xl">{activeMarker.pet}</h4>
                      <p className="text-[#13EC13] text-xs font-bold uppercase tracking-widest">{activeMarker.activity}</p>
                    </div>
                    <button
                      onClick={() => setActiveMarker(null)}
                      className="text-slate-500 hover:text-white transition-colors"
                    >
                      <Zap className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5 mb-6">
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span>Currently at {activeMarker.name}</span>
                    </div>
                  </div>

                  <button className="w-full bg-[#13EC13] text-black font-bold py-4 rounded-2xl hover:bg-[#0fd60f] transition-all flex items-center justify-center gap-2 group">
                    Book similar service
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom attribution */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 bg-slate-900/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full flex items-center gap-4 border-b-[#13EC13]/50">
        <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">The Living Map</span>
        <div className="w-[1px] h-4 bg-white/10" />
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-[#13EC13]" />
          <span className="text-white font-bold tracking-tight">Baato Maps Platform</span>
        </div>
      </div>
    </section>
  );
}
