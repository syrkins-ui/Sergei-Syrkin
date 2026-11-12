import React, { useState, Component, ErrorInfo, ReactNode } from 'react';
import { 
  APIProvider, 
  Map3D, 
  Marker3D, 
  Pin, 
  AltitudeMode,
  Map as GoogleMap,
  AdvancedMarker
} from '@vis.gl/react-google-maps';
import { SAN_TELMO_LANDMARKS } from '../data/landmarks3D';
import { ContentTranslation, Language } from '../data/translations';
import { BAR_DATA } from '../data/barInfo';
import { Navigation, ExternalLink, Loader2, Share2, Bookmark } from 'lucide-react';

interface SanTelmoGoogleMapProps {
  t: ContentTranslation;
  lang: Language;
}

const BRUT_CENTER = { lat: -34.6172888, lng: -58.3702081 };

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Error Boundary for WebGL / Map3D failures
class Map3DErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Map3D WebGL error encountered, falling back to 2.5D map:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const SCHEDULE_DATA: { day: Record<Language, string>; hours: string; isClosed?: boolean }[] = [
  { day: { ES: 'Miércoles', PT: 'Quarta-feira', EN: 'Wednesday', RU: 'Среда' }, hours: '15:00 – 22:00' },
  { day: { ES: 'Jueves', PT: 'Quinta-feira', EN: 'Thursday', RU: 'Четверг' }, hours: '15:00 – 00:00' },
  { day: { ES: 'Viernes', PT: 'Sexta-feira', EN: 'Friday', RU: 'Пятница' }, hours: '15:00 – 00:00' },
  { day: { ES: 'Sábado', PT: 'Sábado', EN: 'Saturday', RU: 'Суббота' }, hours: '14:00 – 00:00' },
  { day: { ES: 'Domingo', PT: 'Domingo', EN: 'Sunday', RU: 'Воскресенье' }, hours: '14:00 – 21:00' },
  { day: { ES: 'Lunes', PT: 'Segunda-feira', EN: 'Monday', RU: 'Понедельник' }, hours: 'Cerrado', isClosed: true },
  { day: { ES: 'Martes', PT: 'Terça-feira', EN: 'Tuesday', RU: 'Вторник' }, hours: 'Cerrado', isClosed: true },
];

export const SanTelmoGoogleMap: React.FC<SanTelmoGoogleMapProps> = ({ t, lang }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDtG_80rq91Y3Dc57YyKxHnTfy7D2XxaBE';
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(true);
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  const brutLandmark = SAN_TELMO_LANDMARKS.find(l => l.isOrigin) || SAN_TELMO_LANDMARKS[0];
  const otherLandmarks = SAN_TELMO_LANDMARKS.filter(l => !l.isOrigin);

  // Check if open right now based on Buenos Aires time (UTC-3)
  const getIsOpenNow = (): boolean => {
    try {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const baTime = new Date(utc - (3 * 3600000));
      const day = baTime.getDay(); // 0 is Sunday, 1 Mon, ...
      const hour = baTime.getHours() + baTime.getMinutes() / 60;

      if (day === 3 && hour >= 15 && hour < 22) return true;
      if (day === 4 && hour >= 15 && hour < 24) return true;
      if (day === 5 && hour >= 15 && hour < 24) return true;
      if (day === 6 && hour >= 14 && hour < 24) return true;
      if (day === 0 && hour >= 14 && hour < 21) return true;
      return false;
    } catch {
      return false;
    }
  };

  const isOpenNow = getIsOpenNow();

  // Standard 2.5D fallback if device does not support WebGL2 Photorealistic 3D
  const fallback25DMap = (
    <GoogleMap
      defaultCenter={BRUT_CENTER}
      defaultZoom={19}
      defaultHeading={292}
      defaultTilt={65}
      mapTypeId="hybrid"
      mapId="DEMO_MAP_ID"
      style={{ width: '100%', height: '100%' }}
      gestureHandling="greedy"
      disableDefaultUI={false}
      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
    >
      <AdvancedMarker
        position={BRUT_CENTER}
        onClick={() => setIsCardVisible(true)}
        zIndex={100}
        title="BRUT bar • Av. Independencia 320"
      >
        <Pin
          background={'#D4AF37'}
          borderColor={'#580714'}
          glyphColor={'#580714'}
          scale={1.3}
        >
          <span style={{ fontSize: '14px', lineHeight: 1 }}>🍾</span>
        </Pin>
      </AdvancedMarker>

      {otherLandmarks.map((lm) => (
        <AdvancedMarker
          key={lm.id}
          position={{ lat: lm.lat, lng: lm.lng }}
          onClick={() => window.open(lm.googleMapsUrl, '_blank', 'noopener,noreferrer')}
          zIndex={50}
          title={`${lm.name[lang]} — Abrir en Google Maps`}
        >
          <Pin
            background={'#EA4335'}
            borderColor={'#B31412'}
            glyphColor={'#FFFFFF'}
          />
        </AdvancedMarker>
      ))}
    </GoogleMap>
  );

  return (
    <div className="relative w-full rounded-[32px] overflow-hidden border border-[#FFF8F2]/20 shadow-2xl bg-[#1b070b] min-h-[600px] lg:min-h-[680px]">
      
      {/* Container with explicit dimensions for Google Maps */}
      <div 
        className="w-full relative" 
        style={{ width: '100%', height: '680px', minHeight: '600px', backgroundColor: '#1b070b' }}
      >
        <APIProvider 
          apiKey={apiKey} 
          version="beta"
          language={lang.toLowerCase()}
          onLoad={() => setIsLoaded(true)}
        >
          {/* Loading indicator */}
          {!isLoaded && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#1b070b] text-[#E5C07B] space-y-3">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-xs uppercase tracking-widest font-mono">
                Cargando Google Maps 3D Inmersivo...
              </span>
            </div>
          )}

          <Map3DErrorBoundary fallback={fallback25DMap}>
            {/* Photorealistic 3D Maps Component with street-level perspective from Facultad along Av. Independencia */}
            <Map3D
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              mode="SATELLITE"
              defaultCenter={{ lat: -34.6172888, lng: -58.3702081, altitude: 12 }}
              defaultRange={210}
              defaultTilt={67}
              defaultHeading={292}
              defaultRoll={0}
              style={{ width: '100%', height: '100%' }}
            >
              {/* Epicenter Marker: BRUT bar at exact Av. Independencia 320 rooftop */}
              <Marker3D
                position={{ lat: -34.6172888, lng: -58.3702081, altitude: 15 }}
                altitudeMode={AltitudeMode.RELATIVE_TO_GROUND}
                extruded
                onClick={() => setIsCardVisible(true)}
              >
                <Pin
                  background={'#D4AF37'}
                  borderColor={'#580714'}
                  glyphColor={'#580714'}
                  scale={1.35}
                >
                  <span style={{ fontSize: '14px', lineHeight: 1 }}>🍾</span>
                </Pin>
              </Marker3D>

              {/* Surrounding Landmarks: Standard Google Maps Red Pins leading directly to their points */}
              {otherLandmarks.map((lm) => (
                <Marker3D
                  key={lm.id}
                  position={{ lat: lm.lat, lng: lm.lng, altitude: 15 }}
                  altitudeMode={AltitudeMode.RELATIVE_TO_GROUND}
                  extruded
                  onClick={() => window.open(lm.googleMapsUrl, '_blank', 'noopener,noreferrer')}
                >
                  <Pin
                    background={'#EA4335'}
                    borderColor={'#B31412'}
                    glyphColor={'#FFFFFF'}
                    scale={1.15}
                  />
                </Marker3D>
              ))}
            </Map3D>
          </Map3DErrorBoundary>
        </APIProvider>
      </div>

      {/* Real Google Maps Info Card over BRUT Bar */}
      {isCardVisible && (
        <div className="absolute top-4 left-4 z-30 w-[330px] sm:w-[360px] pointer-events-auto animate-fade-in font-sans">
          <div className="bg-white/95 text-neutral-900 rounded-2xl shadow-2xl border border-neutral-200/90 backdrop-blur-md overflow-hidden">
            
            {/* Top Bar with Branding & Close */}
            <div className="px-4 pt-3.5 pb-2 flex items-start justify-between border-b border-neutral-100">
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-lg">🍾</span>
                  <h3 className="font-bold text-[17px] text-neutral-900 tracking-tight leading-tight">
                    BRUT bar
                  </h3>
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    San Telmo
                  </span>
                </div>
                <p className="text-[12px] text-amber-900 font-medium mt-0.5">
                  Casa de vinos espumantes argentinos
                </p>
              </div>

              <button
                onClick={() => setIsCardVisible(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
                title="Cerrar tarjeta"
                aria-label="Cerrar tarjeta"
              >
                ✕
              </button>
            </div>

            {/* Official Google Maps Rating & Categories */}
            <div className="px-4 py-2.5 bg-neutral-50/70 border-b border-neutral-100">
              <div className="flex items-center space-x-2 text-[13px]">
                <div className="flex items-center space-x-1 text-amber-500 font-bold">
                  <span className="text-neutral-900 font-bold">5.0</span>
                  <div className="flex text-amber-400 text-xs">
                    ★★★★★
                  </div>
                </div>
                <span className="text-neutral-400">•</span>
                <span className="text-neutral-600 text-xs">
                  (64 reseñas en Google Maps)
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                Bar de vinos espumantes • Bar de copas • Brunch
              </p>
            </div>

            {/* Address & Direct Details */}
            <div className="px-4 py-3 space-y-2 text-xs text-neutral-700">
              {/* Address */}
              <div className="flex items-start space-x-2">
                <span className="text-neutral-400 text-sm shrink-0">📍</span>
                <div className="leading-snug">
                  <span className="font-medium text-neutral-900">Av. Independencia 320</span>
                  <span className="text-neutral-500 block text-[11px]">C1099AAQ San Telmo, Buenos Aires</span>
                </div>
              </div>

              {/* Verified Opening Hours from Google Maps */}
              <div className="pt-1">
                <div 
                  className="flex items-center justify-between cursor-pointer hover:bg-neutral-100/70 p-1.5 rounded-lg -mx-1.5 transition-colors"
                  onClick={() => setShowFullSchedule(!showFullSchedule)}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-neutral-400 text-sm shrink-0">🕒</span>
                    <span className={`font-semibold text-xs ${isOpenNow ? 'text-emerald-700' : 'text-amber-800'}`}>
                      {isOpenNow ? 'Abierto ahora' : 'Cerrado ahora'}
                    </span>
                    <span className="text-neutral-400 text-[11px]">•</span>
                    <span className="text-neutral-600 text-[11px]">
                      {showFullSchedule ? 'Ocultar horarios' : 'Ver todos los horarios'}
                    </span>
                  </div>
                  <span className="text-neutral-400 text-xs">
                    {showFullSchedule ? '▲' : '▼'}
                  </span>
                </div>

                {/* Full verified Google Maps weekly schedule */}
                {showFullSchedule ? (
                  <div className="mt-2 pl-6 pr-2 py-2 bg-neutral-100/80 rounded-xl space-y-1 text-[11px] text-neutral-600 font-mono">
                    {SCHEDULE_DATA.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-0.5">
                        <span className="font-sans font-medium text-neutral-800">{item.day[lang]}</span>
                        <span className={item.isClosed ? 'text-rose-600 font-medium' : 'text-neutral-700'}>
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="pl-6 text-[11px] text-neutral-500 leading-tight">
                    Mié 15–22 • Jue–Vie 15–00 • Sáb 14–00 • Dom 14–21
                  </p>
                )}
              </div>
            </div>

            {/* Official Google Maps Actions */}
            <div className="p-3 bg-neutral-50/90 border-t border-neutral-100 flex items-center gap-2">
              <a
                href={BAR_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-sm active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5 fill-current" />
                <span>{t.locationDirections}</span>
              </a>

              <a
                href={BAR_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-neutral-200/70 hover:bg-neutral-200 text-neutral-700 font-medium text-xs transition-colors flex items-center space-x-1"
                title="Abrir en Google Maps"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Google Maps</span>
              </a>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: 'BRUT bar', url: BAR_DATA.googleMapsUrl }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(BAR_DATA.googleMapsUrl);
                  }
                }}
                className="p-2 rounded-xl bg-neutral-200/70 hover:bg-neutral-200 text-neutral-700 transition-colors"
                title="Compartir enlace de Google Maps"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Subtle Bottom Legend Bar */}
      <div className="absolute bottom-3 right-4 z-20 pointer-events-none hidden sm:flex items-center space-x-2 text-[11px] font-mono text-[#FFF8F2]/80 bg-[#580714]/90 px-3 py-1.5 rounded-full backdrop-blur-md border border-[#FFF8F2]/15">
        <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
        <span>Pines rojos: Puntos de interés en San Telmo (clic para abrir en Google Maps)</span>
      </div>

    </div>
  );
};
