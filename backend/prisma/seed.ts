import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...\n");

  // 1. CLEANUP
  console.log("🗑️  Cleaning existing data...");
  await prisma.attendance.deleteMany();
  await prisma.meeting.deleteMany();
  await prisma.member.deleteMany();
  await prisma.division.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.competition.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.user.deleteMany();
  console.log("✅ Data cleaned.\n");

  // 2. SEED USERS
  console.log("👤 Seeding users...");
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "admin123";
  const memberPassword = process.env.SEED_MEMBER_PASSWORD || "member123";
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
  const hashedMemberPassword = await bcrypt.hash(memberPassword, 10);

  const adminUser = await prisma.user.create({
    data: {
      username: "admin",
      password: hashedAdminPassword,
      role: "admin",
    },
  });
  console.log(`✅ Admin user created: ${adminUser.username}`);

  const memberUser = await prisma.user.create({
    data: {
      username: "member",
      password: hashedMemberPassword,
      role: "user",
    },
  });
  console.log(`✅ Member user created: ${memberUser.username}\n`);

  // 3. SEED DIVISIONS
  console.log("🏢 Seeding divisions...");
  const divisions = await Promise.all([
    prisma.division.create({
      data: {
        name: "BPH",
        description: "Badan Pengurus Harian HMIF",
        image: "logo_bph.jpg",
      },
    }),
    prisma.division.create({
      data: {
        name: "PSDM",
        description: "Divisi yang fokus pada pengembangan softskill dan hardskill anggota HMTI",
        image: "logo_psdm.jpg",
      },
    }),
    prisma.division.create({
      data: {
        name: "Kominfo",
        description: "Divisi yang mengelola informasi dan komunikasi internal-eksternal HMTI",
        image: "logo_kominfo.jpg",
      },
    }),
    prisma.division.create({
      data: {
        name: "Humas",
        description: "Divisi yang membangun relasi dengan pihak eksternal dan sponsorship",
        image: "logo_humas.jpg",
      },
    }),
    prisma.division.create({
      data: {
        name: "Ristek",
        description: "Divisi yang fokus pada penelitian dan pengembangan teknologi",
        image: "logo_ristek.jpg",
      },
    }),
    prisma.division.create({
      data: {
        name: "KWU",
        description: "Divisi yang mengembangkan jiwa entrepreneurship mahasiswa",
        image: "logo_kwu.jpg",
      },
    }),
    prisma.division.create({
      data: {
        name: "MinatBakat",
        description: "Divisi yang mewadahi minat dan bakat mahasiswa",
        image: "logo_minatbakat.jpg",
      },
    }),
  ]);
  console.log(`✅ ${divisions.length} divisions created.\n`);

  // 4. SEED MEMBERS
  console.log("👥 Seeding members...");
  const members = await prisma.member.createMany({
    data: [
      // BPH (Division 1)
      {
        divisionId: divisions[0].id,
        name: "Naufal Alam Haidar",
        position: "Ketua HMIF",
        nim: "2301010001",
      },
      {
        divisionId: divisions[0].id,
        name: "Muhammad Sahbilul Khoir",
        position: "Wakil Ketua",
        nim: "2301010002",
      },
      {
        divisionId: divisions[0].id,
        name: "Latifah Nur Qalbi",
        position: "Sekretaris 1",
        nim: "2301010003",
      },
      {
        divisionId: divisions[0].id,
        name: "Achmad Ricky Hariono",
        position: "Sekretaris 2",
        nim: "2301010004",
      },
      {
        divisionId: divisions[0].id,
        name: "Muhammad Rafli Afriansyah",
        position: "Bendahara 1",
        nim: "2301010005",
      },
      {
        divisionId: divisions[0].id,
        name: "Regita Lundi Tifara",
        position: "Bendahara 2",
        nim: "2301010006",
      },

      // PSDM (Division 2)
      {
        divisionId: divisions[1].id,
        name: "Muhammad Bimo Adyatma Broto",
        position: "Ketua",
        nim: "2301010007",
      },
      {
        divisionId: divisions[1].id,
        name: "Abinaya Arya Zaidan",
        position: "Anggota",
        nim: "2301010008",
      },
      {
        divisionId: divisions[1].id,
        name: "Ratna Agustina",
        position: "Anggota",
        nim: "2301010009",
      },
      {
        divisionId: divisions[1].id,
        name: "Muhammad Arya Ivandi Rohman",
        position: "Anggota",
        nim: "2301010010",
      },
      {
        divisionId: divisions[1].id,
        name: "Muhammad Daniel Ary",
        position: "Anggota",
        nim: "2301010011",
      },
      {
        divisionId: divisions[1].id,
        name: "Raafa Nabil Rabbani",
        position: "Anggota",
        nim: "2301010012",
      },
      {
        divisionId: divisions[1].id,
        name: "Raditya Fahrezi Putra Ahsan",
        position: "Anggota",
        nim: "2301010013",
      },
      {
        divisionId: divisions[1].id,
        name: "Fidyah Afifah Azis",
        position: "Anggota",
        nim: "2301010014",
      },
      {
        divisionId: divisions[1].id,
        name: "Rhenita Theresia Grace B",
        position: "Anggota",
        nim: "2301010015",
      },

      // Kominfo (Division 3)
      {
        divisionId: divisions[2].id,
        name: "Arya Putra Irwansyah",
        position: "Ketua",
        nim: "2301010016",
      },
      {
        divisionId: divisions[2].id,
        name: "Muhammad Amirun Nadhif",
        position: "Anggota",
        nim: "2301010017",
      },
      {
        divisionId: divisions[2].id,
        name: "Rasendriyo Reswara Iriawanto",
        position: "Anggota",
        nim: "2301010018",
      },
      {
        divisionId: divisions[2].id,
        name: "Ahmad Nazar Khoirul Amin",
        position: "Anggota",
        nim: "2301010019",
      },
      { divisionId: divisions[2].id, name: "Azka Liano", position: "Anggota", nim: "2301010020" },
      {
        divisionId: divisions[2].id,
        name: "Lilyana Fitria Sari",
        position: "Anggota",
        nim: "2301010021",
      },
      {
        divisionId: divisions[2].id,
        name: "Angga Dwi Putra",
        position: "Anggota",
        nim: "2301010022",
      },
      {
        divisionId: divisions[2].id,
        name: "Agustia Eriani",
        position: "Anggota",
        nim: "2301010023",
      },

      // Humas (Division 4)
      { divisionId: divisions[3].id, name: "Miftahul Ulum", position: "Ketua", nim: "2301010024" },
      {
        divisionId: divisions[3].id,
        name: "Gizha Nasywa Islamy Pasya",
        position: "Anggota",
        nim: "2301010025",
      },
      {
        divisionId: divisions[3].id,
        name: "Moh Farizal Sholahuddin Ghoni",
        position: "Anggota",
        nim: "2301010026",
      },
      {
        divisionId: divisions[3].id,
        name: "Ahmad Andi Alfiansyah",
        position: "Anggota",
        nim: "2301010027",
      },
      {
        divisionId: divisions[3].id,
        name: "Muhammad Riyash Kediri Al Qu",
        position: "Anggota",
        nim: "2301010028",
      },
      {
        divisionId: divisions[3].id,
        name: "Muhammad Rizqi Fadhlilah",
        position: "Anggota",
        nim: "2301010029",
      },
      {
        divisionId: divisions[3].id,
        name: "Rendy Hikmawan Saputro",
        position: "Anggota",
        nim: "2301010030",
      },
      {
        divisionId: divisions[3].id,
        name: "Alfian Khusnul Fatoni",
        position: "Anggota",
        nim: "2301010031",
      },

      // Ristek (Division 5)
      {
        divisionId: divisions[4].id,
        name: "Rahmansyah Ragil Cahyadi",
        position: "Ketua",
        nim: "2301010032",
      },
      {
        divisionId: divisions[4].id,
        name: "Alicya Khusnul Chotimah",
        position: "Anggota",
        nim: "2301010033",
      },
      {
        divisionId: divisions[4].id,
        name: "Rio Octavian Mangembulude",
        position: "Anggota",
        nim: "2301010034",
      },
      {
        divisionId: divisions[4].id,
        name: "Achmad Zacky Ghoutsu",
        position: "Anggota",
        nim: "2301010035",
      },
      { divisionId: divisions[4].id, name: "Nia Ramadani", position: "Anggota", nim: "2301010036" },
      {
        divisionId: divisions[4].id,
        name: "Nuruddin Rusydi Ilham",
        position: "Anggota",
        nim: "2301010037",
      },
      {
        divisionId: divisions[4].id,
        name: "Okta Putra Ramadhan",
        position: "Anggota",
        nim: "2301010038",
      },

      // KWU (Division 6)
      {
        divisionId: divisions[5].id,
        name: "Ruziqna Hadika Filardi Muhtarom",
        position: "Ketua",
        nim: "2301010039",
      },
      {
        divisionId: divisions[5].id,
        name: "Muhammad Fakhrudin",
        position: "Anggota",
        nim: "2301010040",
      },
      {
        divisionId: divisions[5].id,
        name: "Muhammad Muqoffin Nuha",
        position: "Anggota",
        nim: "2301010041",
      },
      {
        divisionId: divisions[5].id,
        name: "Amelia Ma'rifah",
        position: "Anggota",
        nim: "2301010042",
      },
      {
        divisionId: divisions[5].id,
        name: "Muhammad Awaludin Ikbar",
        position: "Anggota",
        nim: "2301010043",
      },
      {
        divisionId: divisions[5].id,
        name: "Muhammad Faidza Airlangga",
        position: "Anggota",
        nim: "2301010044",
      },
      {
        divisionId: divisions[5].id,
        name: "Naila Nur Hidayah",
        position: "Anggota",
        nim: "2301010045",
      },
      {
        divisionId: divisions[5].id,
        name: "Arfanta Pradana Putra Bayu",
        position: "Anggota",
        nim: "2301010046",
      },

      // MinatBakat (Division 7)
      {
        divisionId: divisions[6].id,
        name: "Ruziqna Hadika Filardi Muhtarom",
        position: "Ketua",
        nim: "2301010047",
      },
      {
        divisionId: divisions[6].id,
        name: "Muhammad Fakhrudin",
        position: "Anggota",
        nim: "2301010048",
      },
      {
        divisionId: divisions[6].id,
        name: "Muhammad Muqoffin Nuha",
        position: "Anggota",
        nim: "2301010049",
      },
      {
        divisionId: divisions[6].id,
        name: "Amelia Ma'rifah",
        position: "Anggota",
        nim: "2301010050",
      },
      {
        divisionId: divisions[6].id,
        name: "Muhammad Awaludin Ikbar",
        position: "Anggota",
        nim: "2301010051",
      },
      {
        divisionId: divisions[6].id,
        name: "Muhammad Faidza Airlangga",
        position: "Anggota",
        nim: "2301010052",
      },
      {
        divisionId: divisions[6].id,
        name: "Naila Nur Hidayah",
        position: "Anggota",
        nim: "2301010053",
      },
      {
        divisionId: divisions[6].id,
        name: "Arfanta Pradana Putra Bayu",
        position: "Anggota",
        nim: "2301010054",
      },
    ],
  });
  console.log(`✅ ${members.count} members created.\n`);

  // 5. SEED ACHIEVEMENTS
  console.log("🏆 Seeding achievements...");
  const achievements = await Promise.all([
    prisma.achievement.create({
      data: {
        fullname: "Muhammad Faidza Airlangga",
        ranking: 1,
        description: "UPZ BAZNAS SEMEN INDONESIA - PENERIMA BEASISWA",
        image: "/images/faidza.jpg",
      },
    }),
    prisma.achievement.create({
      data: {
        fullname: "Muhammad Arya Ivandy Rohman",
        ranking: 1,
        description: "Ketua Pelaksana LKMM PRA-TD UISI 2025",
        image: "/images/arya.jpg",
      },
    }),
    prisma.achievement.create({
      data: {
        fullname: "Puji Andayani, S.Si., M.Si., M.Sc., MCE, MOS",
        ranking: 1,
        description: "Dosen Teladan UISI 2025 - SIG FOUNDATION",
        image: "/images/dosen.jpg",
      },
    }),
  ]);
  console.log(`✅ ${achievements.length} achievements created.\n`);

  // 6. SEED COMPETITIONS
  console.log("🎯 Seeding competitions...");
  const competitions = await Promise.all([
    prisma.competition.create({
      data: {
        title: "Gemastik 2025",
        description: "Kompetisi inovasi teknologi informasi tingkat nasional",
        link: "https://gemastik.kemdikbud.go.id",
      },
    }),
    prisma.competition.create({
      data: {
        title: "Hackathon UI 2025",
        description: "Lomba pengembangan aplikasi dengan tema smart campus",
        link: "https://hackathon.ui.ac.id",
      },
    }),
    prisma.competition.create({
      data: {
        title: "CTF Competition 2025",
        description: "Capture The Flag cybersecurity competition",
        link: "https://ctf.example.com",
      },
    }),
  ]);
  console.log(`✅ ${competitions.length} competitions created.\n`);

  // 7. SEED BLOGS
  console.log("📝 Seeding blogs...");
  const blogs = await Promise.all([
    prisma.blog.create({
      data: {
        title: "Panduan Belajar TypeScript untuk Pemula",
        content:
          "TypeScript adalah bahasa pemrograman yang dibangun di atas JavaScript dengan menambahkan type annotations. Ini membantu developer menulis kode yang lebih aman dan maintainable...\n\n## Mengapa TypeScript?\n\n1. **Type Safety** - Mendeteksi error saat development\n2. **Better IDE Support** - Autocomplete lebih akurat\n3. **Refactoring** - Lebih mudah refactor codebase besar",
        image: "/images/blog-typescript.jpg",
      },
    }),
    prisma.blog.create({
      data: {
        title: "Tips Sukses di Dunia Programming",
        content:
          "Berikut adalah beberapa tips yang bisa membantu kamu dalam belajar programming:\n\n1. Konsisten setiap hari minimal 1 jam\n2. Buat project nyata, bukan hanya tutorial\n3. Bergabung dengan komunitas\n4. Jangan takut error dan debugging\n5. Dokumentasikan pembelajaranmu",
        image: "/images/blog-tips.jpg",
      },
    }),
  ]);
  console.log(`✅ ${blogs.length} blogs created.\n`);

  // 8. SEED MEETINGS
  console.log("📅 Seeding meetings...");
  const meetings = await Promise.all([
    prisma.meeting.create({
      data: {
        title: "Rapat Pleno HMIF",
        description: "Rapat pleno bulanan HMIF periode 2025",
        location: "Ruang Auditorium Lt.3",
        link: null,
      },
    }),
    prisma.meeting.create({
      data: {
        title: "Koordinasi Divisi PSDM",
        description: "Diskusi program kerja divisi PSDM bulan depan",
        location: null,
        link: "https://meet.google.com/abc-defg-hij",
      },
    }),
    prisma.meeting.create({
      data: {
        title: "Workshop Web Development",
        description: "Workshop dasar-dasar web development untuk anggota baru",
        location: "Lab Komputer 201",
        link: null,
      },
    }),
  ]);
  console.log(`✅ ${meetings.length} meetings created.\n`);

  // 9. SEED ATTENDANCE
  console.log("📋 Seeding attendance...");
  // Get some members for attendance
  const bphMembers = await prisma.member.findMany({
    where: { divisionId: divisions[0].id },
    take: 3,
  });

  const attendanceData = [];
  for (const member of bphMembers) {
    for (const meeting of meetings) {
      const statuses = ["HADIR", "IZIN", "SAKIT", "ALPHA"];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      attendanceData.push({
        memberId: member.id,
        meetingId: meeting.id,
        status: randomStatus,
      });
    }
  }

  const attendance = await prisma.attendance.createMany({
    data: attendanceData,
  });
  console.log(`✅ ${attendance.count} attendance records created.\n`);

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
