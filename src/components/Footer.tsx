import React from 'react';
import { BAR_DATA, getSmsReservationUrl } from '../data/barInfo';
import { ContentTranslation, Language } from '../data/translations';
import { WorkingHoursWidget } from './WorkingHoursWidget';
import { Instagram, MessageSquare } from 'lucide-react';

interface FooterProps {
  t: ContentTranslation;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ t, lang }) => {
  return (
    <footer className="mt-16 border-t border-[#FFF8F2]/15 bg-[#580714]/90 backdrop-blur-lg pt-12 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#FFF8F2]/10">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <h2 className="font-editorial text-4xl sm:text-5xl text-[#FFF8F2] tracking-tight">
                BRUT bar
              </h2>
              <p className="text-xs text-[#FFF8F2]/75 font-sans-clean max-w-md mt-3 font-light leading-relaxed">
                {t.footerDescription}
              </p>
            </div>

            <div className="mt-6 flex items-center space-x-3">
              <a
                href={getSmsReservationUrl(t.waPresetMessage)}
                className="p-3 rounded-full bg-[#34A853] text-white hover:bg-[#2e964a] transition-all shadow-md"
                title={`SMS / RCS (${BAR_DATA.smsPhoneDisplay})`}
              >
                <MessageSquare className="w-5 h-5 fill-current" />
              </a>

              <a
                href={BAR_DATA.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#7A0C1E] border border-[#FFF8F2]/20 text-[#E5C07B] hover:bg-[#900D24] transition-all"
                title="Instagram @copa_de_brut"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Contacts & Address */}
          <div className="md:col-span-6 font-sans-clean flex flex-col justify-between">
            <div className="space-y-4 text-xs text-[#FFF8F2]/80 font-light">
              <div>
                <span className="text-[#E5C07B] block uppercase text-[10px] tracking-widest font-semibold mb-1">
                  {t.footerAddressLabel}
                </span>
                <a
                  href={BAR_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-editorial text-xl sm:text-2xl text-[#FFF8F2] hover:text-[#E5C07B] transition-colors underline decoration-dotted"
                >
                  {BAR_DATA.address}
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-[#FFF8F2]/50 block uppercase text-[10px] tracking-wider mb-1">
                    {t.footerHoursLabel}
                  </span>
                  <WorkingHoursWidget lang={lang} variant="footer" />
                </div>

                <div>
                  <span className="text-[#FFF8F2]/50 block uppercase text-[10px] tracking-wider mb-1">
                    INSTAGRAM
                  </span>
                  <a href={BAR_DATA.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#E5C07B] hover:underline font-mono">
                    {BAR_DATA.instagramHandle}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FFF8F2]/50 font-sans-clean font-light gap-3">
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
