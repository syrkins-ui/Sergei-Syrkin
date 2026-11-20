import React, { useState, ErrorInfo, ReactNode } from 'react';
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
import { ExternalLink, Loader2, Star } from 'lucide-react';

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

const CARD_I18N: Record<
  Language,
  {
    reviews: string;
    openMaps: string;
    loading3d: string;
    legend: string;
  }
> = {
  ES: {
    reviews: '64 reseñas',
    openMaps: 'Ver en Google Maps',
    loading3d: 'Cargando Google Maps 3D...',
    legend: 'Pines rojos: Puntos de interés en San Telmo',
  },
  PT: {
    reviews: '64 avaliações',
    openMaps: 'Ver no Google Maps',
    loading3d: 'Carregando Google Maps 3D...',
    legend: 'Pinos vermelhos: Pontos de interesse em San Telmo',
  },
  EN: {
    reviews: '64 reviews',
    openMaps: 'View on Google Maps',
    loading3d: 'Loading Google Maps 3D...',
    legend: 'Red pins: Landmarks in San Telmo',
  },
  RU: {
    reviews: '64 отзыва',
    openMaps: 'Посмотреть на картах',
    loading3d: 'Загрузка Google Maps 3D...',
    legend: 'Красные метки: ориентиры рядом в Сан-Тельмо',
  },
};

export const SanTelmoGoogleMap: React.FC<SanTelmoGoogleMapProps> = ({ lang }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDtG_80rq91Y3Dc57YyKxHnTfy7D2XxaBE';
  const [isLoaded, setIsLoaded] = useState(false);

  const otherLandmarks = SAN_TELMO_LANDMARKS.filter(l => !l.isOrigin);
  const c = CARD_I18N[lang];

  const scrollToPlaceCard = () => {
    const el = document.getElementById('brut-gmaps-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

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
        onClick={scrollToPlaceCard}
        zIndex={100}
        title="BRUT bar • Av. Independencia 320"
      >
        <Pin
          background={'#A84452'}
          borderColor={'#F6EFE6'}
          glyphColor={'#FBF7F1'}
          scale={1.3}
        >
          <span style={{ fontSize: '14px', lineHeight: 1 }}>🍾</span>
        </Pin>
      </AdvancedMarker>

      {otherLandmarks.map((lm) => (
        <AdvancedMarker
          key={lm.id}
          position={{ lat: lm.lat, lng: lm.lng }}
          zIndex={50}
          title={`${lm.name[lang]} — ${lm.address}`}
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
    <div className="space-y-4">
      
      {/* Elegant Minimal Google Maps Place Card (Name, Rating, Reviews, View on Maps) */}
      <div
        id="brut-gmaps-card"
        className="w-full rounded-2xl bg-white text-[#202124] border border-[#DADCE0] shadow-[0_1px_3px_rgba(60,64,67,0.12),0_4px_12px_rgba(60,64,67,0.06)] px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-sans"
      >
        {/* Left: Google Maps Pin + Place Name + Rating & Review Count */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#F8F9FA] border border-[#E8EAED] flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#EA4335" d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84.95 1.54 2.2 2.86 3.16 4.4.47.75.81 1.45 1.17 2.26.26.55.47 1.5 1.26 1.5s1-.95 1.25-1.5c.37-.81.7-1.51 1.17-2.26.96-1.53 2.21-2.85 3.16-4.4C18.5 12.37 19 10.74 19 9c0-3.87-3.13-7-7-7z"/>
              <circle fill="#FFFFFF" cx="12" cy="9" r="2.75"/>
            </svg>
          </div>

          <div className="min-w-0">
            <h3 className="text-[19px] sm:text-[21px] font-medium text-[#202124] tracking-[-0.01em] leading-tight truncate">
              BRUT bar
            </h3>
            <div className="mt-1 flex items-center flex-wrap gap-x-1.5 gap-y-0.5 text-[13px] sm:text-[14px]">
              <span className="font-medium text-[#202124]">5.0</span>
              <div className="flex items-center gap-0.5 text-[#FBBC04]" aria-label="5.0 out of 5 stars">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <Star key={idx} className="w-3.5 h-3.5 fill-[#FBBC04] text-[#FBBC04]" />
                ))}
              </div>
              <a
                href={BAR_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5F6368] hover:text-[#1A73E8] hover:underline transition-colors"
              >
                ({c.reviews})
              </a>
            </div>
          </div>
        </div>

        {/* Right: Single Authentic Google Maps Action Button */}
        <a
          href={BAR_DATA.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#1A73E8] hover:bg-[#1557B0] text-white font-medium text-[13px] sm:text-[14px] transition-colors shadow-xs whitespace-nowrap shrink-0"
        >
          <span>{c.openMaps}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Unobstructed 3D Google Map Container */}
      <div className="relative w-full rounded-[32px] overflow-hidden border border-[#2B2B2D]/15 shadow-lg bg-[#EDE2D4] min-h-[540px] lg:min-h-[640px]">
        
        {/* Container with explicit dimensions for Google Maps */}
        <div 
          className="w-full relative" 
          style={{ width: '100%', height: '640px', minHeight: '540px', backgroundColor: '#EDE2D4' }}
        >
          <APIProvider 
            apiKey={apiKey} 
            version="beta"
            language={lang.toLowerCase()}
            onLoad={() => setIsLoaded(true)}
          >
            {/* Loading indicator */}
            {!isLoaded && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#EDE2D4] text-[#A84452] space-y-3">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="text-xs uppercase tracking-widest font-mono">
                  {c.loading3d}
                </span>
              </div>
            )}

            <Map3DErrorBoundary fallback={fallback25DMap}>
              {/* Photorealistic 3D Maps Component with street-level perspective along Av. Independencia */}
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
                  onClick={scrollToPlaceCard}
                >
                  <Pin
                    background={'#A84452'}
                    borderColor={'#F6EFE6'}
                    glyphColor={'#FBF7F1'}
                    scale={1.35}
                  >
                    <span style={{ fontSize: '14px', lineHeight: 1 }}>🍾</span>
                  </Pin>
                </Marker3D>

                {/* Surrounding Landmarks: Standard Google Maps Red Pins */}
                {otherLandmarks.map((lm) => (
                  <Marker3D
                    key={lm.id}
                    position={{ lat: lm.lat, lng: lm.lng, altitude: 15 }}
                    altitudeMode={AltitudeMode.RELATIVE_TO_GROUND}
                    extruded
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

        {/* Subtle Bottom Legend Bar */}
        <div className="absolute bottom-3 right-4 z-20 pointer-events-none hidden sm:flex items-center space-x-2 text-[11px] font-mono text-[#2B2B2D] bg-[#FBF7F1]/90 px-3 py-1.5 rounded-full backdrop-blur-md border border-[#2B2B2D]/12 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
          <span>{c.legend}</span>
        </div>

      </div>

    </div>
  );
};
