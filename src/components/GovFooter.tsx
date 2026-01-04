import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const GovFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(var(--footer-bg))] text-[hsl(var(--footer-foreground))]">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">LRMS</h3>
                <p className="text-sm opacity-70">Government of India</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Land Revenue Management System - Your one-stop portal for all land record services, 
              mutation applications, and tax payments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-secondary">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/search" className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors">
                  Land Records Search
                </Link>
              </li>
              <li>
                <Link to="/mutation" className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors">
                  Apply for Mutation
                </Link>
              </li>
              <li>
                <Link to="/tax" className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors">
                  Pay Land Tax
                </Link>
              </li>
              <li>
                <Link to="/rtc" className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors">
                  Download RTC Extract
                </Link>
              </li>
              <li>
                <Link to="/encumbrance" className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors">
                  Encumbrance Certificate
                </Link>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-secondary">Important Links</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.india.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors flex items-center gap-1"
                >
                  National Portal of India
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.uidai.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors flex items-center gap-1"
                >
                  UIDAI (Aadhaar)
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://nic.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors flex items-center gap-1"
                >
                  NIC India
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link to="/help" className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors">
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-secondary">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-secondary" />
                <span className="text-sm opacity-80">
                  Revenue Department, Secretariat Building, New Delhi - 110001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary" />
                <span className="text-sm opacity-80">1800-XXX-XXXX (Toll Free)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary" />
                <a 
                  href="mailto:support@landrevenue.gov.in" 
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  support@landrevenue.gov.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-foreground/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-70 text-center md:text-left">
              © {currentYear} Land Revenue Management System. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link to="/privacy" className="opacity-70 hover:opacity-100 hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <span className="opacity-40">|</span>
              <Link to="/terms" className="opacity-70 hover:opacity-100 hover:text-secondary transition-colors">
                Terms of Use
              </Link>
              <span className="opacity-40">|</span>
              <Link to="/accessibility" className="opacity-70 hover:opacity-100 hover:text-secondary transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tricolor Bottom Strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-saffron" />
        <div className="flex-1 bg-card" />
        <div className="flex-1 bg-india-green" />
      </div>
    </footer>
  );
};

export default GovFooter;
