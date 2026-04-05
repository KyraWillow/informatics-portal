import React, { useState, useEffect } from 'react';
import {
  ArrowRight, Trophy, Users, X, ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { achievementApi, divisionApi, competitionApi } from '@/services/api';

const Home: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState<any>(null);
  const [divisionMembers, setDivisionMembers] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [divisions, setDivisions] = useState<any[]>([]);
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [membersLoading, setMembersLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [achRes, divRes, compRes] = await Promise.all([
          achievementApi.getAll(),
          divisionApi.getAll(),
          competitionApi.getAll()
        ]);
        console.log("API Response - Achievements:", achRes.data);
        console.log("API Response - Divisions:", divRes.data);
        console.log("API Response - Competitions:", compRes.data);
        
        setAchievements(achRes.data.slice(0, 3)); // Ambil 3 teratas
        setDivisions(divRes.data);
        setCompetitions(compRes.data.slice(0, 3));
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchDivisionMembers = async (divisionId: string) => {
    setMembersLoading(true);
    try {
      const res = await divisionApi.getById(divisionId);
      setDivisionMembers(res.data.members || []);
    } catch (error) {
      console.error("Gagal mengambil anggota divisi:", error);
      setDivisionMembers([]);
    } finally {
      setMembersLoading(false);
    }
  };

  const handleDivisionClick = (div: any) => {
    setSelectedDivision(div);
    if (div.id) {
      fetchDivisionMembers(div.id);
    }
  };

  return (
    <div className="flex flex-col relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-32 lg:pb-40 text-left">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 transform opacity-10 pointer-events-none">
          <div className="h-[600px] w-[600px] rounded-full bg-blue-600 blur-3xl"></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 xl:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="text-sm font-medium text-blue-700">Informatics Portal 2026</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6 leading-[1.1]">
                Pusat Inovasi & Kolaborasi <br />
                <span className="text-blue-600">Mahasiswa Informatika</span>
              </h1>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-2xl">
                Wadah aspirasi dan pengembangan diri bagi seluruh mahasiswa Teknik Informatika. 
                Raih prestasi bersama dan jalin relasi di ekosistem digital kami.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                  Mulai Bergabung <ArrowRight size={20} />
                </Link>
                <a href="#about" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-700 font-bold border border-slate-200 hover:bg-slate-50 transition-all">
                  Pelajari Lebih Lanjut
                </a>
              </div>
            </div>
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" alt="Organisasi" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Section */}
      <section className="py-24 bg-white border-y border-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Prestasi Luar Biasa</h2>
            <p className="text-slate-600 text-lg">Bangga atas dedikasi para anggota yang telah mengharumkan nama organisasi.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? [1,2,3].map(i => <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-3xl"></div>) : 
             achievements.map((item) => (
              <div key={item.id} className="group p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <img src={item.image} alt={item.fullname} className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md" />
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-full shadow-lg"><Trophy size={16} /></div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{item.fullname}</h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase mb-4">Juara {item.ranking}</div>
                  <p className="text-slate-500 text-sm leading-relaxed">"{item.description}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Division Section */}
      <section id="divisions" className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Struktur Divisi</h2>
            <p className="text-slate-600 text-lg leading-relaxed">Pilar-pilar penggerak di balik setiap program kerja kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? [1,2,3].map(i => <div key={i} className="h-48 bg-white animate-pulse rounded-3xl"></div>) :
             divisions.map((div) => (
                <div key={div.id} className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-center mb-6">
                    <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-blue-100 shadow-md group-hover:scale-105 transition-transform">
                      {div.image ? (
                        <img src={div.image} alt={div.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-blue-50 flex items-center justify-center text-blue-600">
                          {div.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">{div.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3 text-center">{div.description}</p>
                  <button
                    onClick={() => handleDivisionClick(div)}
                    className="w-full py-3 rounded-xl border-2 border-slate-100 text-slate-700 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Users size={18} /> Detail Divisi
                  </button>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Competition Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-2 leading-tight">Kompetisi Mendatang</h2>
              <p className="text-slate-600 text-lg leading-relaxed">Asah kemampuanmu dan raih prestasi di kancah nasional.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {loading ? [1,2,3].map(i => <div key={i} className="h-48 bg-slate-50 animate-pulse rounded-3xl"></div>) :
             competitions.map((comp) => (
              <div key={comp.id} className="p-8 rounded-3xl border-2 border-slate-50 bg-slate-50/50 hover:bg-white hover:border-blue-100 transition-all duration-300">
                <h4 className="text-2xl font-bold text-slate-900 mb-3">{comp.title}</h4>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-3">{comp.description}</p>
                <a 
                  href={comp.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                >
                  Daftar Sekarang <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Division Detail Modal */}
      {selectedDivision && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="relative h-48 bg-slate-900">
              {selectedDivision.image && <img src={selectedDivision.image} alt={selectedDivision.name} className="w-full h-full object-cover opacity-50" />}
              <button
                onClick={() => setSelectedDivision(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-6 left-8 text-white text-left">
                <h2 className="text-3xl font-bold">{selectedDivision.name}</h2>
              </div>
            </div>
            <div className="p-8 text-left max-h-[60vh] overflow-y-auto">
              <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Deskripsi Divisi</h4>
              <p className="text-slate-600 leading-relaxed mb-8">{selectedDivision.description}</p>
              
              <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Anggota Divisi</h4>
              {membersLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-16 bg-slate-100 animate-pulse rounded-xl"></div>
                  ))}
                </div>
              ) : divisionMembers.length > 0 ? (
                <div className="space-y-3">
                  {divisionMembers.map((member: any) => (
                    <div key={member.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                      <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-blue-100 flex-shrink-0">
                        {member.image ? (
                          <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm">
                            {member.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-900">{member.name}</p>
                        <p className="text-xs text-slate-500">{member.nim} • {member.position}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">Belum ada anggota di divisi ini.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
