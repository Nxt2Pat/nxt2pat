import React from 'react';
import type { Metadata } from 'next';
import {
  Terminal,
  Cpu,
  Layers,
  Search,
  CheckCircle2,
  Mail,
  ExternalLink,
  Monitor,
  Laptop,
  Server,
  Sparkles,
  Gamepad2,
  GraduationCap,
  MapPin,
} from 'lucide-react';
import { GithubIcon, FacebookIcon, InstagramIcon, DiscordIcon } from '@/components/ui/Icons';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { getProfileData } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About & Engineering Creed',
  description: 'Background, hardware workstation fleet (Perseverance, Rosalind, Pioneer), and engineering ethos of Natthaphat Patthaisong (Nxt2Pat).',
};

export default function AboutPage() {
  const profile = getProfileData();

  return (
    <div className="py-12">
      <Container className="max-w-4xl space-y-16">
        {/* Header */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink/10 dark:bg-ink/20 text-ink dark:text-cyan border border-ink/20 font-semibold uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5" />
              <span>// DEVELOPER_BIO</span>
            </span>
            <span className="flex items-center gap-1 text-muted px-2 py-0.5">
              <GraduationCap className="w-3.5 h-3.5 text-ink dark:text-cyan" />
              <span>{profile.school ?? 'โรงเรียนเทพศิรินทร์ สมุทรปราการ'}</span>
            </span>
            <span className="flex items-center gap-1 text-muted px-2 py-0.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>{profile.location}</span>
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-deep tracking-tight">
            Natthaphat Patthaisong
          </h1>
          <p className="text-lg sm:text-xl text-cyan font-mono font-medium">
            Student Innovator · Embedded &amp; Software Developer · @nxt2pat
          </p>
          <p className="text-base sm:text-lg text-muted leading-relaxed font-sans max-w-2xl">
            {profile.bio}
          </p>
        </section>

        {/* Narrative Biography */}
        <section className="space-y-5 text-base text-deep/90 dark:text-slate-200 leading-relaxed font-sans">
          <div className="p-6 rounded-2xl border border-card-border/80 bg-white/60 dark:bg-card-dark/60 backdrop-blur-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-deep dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-ink dark:text-cyan" />
              <span>จุดเริ่มต้นจากคอมพิวเตอร์สเปกจำกัด สู่การผสานฮาร์ดแวร์และซอฟต์แวร์</span>
            </h3>
            <p>
              ความหลงใหลในเทคโนโลยีของผมเริ่มต้นจากการได้ครอบครองคอมพิวเตอร์สเปกจำกัดในวัยเด็ก และประสบปัญหาติดขัดในการใช้งานหลายประการ แทนที่จะยอมแพ้ ผมจึงเลือกศึกษาค้นคว้าวิธีแก้ไขปัญหาด้วยตนเอง ตั้งแต่การปรับแต่งระบบปฏิบัติการให้เบาและรีดประสิทธิภาพสูงสุด ออกแบบระบบระบายความร้อน ศึกษาการโอเวอร์คล็อก ไปจนถึงการถอดประกอบ ดัดแปลง และเปลี่ยนชิ้นส่วนฮาร์ดแวร์ภายในเครื่องด้วยตนเองทั้งระบบ
            </p>
            <p>
              ประสบการณ์ดังกล่าวทำให้ผมเข้าใจอย่างลึกซึ้งว่า <strong className="text-ink dark:text-cyan font-medium">ปัญหาทางเทคโนโลยีส่วนใหญ่จำเป็นต้องอาศัยความรู้ทั้งด้านฮาร์ดแวร์และซอฟต์แวร์ควบคู่กัน</strong> หากพัฒนาแต่ซอฟต์แวร์โดยไม่เข้าใจฮาร์ดแวร์ โค้ดจะเทอะทะและสิ้นเปลืองทรัพยากร ในขณะเดียวกันฮาร์ดแวร์ที่ดีหากไร้ซอฟต์แวร์ที่เฉียบคม อุปกรณ์ก็ไม่สามารถทำงานได้อย่างเต็มศักยภาพ จึงเป็นที่มาของความมุ่งมั่นที่จะพัฒนาตนเองในสายวิศวกรรมคอมพิวเตอร์ เพื่อสร้างสรรค์นวัตกรรมที่แก้ปัญหาการใช้งานจริงได้อย่างสมบูรณ์แบบ
            </p>
          </div>
        </section>

        {/* The Engineering Ethos Card */}
        <section>
          <Card className="p-6 sm:p-8 bg-gradient-to-br from-white/90 via-white/80 to-ink-light/40 dark:from-card-dark/95 dark:via-card-dark/85 dark:to-ink/15 border-ink/30 space-y-5 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-mono text-ink dark:text-cyan uppercase tracking-wider font-semibold">
              <Cpu className="w-5 h-5 text-cyan" />
              <span>The Engineering Ethos &amp; Creed</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-deep dark:text-white">
              “ตั้งคำถามให้ลึก แล้วพิสูจน์ด้วยการลงมือทำจริง”
            </h2>
            <blockquote className="border-l-4 border-ink pl-4 italic text-deep/90 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
              &ldquo;เริ่มจากการวิเคราะห์ต้นตอของปัญหาอย่างเป็นระบบ เชื่อมโยงตรรกะของโปรแกรมเข้ากับวงจรฮาร์ดแวร์ และพัฒนาผ่านการสร้างชิ้นงานต้นแบบซ้ำๆ เพื่อให้มั่นใจว่าผลงานทุกชิ้นทำงานได้เสถียร ปลอดภัย และสร้างประโยชน์ได้จริงในโลกภายนอก&rdquo;
            </blockquote>
            <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans">
              เมื่อเราเริ่มต้นออกแบบบนพื้นฐานของความเข้าใจข้อจำกัดของฮาร์ดแวร์จริง ซอฟต์แวร์ที่พัฒนาขึ้นจะทำงานได้อย่างรวดเร็ว กินทรัพยากรน้อย และพร้อมรับมือกับทุกสถานการณ์ภาคสนาม
            </p>
          </Card>
        </section>

        {/* Hardware Rig Fleet Showcase (Perseverance, Rosalind, Pioneer) */}
        <section className="space-y-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-ink dark:text-cyan uppercase tracking-wider font-semibold">
              <Monitor className="w-4 h-4 text-cyan" />
              <span>// HARDWARE_FLEET &amp; WORKSTATION</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-deep dark:text-white">
              The Hardware Fleet: Optimized Machines
            </h3>
            <p className="text-sm text-muted leading-relaxed font-sans">
              เครื่องมือและสภาพแวดล้อมจริงที่ใช้ในการวิจัย ออกแบบ และพัฒนา ทุกเครื่องได้รับการปรับแต่งระบบอย่างพิถีพิถันเพื่อรีดประสิทธิภาพสูงสุดตามบทบาทหน้าที่
            </p>
          </div>

          {/* 3 Machine Showcase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Desktop: Perseverance */}
            <div className="p-5 rounded-2xl border border-card-border/80 bg-white/70 dark:bg-card-dark/80 backdrop-blur-sm space-y-4 hover:border-ink/50 transition-all shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-ink/10 dark:bg-ink/20 text-ink dark:text-cyan">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Primary Rig</span>
                  </span>
                </div>

                <div>
                  <div className="text-[11px] font-mono text-muted uppercase">Desktop Workstation</div>
                  <h4 className="font-serif text-xl font-bold text-deep dark:text-white tracking-tight">
                    Perseverance
                  </h4>
                </div>

                <div className="space-y-2 pt-2 border-t border-card-border/60 text-xs font-mono">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted">CPU:</span>
                    <span className="font-semibold text-deep dark:text-white">i3-9100</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted">RAM:</span>
                    <span className="font-semibold text-deep dark:text-white">12GB DDR4 (8+4G)</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted">GPU:</span>
                    <span className="font-semibold text-cyan">RX 590 GME 8GB</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted">OS:</span>
                    <span className="font-semibold text-deep dark:text-white">Windows 11 Pro</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted leading-relaxed font-sans pt-2 border-t border-card-border/40">
                คอมพิวเตอร์หลักสำหรับพัฒนาโปรแกรม คอมไพล์โค้ด และทดสอบระบบ
              </p>
            </div>

            {/* 2. Laptop: Rosalind */}
            <div className="p-5 rounded-2xl border border-card-border/80 bg-white/70 dark:bg-card-dark/80 backdrop-blur-sm space-y-4 hover:border-cyan/50 transition-all shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-cyan/10 dark:bg-cyan/20 text-cyan">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan/10 text-cyan border border-cyan/20 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                    <span>Field Rig</span>
                  </span>
                </div>

                <div>
                  <div className="text-[11px] font-mono text-muted uppercase">Portable Laptop</div>
                  <h4 className="font-serif text-xl font-bold text-deep dark:text-white tracking-tight">
                    Rosalind
                  </h4>
                </div>

                <div className="space-y-2 pt-2 border-t border-card-border/60 text-xs font-mono">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted">CPU:</span>
                    <span className="font-semibold text-deep dark:text-white">Athlon 3050u</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted">RAM:</span>
                    <span className="font-semibold text-deep dark:text-white">16GB DDR4</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted">GPU:</span>
                    <span className="font-semibold text-cyan">Radeon (on CPU)</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted">OS:</span>
                    <span className="font-semibold text-deep dark:text-white">Windows 11 Pro</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted leading-relaxed font-sans pt-2 border-t border-card-border/40">
                แล็ปท็อปพกพาสำหรับนำไปทดสอบ แฟลชบอร์ด ESP32 และพรีเซนต์ผลงาน
              </p>
            </div>

            {/* 3. Server: Pioneer */}
            <div className="p-5 rounded-2xl border border-card-border/80 bg-white/70 dark:bg-card-dark/80 backdrop-blur-sm space-y-4 hover:border-amber-500/50 transition-all shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-500">
                    <Server className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span>Server Node</span>
                  </span>
                </div>

                <div>
                  <div className="text-[11px] font-mono text-muted uppercase">Homelab Server</div>
                  <h4 className="font-serif text-xl font-bold text-deep dark:text-white tracking-tight">
                    Pioneer
                  </h4>
                </div>

                <div className="space-y-2 pt-2 border-t border-card-border/60 text-xs font-mono">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted">CPU:</span>
                    <span className="font-semibold text-deep dark:text-white">i5-3570</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted">RAM:</span>
                    <span className="font-semibold text-deep dark:text-white">4GB DDR3</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted">GPU:</span>
                    <span className="font-semibold text-cyan">Intel HD Graphics</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted">OS:</span>
                    <span className="font-semibold text-deep dark:text-white">Windows 10 Pro</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted leading-relaxed font-sans pt-2 border-t border-card-border/40">
                เซิร์ฟเวอร์จำลองในบ้าน รัน API Backend จัดเก็บฐานข้อมูล และรันเซอร์วิสพื้นหลัง
              </p>
            </div>
          </div>

        </section>

        {/* Development Approach & Engineering Mindset */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-deep dark:text-white">
              แนวทางการทำงานและการเรียนรู้
            </h3>
            <p className="text-xs sm:text-sm text-muted">
              แนวคิดและหลักปฏิบัติที่ผมยึดถือในการทดลอง พัฒนาโครงงาน และแก้ปัญหาทางวิศวกรรม
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-xl border border-card-border bg-white/50 dark:bg-card-dark/50 space-y-1.5 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-500">
                <Cpu className="w-4 h-4" />
                <span>เข้าใจฮาร์ดแวร์ควบคู่กับโค้ด</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                ไม่เขียนโปรแกรมโดยมองข้ามระบบกายภาพ แต่คำนึงถึงขีดจำกัดของวงจร การใช้พลังงาน และหน่วยความจำของอุปกรณ์เสมอ
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl border border-card-border bg-white/50 dark:bg-card-dark/50 space-y-1.5 hover:border-cyan/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan">
                <Layers className="w-4 h-4" />
                <span>ลงมือสร้างชิ้นงานต้นแบบจริง</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                เริ่มต้นจากการต่อวงจรบน Breadboard และทดสอบกับเซนเซอร์จริง เพื่อให้เห็นปัญหาที่ทฤษฎีในห้องเรียนอาจไม่ได้บอก
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl border border-card-border bg-white/50 dark:bg-card-dark/50 space-y-1.5 hover:border-ink/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-ink dark:text-cyan">
                <Search className="w-4 h-4" />
                <span>วิเคราะห์และแก้ปัญหาจากต้นตอ</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                เมื่อระบบทำงานผิดพลาด จะค่อยๆ ตรวจสอบอย่างเป็นระบบ ตั้งแต่จุดเชื่อมต่อสายไฟ สัญญาณลอจิก จนถึงตรรกะของโปรแกรม
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl border border-card-border bg-white/50 dark:bg-card-dark/50 space-y-1.5 hover:border-amber-500/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-500">
                <CheckCircle2 className="w-4 h-4" />
                <span>เรียบง่ายและใช้งานได้จริง</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                เลือกใช้เครื่องมือและเทคโนโลยีที่เหมาะสมกับโจทย์ ไม่เพิ่มความซับซ้อนเกินจำเป็น เพื่อให้ระบบเสถียรและดูแลรักษาง่าย
              </p>
            </div>
          </div>
        </section>

        {/* Contact Channels Hub */}
        <section id="contact" className="pt-10 border-t border-card-border space-y-6 scroll-mt-24">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-ink dark:text-cyan uppercase tracking-wider font-semibold">
              <Mail className="w-4 h-4" />
              <span>// COMMUNICATION_CHANNELS</span>
            </div>
            <h3 className="font-serif text-3xl font-bold text-deep dark:text-white">
              Direct Contact &amp; Channels
            </h3>
            <p className="text-sm text-muted max-w-2xl leading-relaxed">
              ยินดีแลกเปลี่ยนความคิดเห็นด้านระบบสมองกลฝังตัว ฮาร์ดแวร์ IoT ซอฟต์แวร์ หรือปรึกษาพูดคุยผ่านช่องทางด้านล่างนี้ได้เลยครับ:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Email Channel */}
            <a
              href={profile.socialLinks.gmail ?? profile.socialLinks.email ?? 'mailto:nxt2pat@gmail.com'}
              className="group p-5 rounded-2xl border border-card-border bg-white/70 dark:bg-card-dark/70 hover:border-ink/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-ink/10 dark:bg-ink/20 flex items-center justify-center text-ink dark:text-cyan group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-emerald-500 font-semibold">Direct Email</span>
                </div>
                <h4 className="font-serif text-base font-bold text-deep dark:text-white group-hover:text-ink dark:group-hover:text-cyan transition-colors">
                  Electronic Mail
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  สำหรับติดต่อพูดคุย ปรึกษาโครงงาน หรือความร่วมมือทางเทคนิค
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-ink dark:text-cyan pt-2 border-t border-card-border/60">
                <span>nxt2pat@gmail.com</span>
                <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-70 group-hover:opacity-100" />
              </div>
            </a>

            {/* GitHub Channel */}
            <a
              href={profile.socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="group p-5 rounded-2xl border border-card-border bg-white/70 dark:bg-card-dark/70 hover:border-ink/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-deep dark:text-white group-hover:scale-110 transition-transform">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-muted">Open Source</span>
                </div>
                <h4 className="font-serif text-base font-bold text-deep dark:text-white group-hover:text-ink dark:group-hover:text-cyan transition-colors">
                  GitHub Profile
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  คลังเก็บโค้ด โอเพนซอร์ส ไลบรารีฮาร์ดแวร์ และประวัติการคอมมิต
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-deep dark:text-white pt-2 border-t border-card-border/60">
                <span>github.com/nxt2pat</span>
                <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-70 group-hover:opacity-100" />
              </div>
            </a>

            {/* Itch.io Channel */}
            <a
              href={profile.socialLinks.itchio ?? 'https://nxt2pat.itch.io'}
              target="_blank"
              rel="noreferrer"
              className="group p-5 rounded-2xl border border-card-border bg-white/70 dark:bg-card-dark/70 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-emerald-500">Creative Games</span>
                </div>
                <h4 className="font-serif text-base font-bold text-deep dark:text-white group-hover:text-emerald-500 transition-colors">
                  Itch.io Games
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  เกมอินดี้และเครื่องมือสร้างสรรค์ เช่น Micro-Invasion และ Ashborne
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-deep dark:text-white pt-2 border-t border-card-border/60">
                <span>nxt2pat.itch.io</span>
                <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-70 group-hover:opacity-100" />
              </div>
            </a>

            {/* Facebook Channel */}
            <a
              href={profile.socialLinks.facebook ?? 'https://www.facebook.com/share/1K5uoK1xsD/'}
              target="_blank"
              rel="noreferrer"
              className="group p-5 rounded-2xl border border-card-border bg-white/70 dark:bg-card-dark/70 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FacebookIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-blue-500">Facebook</span>
                </div>
                <h4 className="font-serif text-base font-bold text-deep dark:text-white group-hover:text-blue-500 transition-colors">
                  Facebook Profile
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  ช่องทางติดต่อส่วนตัว การศึกษา และการแชร์กิจกรรมผลงานวิชาการ
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-deep dark:text-white pt-2 border-t border-card-border/60">
                <span>facebook.com/nxt2pat</span>
                <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-70 group-hover:opacity-100" />
              </div>
            </a>

            {/* Instagram Channel */}
            <a
              href={profile.socialLinks.instagram ?? 'https://instagram.com/_akira.soju'}
              target="_blank"
              rel="noreferrer"
              className="group p-5 rounded-2xl border border-card-border bg-white/70 dark:bg-card-dark/70 hover:border-pink-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-pink-500">Instagram</span>
                </div>
                <h4 className="font-serif text-base font-bold text-deep dark:text-white group-hover:text-pink-500 transition-colors">
                  Instagram
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  ไลฟ์สไตล์ บรรยากาศการทดสอบระบบภาคสนาม และกิจกรรมในโรงเรียน
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-deep dark:text-white pt-2 border-t border-card-border/60">
                <span>@_akira.soju</span>
                <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-70 group-hover:opacity-100" />
              </div>
            </a>

            {/* Discord Channel */}
            <a
              href={profile.socialLinks.discord ?? 'https://discord.com/nxt2pat_'}
              target="_blank"
              rel="noreferrer"
              className="group p-5 rounded-2xl border border-card-border bg-white/70 dark:bg-card-dark/70 hover:border-indigo-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <DiscordIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-indigo-400">Discord</span>
                </div>
                <h4 className="font-serif text-base font-bold text-deep dark:text-white group-hover:text-indigo-400 transition-colors">
                  Discord Handle
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  พูดคุยแลกเปลี่ยนแบบเรียลไทม์ ปรึกษาโค้ดดิ้ง และแวดวงเกมเมอร์
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-deep dark:text-white pt-2 border-t border-card-border/60">
                <span>nxt2pat_</span>
                <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-70 group-hover:opacity-100" />
              </div>
            </a>
          </div>
        </section>
      </Container>
    </div>
  );
}
