import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Users, Trophy, Flag, Settings, Calendar,
  Plus, Edit, Trash2, Search, X, Save, Link as LinkIcon, Loader2, MapPin,
  Eye, CheckCircle2, XCircle, Clock, FileText
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { achievementApi, divisionApi, competitionApi, memberApi, meetingApi, attendanceApi } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

type ContentType = 'ACHIEVEMENT' | 'DIVISION' | 'COMPETITION' | 'MEMBER' | 'MEETING';

interface FormData {
  fullname?: string;
  ranking?: number;
  description?: string;
  image?: string;
  name?: string;
  title?: string;
  link?: string;
  nim?: string;
  position?: string;
  divisionId?: string;
  location?: string;
  meetingLink?: string;
}

const Dashboard: React.FC = () => {
  const { user: _user } = useAuth();
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'ACHIEVEMENTS' | 'DIVISIONS' | 'COMPETITIONS' | 'MEMBERS' | 'MEETINGS'>('OVERVIEW');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ members: 0, achievements: 0, divisions: 0, competitions: 0, meetings: 0 });
  const [achievements, setAchievements] = useState<any[]>([]);
  const [divisions, setDivisions] = useState<any[]>([]);
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'CREATE' | 'EDIT'>('CREATE');
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [selectedMeetingForAttendance, setSelectedMeetingForAttendance] = useState<any>(null);
  const [attendanceList, setAttendanceList] = useState<any[]>([]);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [allMembers, setAllMembers] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [achRes, divRes, compRes, memberRes, meetingRes, attendanceRes] = await Promise.all([
        achievementApi.getAll(),
        divisionApi.getAll(),
        competitionApi.getAll(),
        memberApi.getAll(),
        meetingApi.getAll(),
        attendanceApi.getAll()
      ]);
      console.log("Dashboard API Response - Achievements:", achRes.data);
      console.log("Dashboard API Response - Divisions:", divRes.data);
      console.log("Dashboard API Response - Competitions:", compRes.data);
      console.log("Dashboard API Response - Members:", memberRes.data);
      console.log("Dashboard API Response - Meetings:", meetingRes.data);
      console.log("Dashboard API Response - Attendances:", attendanceRes.data);
      
      setAchievements(achRes.data);
      setDivisions(divRes.data);
      setCompetitions(compRes.data);
      setMembers(memberRes.data);
      setMeetings(meetingRes.data);
      setAllMembers(memberRes.data);
      setStats({
        members: memberRes.data.length || 0,
        achievements: achRes.data.length || 0,
        divisions: divRes.data.length || 0,
        competitions: compRes.data.length || 0,
        meetings: meetingRes.data.length || 0
      });
    } catch (error) {
      console.error("Gagal mengambil data dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContent = (type: ContentType) => {
    setModalType('CREATE');
    setSelectedItem({ type });
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (item: any, type: ContentType) => {
    setModalType('EDIT');
    setSelectedItem({ ...item, type });
    setFormData({
      fullname: item.fullname,
      ranking: item.ranking,
      description: item.description,
      image: item.image,
      name: item.name,
      title: item.title,
      link: item.link,
      nim: item.nim,
      position: item.position,
      divisionId: item.divisionId,
      location: item.location,
      meetingLink: item.link
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (item: any, type: ContentType) => {
    if (!confirm(`Hapus ${type.toLowerCase()} ini?`)) return;

    try {
      switch (type) {
        case 'ACHIEVEMENT':
          await achievementApi.delete(item.id);
          setAchievements(achievements.filter(a => a.id !== item.id));
          break;
        case 'DIVISION':
          await divisionApi.delete(item.id);
          setDivisions(divisions.filter(d => d.id !== item.id));
          break;
        case 'COMPETITION':
          await competitionApi.delete(item.id);
          setCompetitions(competitions.filter(c => c.id !== item.id));
          break;
        case 'MEMBER':
          await memberApi.delete(item.id);
          setMembers(members.filter(m => m.id !== item.id));
          break;
        case 'MEETING':
          await meetingApi.delete(item.id);
          setMeetings(meetings.filter(m => m.id !== item.id));
          break;
      }
      setStats(prev => ({
        ...prev,
        [type.toLowerCase() + 's']: prev[type.toLowerCase() + 's' as keyof typeof prev] - 1
      }));
    } catch (error: any) {
      alert(`Gagal menghapus: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const type = selectedItem?.type;
      if (!type) throw new Error('Type tidak valid');

      if (modalType === 'CREATE') {
        switch (type) {
          case 'ACHIEVEMENT':
            await achievementApi.create(formData);
            break;
          case 'DIVISION':
            await divisionApi.create(formData);
            break;
          case 'COMPETITION':
            await competitionApi.create(formData);
            break;
          case 'MEMBER':
            await memberApi.create(formData);
            break;
          case 'MEETING':
            await meetingApi.create({
              title: formData.title,
              description: formData.description,
              location: formData.location,
              link: formData.meetingLink
            });
            break;
        }
      } else {
        switch (type) {
          case 'ACHIEVEMENT':
            await achievementApi.update(selectedItem.id, formData);
            break;
          case 'DIVISION':
            await divisionApi.update(selectedItem.id, formData);
            break;
          case 'COMPETITION':
            await competitionApi.update(selectedItem.id, formData);
            break;
          case 'MEMBER':
            await memberApi.update(selectedItem.id, formData);
            break;
          case 'MEETING':
            await meetingApi.update(selectedItem.id, {
              title: formData.title,
              description: formData.description,
              location: formData.location,
              link: formData.meetingLink
            });
            break;
        }
      }

      setIsModalOpen(false);
      fetchData();
    } catch (error: any) {
      alert(`Gagal menyimpan: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewAttendance = async (meeting: any) => {
    setSelectedMeetingForAttendance(meeting);
    setIsAttendanceModalOpen(true);
    setAttendanceLoading(true);

    try {
      const [attendanceRes] = await Promise.all([
        attendanceApi.getByMeeting(meeting.id)
      ]);

      setAttendanceList(attendanceRes.data);
    } catch (error) {
      console.error("Gagal mengambil attendance:", error);
      setAttendanceList([]);
    } finally {
      setAttendanceLoading(false);
    }
  };

  const getAttendanceStats = () => {
    const stats = {
      hadir: attendanceList.filter(a => a.status === 'HADIR').length,
      izin: attendanceList.filter(a => a.status === 'IZIN').length,
      sakit: attendanceList.filter(a => a.status === 'SAKIT').length,
      alpha: attendanceList.filter(a => a.status === 'ALPHA').length,
    };
    const totalMembers = allMembers.length;
    const totalAttendance = attendanceList.length;
    const belumIsi = totalMembers - totalAttendance;

    return { stats, totalMembers, totalAttendance, belumIsi };
  };

  const getFilteredData = (type: string) => {
    if (!searchQuery) return null;
    const query = searchQuery.toLowerCase();
    
    switch (type) {
      case 'ACHIEVEMENTS':
        return achievements.filter((item: any) => 
          item.fullname?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query)
        );
      case 'DIVISIONS':
        return divisions.filter((item: any) => 
          item.name?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query)
        );
      case 'COMPETITIONS':
        return competitions.filter((item: any) => 
          item.title?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query)
        );
      case 'MEMBERS':
        return members.filter((item: any) => 
          item.name?.toLowerCase().includes(query) ||
          item.nim?.toLowerCase().includes(query)
        );
      case 'MEETINGS':
        return meetings.filter((item: any) => 
          item.title?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.location?.toLowerCase().includes(query)
        );
      default:
        return null;
    }
  };

  const renderFormFields = () => {
    const type = selectedItem?.type;
    
    switch (type) {
      case 'ACHIEVEMENT':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">Nama Penerima</label>
              <input
                type="text"
                value={formData.fullname || ''}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Ahmad Fauzi"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">Peringkat</label>
              <select
                value={formData.ranking || 1}
                onChange={(e) => setFormData({ ...formData, ranking: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>Juara 1</option>
                <option value={2}>Juara 2</option>
                <option value={3}>Juara 3</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">Deskripsi Prestasi</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Deskripsikan prestasi yang diraih..."
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">URL Foto</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="h-12 w-12 rounded-lg object-cover border" />
                )}
              </div>
            </div>
          </>
        );
      
      case 'DIVISION':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">Nama Divisi</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Divisi Teknologi"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">Deskripsi Divisi</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Jelaskan tugas dan tanggung jawab divisi..."
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">URL Foto Divisi</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="h-12 w-12 rounded-full object-cover border" />
                )}
              </div>
            </div>
          </>
        );
      
      case 'COMPETITION':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">Judul Kompetisi</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Gemastik 2026"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">Deskripsi</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Deskripsikan kompetisi..."
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">Link Pendaftaran</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.link || ''}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
                <LinkIcon className="text-slate-400 mt-3" size={20} />
              </div>
            </div>
          </>
        );
      
      case 'MEMBER':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Budi Santoso"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">NIM</label>
              <input
                type="text"
                value={formData.nim || ''}
                onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: 2024001"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">Jabatan/Posisi</label>
              <input
                type="text"
                value={formData.position || ''}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Koordinator"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">Divisi</label>
              <select
                value={formData.divisionId || ''}
                onChange={(e) => setFormData({ ...formData, divisionId: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih Divisi</option>
                {divisions.map((div: any) => (
                  <option key={div.id} value={div.id}>{div.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">URL Foto Profil</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="h-12 w-12 rounded-full object-cover border" />
                )}
              </div>
            </div>
          </>
        );

      case 'MEETING':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">Judul Rapat</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Rapat Koordinasi Bulanan"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">Deskripsi</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Deskripsikan agenda rapat..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">Lokasi</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: Ruang Rapat Lt. 3"
                />
                <MapPin className="text-slate-400 mt-3" size={20} />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">Link Rapat (Online)</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.meetingLink || ''}
                  onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://meet.google.com/..."
                />
                <LinkIcon className="text-slate-400 mt-3" size={20} />
              </div>
              <p className="text-xs text-slate-500 mt-1">Opsional, isi jika rapat dilakukan secara online</p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 mt-1">Kelola seluruh konten dan data organisasi dalam satu panel.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-all shadow-sm">
              <Settings size={18} />
              Pengaturan
            </button>
            <button 
              onClick={() => handleAddContent('ACHIEVEMENT')}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              <Plus size={18} />
              Tambah Konten
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm animate-pulse h-32"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: 'Total Anggota', value: stats.members.toString(), icon: Users, color: 'bg-blue-500' },
              { label: 'Prestasi', value: stats.achievements.toString(), icon: Trophy, color: 'bg-amber-500' },
              { label: 'Divisi Aktif', value: stats.divisions.toString(), icon: LayoutDashboard, color: 'bg-purple-500' },
              { label: 'Rapat', value: stats.meetings.toString(), icon: Calendar, color: 'bg-green-500' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("p-3 rounded-2xl text-white", stat.color)}>
                    <stat.icon size={24} />
                  </div>
                </div>
                <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Management Tabs */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar">
            {(['OVERVIEW', 'ACHIEVEMENTS', 'DIVISIONS', 'COMPETITIONS', 'MEMBERS', 'MEETINGS'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-5 text-sm font-bold transition-all whitespace-nowrap border-b-2",
                  activeTab === tab
                    ? "text-blue-600 border-blue-600 bg-blue-50/30"
                    : "text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-50"
                )}
              >
                {tab === 'MEMBERS' ? 'MEMBERS' : tab === 'MEETINGS' ? 'MEETINGS' : tab}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'OVERVIEW' ? (
              <div className="space-y-8">
                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Akses Cepat</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <button
                      onClick={() => handleAddContent('ACHIEVEMENT')}
                      className="p-4 rounded-2xl border border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-left group"
                    >
                      <Trophy className="text-slate-400 group-hover:text-blue-600 mb-2" size={20} />
                      <p className="font-bold text-slate-700 text-sm">Input Prestasi</p>
                    </button>
                    <button
                      onClick={() => handleAddContent('MEMBER')}
                      className="p-4 rounded-2xl border border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-left group"
                    >
                      <Users className="text-slate-400 group-hover:text-blue-600 mb-2" size={20} />
                      <p className="font-bold text-slate-700 text-sm">Kelola Anggota</p>
                    </button>
                    <button
                      onClick={() => handleAddContent('DIVISION')}
                      className="p-4 rounded-2xl border border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-left group"
                    >
                      <LayoutDashboard className="text-slate-400 group-hover:text-blue-600 mb-2" size={20} />
                      <p className="font-bold text-slate-700 text-sm">Kelola Divisi</p>
                    </button>
                    <button
                      onClick={() => handleAddContent('COMPETITION')}
                      className="p-4 rounded-2xl border border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-left group"
                    >
                      <Flag className="text-slate-400 group-hover:text-blue-600 mb-2" size={20} />
                      <p className="font-bold text-slate-700 text-sm">Update Lomba</p>
                    </button>
                    <button
                      onClick={() => handleAddContent('MEETING')}
                      className="p-4 rounded-2xl border border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-left group"
                    >
                      <Calendar className="text-slate-400 group-hover:text-blue-600 mb-2" size={20} />
                      <p className="font-bold text-slate-700 text-sm">Buat Rapat</p>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in duration-300">
                {/* Search & Filter Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                  <div className="relative w-full sm:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={`Cari ${activeTab.toLowerCase()}...`}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => handleAddContent(activeTab === 'MEETINGS' ? 'MEETING' : activeTab.slice(0, -1) as ContentType)}
                    className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
                  >
                    <Plus size={18} />
                    Tambah
                  </button>
                </div>

                {/* Table with Real Data */}
                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-20 bg-slate-50 animate-pulse rounded-xl"></div>
                      ))}
                    </div>
                  ) : (
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                          <th className="pb-4 pl-4">ID</th>
                          <th className="pb-4">Info</th>
                          <th className="pb-4">Status</th>
                          <th className="pb-4">Tanggal</th>
                          <th className="pb-4 text-right pr-4">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {(() => {
                          const filteredData = getFilteredData(activeTab);
                          const data = filteredData !== null ? filteredData : (
                            activeTab === 'ACHIEVEMENTS' ? achievements :
                            activeTab === 'DIVISIONS' ? divisions :
                            activeTab === 'COMPETITIONS' ? competitions :
                            activeTab === 'MEETINGS' ? meetings :
                            members
                          );

                          if (data.length === 0) {
                            return (
                              <tr>
                                <td colSpan={5} className="py-12 text-center text-slate-400">
                                  {searchQuery ? 'Tidak ada hasil pencarian' : 'Belum ada data untuk ditampilkan'}
                                </td>
                              </tr>
                            );
                          }

                          return data.map((item: any) => (
                            <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                              <td className="py-5 pl-4 text-sm font-medium text-slate-500">#{item.id.slice(-6)}</td>
                              <td className="py-5">
                                <div className="flex items-center gap-3">
                                  {(item.image || item.fullname) && (
                                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-slate-100 flex-shrink-0">
                                      {item.image ? (
                                        <img src={item.image} alt={item.name || item.fullname} className="h-full w-full object-cover" />
                                      ) : (
                                        <div className="h-full w-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm">
                                          {item.fullname?.charAt(0) || '?'}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                  <div>
                                    <p className="font-bold text-slate-900 text-sm">
                                      {item.fullname || item.name || item.title}
                                    </p>
                                    <p className="text-xs text-slate-400 line-clamp-1">
                                      {item.ranking ? `Juara ${item.ranking}` :
                                       item.position ? item.position :
                                       item.location ? `📍 ${item.location}` :
                                       item.description?.slice(0, 50)}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-5">
                                <span className="px-2.5 py-1 rounded-lg bg-green-50 text-green-600 text-xs font-bold">Aktif</span>
                              </td>
                              <td className="py-5 text-sm text-slate-500">
                                {new Date(item.createdAt).toLocaleDateString('id-ID')}
                              </td>
                              <td className="py-5 text-right pr-4">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {activeTab === 'MEETINGS' && (
                                    <button
                                      onClick={() => handleViewAttendance(item)}
                                      className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                                      title="Lihat Kehadiran"
                                    >
                                      <Eye size={16} />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleEdit(item, activeTab === 'MEETINGS' ? 'MEETING' : activeTab.slice(0, -1) as ContentType)}
                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                  >
                                    <Edit size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(item, activeTab === 'MEETINGS' ? 'MEETING' : activeTab.slice(0, -1) as ContentType)}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ));
                        })()}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CRUD Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95">
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-100 bg-white">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {modalType === 'CREATE' ? 'Tambah' : 'Edit'} {selectedItem.type}
                </h2>
                <p className="text-xs text-slate-500">
                  {modalType === 'CREATE' ? 'Isi form di bawah untuk menambahkan' : 'Update data di bawah'}
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              {renderFormFields()}
              
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      {modalType === 'CREATE' ? 'Simpan' : 'Update'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Attendance Modal */}
      {isAttendanceModalOpen && selectedMeetingForAttendance && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Daftar Kehadiran Rapat</h2>
                <p className="text-sm text-slate-500 mt-1">{selectedMeetingForAttendance.title}</p>
              </div>
              <button
                onClick={() => setIsAttendanceModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Stats Cards */}
              {(() => {
                const { stats, totalMembers, belumIsi } = getAttendanceStats();
                return (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-green-50 border border-green-100">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="text-green-600" size={20} />
                        <span className="text-xs font-bold text-green-700 uppercase">Hadir</span>
                      </div>
                      <p className="text-2xl font-bold text-green-700">{stats.hadir}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="text-blue-600" size={20} />
                        <span className="text-xs font-bold text-blue-700 uppercase">Izin</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-700">{stats.izin}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="text-amber-600" size={20} />
                        <span className="text-xs font-bold text-amber-700 uppercase">Sakit</span>
                      </div>
                      <p className="text-2xl font-bold text-amber-700">{stats.sakit}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-100">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="text-red-600" size={20} />
                        <span className="text-xs font-bold text-red-700 uppercase">Alpha</span>
                      </div>
                      <p className="text-2xl font-bold text-red-700">{stats.alpha + belumIsi}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="text-slate-600" size={20} />
                        <span className="text-xs font-bold text-slate-700 uppercase">Total</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-700">{totalMembers}</p>
                    </div>
                  </div>
                );
              })()}

              {/* Attendance List */}
              {attendanceLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-16 bg-slate-100 animate-pulse rounded-xl"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-700 mb-4">Daftar Anggota yang Sudah Isi Presensi</h3>
                  {attendanceList.length > 0 ? (
                    attendanceList.map((attendance: any) => {
                      const member = allMembers.find(m => m.id === attendance.memberId);
                      const statusColor: Record<string, string> = {
                        HADIR: 'bg-green-100 text-green-700',
                        IZIN: 'bg-blue-100 text-blue-700',
                        SAKIT: 'bg-amber-100 text-amber-700',
                        ALPHA: 'bg-red-100 text-red-700'
                      };
                      const colorClass = statusColor[attendance.status] || 'bg-slate-100 text-slate-700';

                      return (
                        <div key={attendance.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-slate-200 flex-shrink-0">
                              {member?.image ? (
                                <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                              ) : (
                                <div className="h-full w-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                                  {member?.name?.charAt(0) || '?'}
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 text-sm">{member?.name || 'Unknown'}</p>
                              <p className="text-xs text-slate-500">{member?.nim} • {member?.position}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${colorClass}`}>
                              {attendance.status}
                            </span>
                            <span className="text-xs text-slate-400">
                              {new Date(attendance.createdAt).toLocaleDateString('id-ID')}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-12 text-slate-400">
                      <FileText size={48} className="mx-auto mb-3 opacity-50" />
                      <p>Belum ada yang mengisi presensi untuk rapat ini</p>
                    </div>
                  )}

                  {/* Belum Isi Section */}
                  {(() => {
                    const memberIdsWithAttendance = new Set(attendanceList.map((a: any) => a.memberId));
                    const membersBelumIsi = allMembers.filter(m => !memberIdsWithAttendance.has(m.id));

                    if (membersBelumIsi.length > 0) {
                      return (
                        <div className="mt-6 pt-6 border-t border-slate-200">
                          <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                            <XCircle size={16} className="text-red-600" />
                            Belum Isi Presensi ({membersBelumIsi.length})
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {membersBelumIsi.map((member: any) => (
                              <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg border border-red-100 bg-red-50">
                                <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-red-200 flex-shrink-0">
                                  {member.image ? (
                                    <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                                  ) : (
                                    <div className="h-full w-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">
                                      {member.name?.charAt(0)}
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-bold text-slate-900 text-sm">{member.name}</p>
                                  <p className="text-xs text-slate-500">{member.nim}</p>
                                </div>
                                <span className="px-2 py-1 rounded text-xs font-bold bg-red-100 text-red-700">
                                  Belum Isi
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
