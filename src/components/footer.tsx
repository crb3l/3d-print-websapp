import { Link, useLocation } from 'react-router-dom';
import '../index.css';
const Footer = () => {
  const { pathname } = useLocation();
  if (pathname === '/print') return null;
  else
    return (
      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Treidee(e)</h3>
              <p className="text-slate-400">
                Professional 3D printing services for all your needs.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/print">Start Printing</Link></li>
                <li><Link to="/materials">Materials</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* <div>
              <h4 className="text-lg font-semibold mb-4">Got an idea?</h4>
              <ul className="space-y-2 text-slate-400">
                <li></li>
              </ul>
            </div> */}
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} 3D Print Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;