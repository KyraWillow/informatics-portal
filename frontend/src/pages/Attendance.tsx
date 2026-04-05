import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { meetingApi, attendanceApi, memberApi } from '@/services/api';
import {
  Clock, MapPin, CheckCircle2, AlertCircle,
  UserCheck, UserMinus
} from 'lucide-react';
import { cn } from '@/utils/cn';

const Attendance: React.FC = () => {
  const { user } = useAuth();
  const [meetings, setMeetings] = useState<any[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  const [memberProfile, setMemberProfile] = useState<any>(null);
  const [status, setStatus] = useState<'HADIR' | 'IZIN' | 'SAKIT' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [meetRes, memberRes] = await Promise.all([
          meetingApi.getAll(),
          memberApi.getAll()
        ]);

        setMeetings(meetRes.data);
        if (meetRes.data.length > 0) setSelectedMeeting(meetRes.data[0]);

        // Auto-detect member profile based on logged-in user
        // Match by username (NIM) or user ID
        const profile = memberRes.data.find((m: any) => 
          m.nim === user?.username || 
          m.name.toLowerCase() === user?.username.toLowerCase()
        );
        setMemberProfile(profile);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!status || !selectedMeeting || !memberProfile) {
      setError("Data profil member tidak ditemukan. Hubungi Admin.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await attendanceApi.submit({
        memberId: memberProfile.id,
        meetingId: selectedMeeting.id,
        status: status
      });
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal mengirim presensi. Mungkin Anda sudah mengisi.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Presensi Berhasil!</h2>
          <p className="text-slate-500 mb-8 italic">"Data kehadiran Anda telah tercatat di sistem."</p>
          <button onClick={() => window.location.reload()} className="text-blue-600 font-bold hover:underline">Kembali</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 lg:py-20 text-left">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Portal Presensi</h1>
        <p className="text-slate-500">Silakan pilih rapat aktif dan isi status kehadiran Anda.</p>
      </div>

      {/* Show logged-in user info */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Login sebagai</p>
            <p className="font-bold text-slate-900">{user?.username || 'User'}</p>
          </div>
        </div>
        {memberProfile ? (
          <div className="text-right">
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest">Status</p>
            <p className="font-bold text-green-600 flex items-center gap-1">
              <CheckCircle2 size={14} /> Profil Terdaftar
            </p>
          </div>
        ) : (
          <div className="text-right">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">Status</p>
            <p className="font-bold text-amber-600">Profil Belum Terdaftar</p>
          </div>
        )}
      </div>

      {!memberProfile && (
        <div className="mb-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-center gap-3 text-amber-800 text-sm">
          <AlertCircle size={20} />
          <span>Profil Member Anda belum terdaftar di database. Silakan hubungi Admin untuk sinkronisasi akun.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Pilih Rapat</label>
            <select 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              onChange={(e) => setSelectedMeeting(meetings.find(m => m.id === e.target.value))}
            >
              {meetings.map(m => (
                <option key={m.id} value={m.id}>{m.title}</option>
              ))}
              {meetings.length === 0 && <option>Tidak ada rapat aktif</option>}
            </select>

            {selectedMeeting && (
              <div className="animate-in fade-in slide-in-from-bottom-2">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{selectedMeeting.title}</h2>
                <p className="text-slate-600 mb-8">{selectedMeeting.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-50">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600"><MapPin size={20} /></div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lokasi</p>
                      <p className="font-semibold text-slate-900">{selectedMeeting.location || 'Online'}</p>
                    </div>
                  </div>
                  {selectedMeeting.link && (
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600"><Clock size={20} /></div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Link Rapat</p>
                        <a href={selectedMeeting.link} target="_blank" className="font-semibold text-blue-600 hover:underline">Klik Bergabung</a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Status Kehadiran</h3>
            
            {error && <p className="text-xs text-red-600 mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}

            <div className="space-y-4 mb-8">
              {(['HADIR', 'IZIN', 'SAKIT'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all",
                    status === s ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <div className={cn("p-2 rounded-xl", status === s ? "bg-white/20" : "bg-slate-50")}>
                    {s === 'HADIR' ? <UserCheck size={20} /> : <UserMinus size={20} />}
                  </div>
                  <span className="font-bold">{s}</span>
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={!status || isLoading || !memberProfile}
              className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg disabled:opacity-50"
            >
              {isLoading ? "Mengirim..." : "Kirim Presensi"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
