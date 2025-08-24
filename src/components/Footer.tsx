import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const {
    t
  } = useLanguage();
  return (
    <footer className="border-t border-neutral-mid py-10 mt-20 bg-slate-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Safe Anaesthesia SL</h3>
            <p className="text-neutral-dark text-sm">
              {t('about.who')}
            </p>
            <img
              src="https://res.cloudinary.com/dotj571pv/image/upload/v1756016794/WhatsApp_Image_2025-08-18_at_10.15.30_AM_f36fli.jpg"
              alt="DGH Hambantota Logo"
              className="mt-4 w-24 h-auto"
            />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-neutral-dark hover:text-indigo">{t('nav.home')}</Link></li>
              <li><Link to="/before-surgery" className="text-neutral-dark hover:text-indigo">{t('nav.before')}</Link></li>
              <li><Link to="/during-surgery" className="text-neutral-dark hover:text-indigo">{t('nav.during')}</Link></li>
              <li><Link to="/after-surgery" className="text-neutral-dark hover:text-indigo">{t('nav.after')}</Link></li>
              <li><Link to="/resources" className="text-neutral-dark hover:text-indigo">{t('nav.resources')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Disclaimer</h3>
            <p className="text-neutral-dark text-sm">
              This website is for informational purposes only and does not replace professional medical advice. 
              Always consult your healthcare provider before making any medical decisions.
            </p>
          </div>
        </div>
        
        <div className="border-t border-neutral-mid mt-8 pt-4 text-sm text-center text-neutral-dark">
          <p>© {new Date().getFullYear()} Safe Anaesthesia SL. All rights reserved.</p>
          <p className="mt-1">Developed by HealthifyLK</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
