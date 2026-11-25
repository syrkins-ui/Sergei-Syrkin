import React from 'react';
import { BAR_DATA, getWhatsAppReservationUrl } from '../data/barInfo';
import { ContentTranslation, Language } from '../data/translations';
import { WorkingHoursWidget } from './WorkingHoursWidget';
import { Instagram, MessageCircle } from 'lucide-react';

interface FooterProps {
  t: ContentTranslation;
  lang: Language;
  currentPage?: 'home' | 'sommelier' | 'events' | 'tasting';
  onNavigate?: (page: 'home' | 'sommelier' | 'events' | 'tasting') => void;
}

export const Footer: React.FC<FooterProps> = ({ t, lang, onNavigate }) => {
  return (
    <footer className="mt-16 border-t border-[#2B2B2D]/10 bg-[#EDE2D4] pt-12 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#2B2B2D]/10">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <h2 className="font-editorial text-4xl sm:text-5xl text-[#2B2B2D] tracking-tight">
                BRUT bar
              </h2>
              <p className="text-xs text-[#4E4C4F] font-sans-clean max-w-md mt-3 font-normal leading-relaxed">
                {t.footerDescription}
              </p>
            </div>

            <div className="mt-6 flex items-center space-x-3">
              <a
                href={getWhatsAppReservationUrl(t.waPresetMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all shadow-sm shadow-[#25D366]/20"
                title={`WhatsApp Business (${BAR_DATA.whatsappPhoneDisplay})`}
              >
                <MessageCircle className="w-5 h-5 fill-current" />
              </a>

              <a
                href={BAR_DATA.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#FBF7F1] border border-[#A84452]/25 text-[#A84452] hover:bg-[#A84452] hover:text-[#FBF7F1] transition-all shadow-sm"
                title="Instagram @copa_de_brut"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Contacts & Address */}
          <div className="md:col-span-6 font-sans-clean flex flex-col justify-between">
            <div className="space-y-4 text-xs text-[#4E4C4F] font-normal">
              <div>
                <span className="text-[#A84452] block uppercase text-[10px] tracking-widest font-semibold mb-1">
                  {t.footerAddressLabel}
                </span>
                <a
                  href={BAR_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-editorial text-xl sm:text-2xl text-[#2B2B2D] hover:text-[#A84452] transition-colors underline decoration-dotted decoration-[#A84452]/50"
                >
                  {BAR_DATA.address}
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-[#6E6A6D] block uppercase text-[10px] tracking-wider mb-1">
                    {t.footerHoursLabel}
                  </span>
                  <WorkingHoursWidget lang={lang} variant="footer" />
                </div>

                <div>
                  <span className="text-[#6E6A6D] block uppercase text-[10px] tracking-wider mb-1">
                    INSTAGRAM
                  </span>
                  <a href={BAR_DATA.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#A84452] hover:underline font-mono font-medium">
                    {BAR_DATA.instagramHandle}
                  </a>
                </div>

                <div className="sm:col-span-2 pt-3 border-t border-[#2B2B2D]/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => onNavigate && onNavigate('sommelier')}
                      className="text-xs uppercase tracking-wider text-[#A84452] hover:text-[#2B2B2D] transition-colors font-semibold flex items-center space-x-1.5 cursor-pointer group"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">✦ {t.headerSommelier} • Polina Schteiner →</span>
                    </button>
                    <button
                      onClick={() => onNavigate && onNavigate('tasting')}
                      className="text-xs uppercase tracking-wider text-[#A84452] hover:text-[#2B2B2D] transition-colors font-semibold flex items-center space-x-1.5 cursor-pointer group"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">✦ {t.headerTasting} · $39 →</span>
                    </button>
                    <button
                      onClick={() => onNavigate && onNavigate('events')}
                      className="text-xs uppercase tracking-wider text-[#A84452] hover:text-[#2B2B2D] transition-colors font-semibold flex items-center space-x-1.5 cursor-pointer group"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">✦ {t.headerEvents} →</span>
                    </button>
                  </div>
                  <a
                    href="https://brut-bar-774838171565.us-east1.run.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-wider text-[#5C595D] hover:text-[#A84452] transition-colors font-medium"
                  >
                    {t.headerMenu} ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6E6A6D] font-sans-clean font-normal gap-3">
          <div>
            © {new Date().getFullYear()} BRUT bar. {t.footerRights}
          </div>
          <div>
            Buenos Aires, Argentina
          </div>
        </div>

      </div>
    </footer>
  );
};
