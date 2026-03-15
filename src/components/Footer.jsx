import { Github, Linkedin, Instagram, Mail } from 'lucide-react';
import QuoteScreen from './QuoteScreen';

export default function Footer() {
  return (
    <>
      {/* Cinematic closing quote */}
      <QuoteScreen text="BUILT WITH CURIOSITY. PLAYED IN C MINOR." isFooter={true} />
      
      <footer className="w-full bg-[#111111] py-12 px-6 border-t border-[#333333]">
        <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex gap-6">
            <a href="#" className="text-[#888888] hover:text-[#c8f135] transition-colors" data-interactive="true" aria-label="GitHub">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="text-[#888888] hover:text-[#c8f135] transition-colors" data-interactive="true" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-[#888888] hover:text-[#c8f135] transition-colors" data-interactive="true" aria-label="Instagram">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-[#888888] hover:text-[#c8f135] transition-colors" data-interactive="true" aria-label="Email">
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <div>
             <span className="font-display text-xl text-[#888888] tracking-widest uppercase">
               tharun · 2025
             </span>
          </div>

        </div>
      </footer>
    </>
  );
}
