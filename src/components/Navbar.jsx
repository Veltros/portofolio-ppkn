'use client';
import { useState, useEffect } from 'react';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState('#home');
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const { isAdmin, login, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = document.querySelectorAll('section');
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          current = '#' + section.getAttribute('id');
        }
      });
      if(current) setActiveMenu(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Beranda', href: '#home' },
    { name: 'Profil', href: '#identitas' },
    { name: 'Pancasila', href: '#sila' },
    { name: 'Kegiatan', href: '#kegiatan' },
    { name: 'Galeri', href: '#dokumentasi' },
    { name: 'Penilaian', href: '#penilaian' },
    { name: 'Refleksi', href: '#refleksi' }
  ];

  const handleClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setIsOpen(false);
      setActiveMenu(href);
      if (window.location.pathname !== '/') {
        window.location.href = '/' + href;
        return;
      }
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setIsOpen(false);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      setShowLogin(false);
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Password salah!');
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] py-2' 
          : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <a href="#home" onClick={(e) => handleClick(e, '#home')} className="flex items-center gap-2.5">
              <img 
                src="/images/logo.jpg" 
                alt="Garuda Pancasila" 
                className="w-8 h-8 object-contain rounded-sm"
              />
              <span className={`text-base font-semibold tracking-tight transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-gray-800'}`}>
                Portofolio<span className="text-red-600 font-normal ml-0.5">Pancasila</span>
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => {
                const isActive = activeMenu === item.href;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className={`relative px-3 py-1.5 text-[13px] font-medium transition-colors duration-200 rounded-lg ${
                      isActive 
                        ? 'text-red-700 bg-red-50/60' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-red-600 rounded-full"></span>
                    )}
                  </a>
                );
              })}
              
              {/* Login/Logout Button */}
              <div className="ml-4 pl-4 border-l border-gray-200/60">
                {isAdmin ? (
                  <button 
                    onClick={logout}
                    className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100/50 transition-colors"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                ) : (
                  <button 
                    onClick={() => setShowLogin(true)}
                    className="flex items-center gap-1.5 text-[13px] text-red-700 hover:text-red-800 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50/50 transition-colors"
                  >
                    <LogIn size={14} /> Login
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-gray-700 p-1.5 rounded-lg hover:bg-gray-100/50 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-white/95 backdrop-blur-xl rounded-xl mt-2 p-3 shadow-lg border border-gray-100/80 space-y-0.5">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeMenu === item.href 
                      ? 'text-red-700 bg-red-50/60' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              
              <div className="pt-2 mt-2 border-t border-gray-100">
                {isAdmin ? (
                  <button 
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 font-medium px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <LogOut size={16} /> Logout Admin
                  </button>
                ) : (
                  <button 
                    onClick={() => { setShowLogin(true); setIsOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 text-sm text-red-700 font-medium px-4 py-2.5 rounded-lg bg-red-50/50 hover:bg-red-50 transition-colors"
                  >
                    <LogIn size={16} /> Login Admin
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && !isAdmin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm relative animate-scale-in border border-gray-100">
            <button 
              onClick={() => {setShowLogin(false); setLoginError('');}}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X size={20} />
            </button>
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <LogIn size={20} className="text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Mode Admin</h3>
              <p className="text-sm text-gray-500 mt-1.5">Masukkan password untuk mengedit data.</p>
            </div>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none text-sm transition-all"
                  placeholder="Password..."
                  autoFocus
                  required
                />
              </div>
              {loginError && <p className="text-red-500 text-sm mb-4 text-center">{loginError}</p>}
              <button 
                type="submit" 
                className="w-full bg-red-700 text-white font-semibold py-3 rounded-xl hover:bg-red-800 transition-colors text-sm"
              >
                Masuk
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
