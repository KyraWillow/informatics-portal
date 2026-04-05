import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                IP
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Informatics<span className="text-blue-600">Portal</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Platform pusat informasi dan manajemen organisasi mahasiswa Informatika. 
              Membangun komunitas, prestasi, dan kolaborasi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 font-bold mb-4 uppercase text-xs tracking-wider">Navigasi</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors font-medium">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors font-medium">Divisi</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors font-medium">Kompetisi</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors font-medium">Prestasi</a></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-slate-900 font-bold mb-4 uppercase text-xs tracking-wider">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="/login" className="hover:text-blue-600 transition-colors font-medium">Login Member</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors font-medium">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors font-medium">Syarat & Ketentuan</a></li>
            </ul>
          </div>

          {/* Social Media (Text Based) */}
          <div>
            <h3 className="text-slate-900 font-bold mb-4 uppercase text-xs tracking-wider">Ikuti Kami</h3>
            <div className="flex flex-col gap-2 text-sm font-medium text-slate-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Instagram</a>
              <a href="#" className="hover:text-blue-600 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Email Us</a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm italic">
            &copy; 2026 Informatics Portal. Designed with Precision.
          </p>
          <div className="flex items-center gap-1 text-slate-400 text-sm">
            <span>Powered by</span>
            <span className="font-semibold text-slate-600">React + Tailwind v4</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
