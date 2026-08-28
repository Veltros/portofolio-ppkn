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
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white py-4 shadow-sm border-b border-gray-100'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <a href="#home" onClick={(e) => handleClick(e, '#home')} className="flex items-center gap-3">
              <img 
                src="/images/logo.jpg" 
                alt="Garuda Pancasila" 
                className="w-9 h-9 object-contain"
              />
              <span className="text-xl font-bold text-gray-800">
                Portofolio<span className="text-red-600 font-normal">Pancasila</span>
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              {menuItems.map((item) => {
                const isActive = activeMenu === item.href;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className={`relative font-medium transition-colors ${isActive ? 'text-red-600' : 'text-gray-600 hover:text-red-600'}`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-red-600"></span>
                    )}
                  </a>
                );
              })}
              
              {/* Login/Logout Button */}
              {isAdmin ? (
                <button 
                  onClick={logout}
                  className="ml-4 flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
                >
                  <LogOut size={18} /> Logout
                </button>
              ) : (
                <button 
                  onClick={() => setShowLogin(true)}
                  className="ml-4 flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-red-700 transition"
                >
                  <LogIn size={18} /> Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col space-y-4 border-t border-gray-100">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`font-medium block ${activeMenu === item.href ? 'text-red-600' : 'text-gray-700'}`}
                >
                  {item.name}
                </a>
              ))}
              {isAdmin ? (
                <button 
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-5 py-3 rounded-lg font-medium hover:bg-gray-200 transition mt-2"
                >
                  <LogOut size={18} /> Logout Admin
                </button>
              ) : (
                <button 
                  onClick={() => { setShowLogin(true); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 bg-red-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-red-700 transition mt-2"
                >
                  <LogIn size={18} /> Login Admin
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && !isAdmin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm relative">
            <button 
              onClick={() => {setShowLogin(false); setLoginError('');}}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Mode Admin</h3>
              <p className="text-sm text-gray-500 mt-1">Masukkan password untuk mengedit data.</p>
            </div>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="Password..."
                  autoFocus
                  required
                />
              </div>
              {loginError && <p className="text-red-500 text-sm mb-4 text-center">{loginError}</p>}
              <button 
                type="submit" 
                className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition"
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
