import { Calendar, Phone, MapPin } from 'lucide-react';

export const HomeFooter = () => {
  return (
    <footer className="bg-gray-100 mt-8">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Event Dates */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Tuesday, 11 March 2025</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span>Wednesday, 12 March 2025</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Calendar className="w-4 h-4 text-orange-600" />
              <span>Thursday, 13 March 2025</span>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone className="w-4 h-4" />
              <span>+44 (0)20 82712124</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <MapPin className="w-4 h-4 mt-0.5" />
              <span>Olympia London, Hammersmith Road, London, W14 8UX</span>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Useful Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Help</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Meet the team</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Safety at Our Event</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Follow Us</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <span className="w-4 h-4 bg-blue-400 rounded"></span> Twitter
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <span className="w-4 h-4 bg-blue-600 rounded"></span> Facebook
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <span className="w-4 h-4 bg-blue-700 rounded"></span> Linkedin
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <span className="w-4 h-4 bg-pink-500 rounded"></span> Instagram
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <span className="w-4 h-4 bg-red-600 rounded"></span> YouTube
              </a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Privacy Options */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <h4 className="font-semibold text-gray-900 mb-2">Privacy Options</h4>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <a href="#" className="hover:text-gray-900">Cookie Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-gray-900 flex items-center gap-1">
              Your Privacy Choices <span className="bg-blue-500 text-white text-xs px-1 rounded">✓</span>
            </a>
            <span>|</span>
            <a href="#" className="hover:text-gray-900">RX Global Privacy Policy</a>
          </div>
          <p className="text-xs text-gray-500 mb-2">© 2025 RX Global</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            The London Book Fair, RX, and Reed Exhibitions are trade marks of Reed Exhibitions Limited and its affiliates. RELX and the "RE" logo are trade marks of RELX Group plc, used under licence. Reed Exhibitions Limited is a private limited company, having its registered and principal office at Gateway House, 28 The Quadrant, Richmond, Surrey, TW9 1DN, registered in England and Wales with Company No. 678540. Business activity: Activities of exhibition and fair organisers VAT No. GB 232 4004 20 Tax ID No: 13960 00581
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-white text-sm">
            <span className="font-bold">RX</span>
            <span className="text-gray-400">In the business of building businesses</span>
          </div>
          <div className="text-white font-bold">
            <span className="text-red-500">ℜ</span> RELX™
          </div>
        </div>
      </div>
    </footer>
  );
};
