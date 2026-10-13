'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  User,
  MapPin,
  GraduationCap,
  Code2,
  Cpu,
  Layers,
  Zap,
  Activity,
  Gamepad2,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { ProfileData } from '@/types/content';

interface StoryShowcaseProps {
  profile: ProfileData;
}

export const StoryShowcase: React.FC<StoryShowcaseProps> = ({ profile }) => {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* =========================================================================
          ACT 1: THE ENGINEER & CORE IDENTITY
      ========================================================================= */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 lg:p-12 border border-card-border relative overflow-hidden bg-gradient-to-br from-white/90 via-white/70 to-ink-light/30 dark:from-card-dark/95 dark:via-card-dark/85 dark:to-ink/10 shadow-lg">
        {/* Ambient Halo Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-ink/10 dark:bg-ink/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan/10 dark:bg-cyan/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Column: Story Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1 rounded-full bg-ink/10 dark:bg-ink/20 text-ink dark:text-cyan border border-ink/20">
                <User className="w-3.5 h-3.5" />
                <span>// DEVELOPER_PROFILE</span>
              </span>
              <span className="text-xs font-mono text-muted flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-ink dark:text-cyan" />
                <span>{profile.school ?? 'โรงเรียนเทพศิรินทร์ สมุทรปราการ'}</span>
              </span>
              <span className="text-xs font-mono text-muted flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>{profile.location}</span>
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-deep leading-tight">
                ผสานโลกฮาร์ดแวร์และซอฟต์แวร์ เพื่อสร้างสรรค์นวัตกรรมที่แก้ปัญหาได้จริง
              </h2>
              <p className="text-xs font-mono text-cyan font-medium tracking-wide uppercase">
                Student Innovator · Embedded &amp; Software Developer · @nxt2pat
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-muted leading-relaxed font-sans">
              <p className="text-deep/90 dark:text-slate-200">
                สวัสดีครับ ผมนายณัฐภัทร ปัดไธสง ความหลงใหลในเทคโนโลยีของผมเริ่มต้นจากการได้ครอบครองคอมพิวเตอร์สเปกจำกัดในวัยเด็ก และประสบปัญหาการใช้งานมากมาย จึงเลือกศึกษาค้นคว้าวิธีแก้ไขด้วยตนเอง ตั้งแต่การปรับแต่งระบบให้เบาและรีดประสิทธิภาพสูงสุด ออกแบบระบบระบายความร้อน ไปจนถึงการถอดประกอบและเปลี่ยนชิ้นส่วนฮาร์ดแวร์ทั้งระบบด้วยตนเอง
              </p>
              <p className="text-deep/90 dark:text-slate-200">
                ประสบการณ์ดังกล่าวทำให้ผมเข้าใจอย่างลึกซึ้งว่า <strong className="text-ink dark:text-cyan font-medium">ปัญหาทางเทคโนโลยีส่วนใหญ่จำเป็นต้องอาศัยความรู้ทั้งด้านฮาร์ดแวร์และซอฟต์แวร์ควบคู่กัน</strong> จึงเป็นที่มาของความมุ่งมั่นที่จะพัฒนาตนเองในสายวิศวกรรมคอมพิวเตอร์ เพื่อสร้างสรรค์นวัตกรรมและระบบที่แก้ปัญหาการใช้งานจริงได้อย่างสมบูรณ์แบบ
              </p>
              <p className="text-sm border-l-2 border-ink/40 pl-3 italic text-muted">
                &ldquo;ผมขับเคลื่อนการทำงานด้วยแนวคิด <span className="font-semibold text-deep dark:text-white font-mono not-italic">&apos;ตั้งคำถามให้ลึก แล้วพิสูจน์ด้วยการลงมือทำจริง&apos;</span> เริ่มจากการวิเคราะห์ต้นตอของปัญหาอย่างเป็นระบบ เชื่อมโยงตรรกะของโปรแกรมเข้ากับวงจรฮาร์ดแวร์ และพัฒนาผ่านการสร้างชิ้นงานต้นแบบซ้ำๆ เพื่อให้มั่นใจว่าผลงานทุกชิ้นทำงานได้เสถียรและสร้างประโยชน์ได้จริงในโลกภายนอก&rdquo;
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/projects">
                <Button size="md" className="gap-2">
                  <span>Explore projects</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="md">
                  <span>Full Biography &amp; Credo</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Portrait Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-[340px] group">
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-ink/30 via-cyan/30 to-purple-600/30 blur-lg opacity-60 group-hover:opacity-90 transition-opacity" />

              <div className="relative rounded-3xl p-2.5 sm:p-3 bg-white/80 dark:bg-card-dark/90 border border-card-border/90 dark:border-ink/30 shadow-2xl backdrop-blur-xl">
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-card-border/60 bg-black/5 dark:bg-black/40">
                  <img
                    src="/images/profile-portrait.jpg"
                    alt="Natthaphat Patthaisong (Nxt2Pat)"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 left-3.5 right-3.5 text-white flex items-end justify-between pointer-events-none">
                    <div>
                      <div className="text-xs font-mono font-bold tracking-wide">NATTHAPHAT PATTHAISONG</div>
                      <div className="text-[10px] text-white/80 font-mono">DEBSIRIN SAMUTPRAKARN SCHOOL</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/20 text-cyan">
                      @nxt2pat
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ACT 2: HARDWARE BENCH SHOWCASE (TANGIBLE SYSTEMS)
      ========================================================================= */}
      <div className="space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-500 font-semibold uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>CHAPTER 01 // TANGIBLE SYSTEMS &amp; INNOVATION</span>
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-deep tracking-tight">
            Built on the bench. Proven in the field.
          </h3>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            ซอฟต์แวร์จะมีคุณค่าสูงสุดเมื่อเชื่อมโยงกับโลกความเป็นจริง ตั้งแต่แพลตฟอร์มตรวจวัดคุณภาพอากาศ DustWatch (NSC 2026) ระบบหุ่นยนต์กู้ภัยอัตโนมัติ ไปจนถึงการทดลองต่อวงจรไมโครคอนโทรลเลอร์ ESP32 และเซนเซอร์ตรวจวัด ทุกชิ้นงานได้รับการออกแบบและพิสูจน์ด้วยการลงมือทำจริง
          </p>
        </div>

        {/* Big Apple-style Feature Card with Hardware Workbench */}
        <div className="glass-panel rounded-3xl p-4 sm:p-8 border border-card-border overflow-hidden relative group bg-white/70 dark:bg-card-dark/70 shadow-lg">
          <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden border border-card-border/80 bg-black/20">
            <img
              src="/images/hardware-field.jpg"
              alt="Natthaphat Patthaisong testing hardware telemetry in the field"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white/90 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-cyan animate-pulse" />
                <span>HARDWARE SYSTEMS // DUSTWATCH</span>
              </span>
              <span className="hidden sm:inline px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-[11px] text-white/70">
                NSC 2026
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
              <div className="text-sm sm:text-lg font-serif font-bold tracking-tight">
                Embedded Telemetry
              </div>
              <div className="text-xs font-mono text-white/70 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>Microcontroller: ESP32-S3 / Arduino</span>
                <span>Projects: DustWatch (PM2.5 Telemetry)</span>
                <span>Protocols: LoRa 433MHz / MQTT / LittleFS</span>
              </div>
            </div>
          </div>

          {/* 3 Callout Pillars beneath the image: DustWatch, หุ่นยนต์, ESP32 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <div className="p-4 sm:p-5 rounded-2xl border border-card-border/80 bg-white/70 dark:bg-card-dark/80 backdrop-blur-sm space-y-2.5 hover:border-emerald-500/40 transition-colors shadow-xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-deep dark:text-white font-sans">
                    DustWatch (IoT &amp; AI)
                  </h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold whitespace-nowrap">
                  NSC 2026
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed font-sans">
                สถานีตรวจวัดคุณภาพอากาศเฉพาะพื้นที่ เชื่อมต่อเซนเซอร์ PMS5003 และ BME680 ส่งข้อมูลผ่าน LoRa / MQTT สำรองข้อมูลออฟไลน์บน Flash พร้อมโมเดล AI พยากรณ์ PM2.5 ล่วงหน้า
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl border border-card-border/80 bg-white/70 dark:bg-card-dark/80 backdrop-blur-sm space-y-2.5 hover:border-cyan/40 transition-colors shadow-xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-cyan/10 text-cyan dark:bg-cyan/20">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-deep dark:text-white font-sans">
                    หุ่นยนต์กู้ภัยอัตโนมัติ
                  </h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan/10 text-cyan border border-cyan/20 font-semibold whitespace-nowrap">
                  รองชนะเลิศอันดับ 2
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed font-sans">
                สร้างระบบขับเคลื่อนอัตโนมัติผ่านสนามจำลอง (EERC 2026 สจล. และ Coding Thailand) ชดเชยแรงบิดมอเตอร์ด้วย Wheel Encoder แบบเรียลไทม์เพื่อรักษาแนววิ่งที่เที่ยงตรง
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl border border-card-border/80 bg-white/70 dark:bg-card-dark/80 backdrop-blur-sm space-y-2.5 hover:border-ink/40 transition-colors shadow-xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-ink/10 dark:bg-ink/20 text-ink dark:text-cyan">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-deep dark:text-white font-sans">
                    การต่อวงจรไมโครคอนโทรลเลอร์ ESP32
                  </h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-ink/10 dark:bg-ink/20 text-ink dark:text-cyan border border-ink/20 font-semibold whitespace-nowrap">
                  ESP32-S3 Core
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed font-sans">
                ต่อวงจรบนเบรดบอร์ดร่วมกับโมดูลเซนเซอร์ สื่อสารผ่านบัส I2C / SPI จัดการหน่วยความจำ LittleFS และควบคุมการใช้พลังงานให้มีประสิทธิภาพสูงสุดเพื่อรองรับงานภาคสนาม
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ACT 3: SOFTWARE ARCHITECTURE & CREATIVE SYSTEMS
      ========================================================================= */}
      <div className="space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan font-semibold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>CHAPTER 02 // SOFTWARE ARCHITECTURE &amp; CREATIVE TOOLS</span>
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-deep tracking-tight">
            Resilient Architecture &amp; Creative Systems.
          </h3>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            พัฒนาตั้งแต่เครื่องมืออำนวยความสะดวกสำหรับนักพัฒนาเกม (RenLingo) เกมแนว Biological Roguelike (Micro-Invasion) ไปจนถึงเว็บแอปพลิเคชัน Next.js สถาปัตยกรรมออฟไลน์สมบูรณ์แบบ
          </p>
        </div>

        {/* Big Apple-style Feature Card with Ultrawide Workstation */}
        <div className="glass-panel rounded-3xl p-4 sm:p-8 border border-card-border overflow-hidden relative group bg-white/70 dark:bg-card-dark/70 shadow-lg">
          <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden border border-card-border/80 bg-black/20">
            <img
              src="/images/micro-invasion-hud.png"
              alt="Micro-Invasion biological roguelike gameplay interface and HUD"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white/90 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 flex items-center gap-2">
                <Gamepad2 className="w-3.5 h-3.5 text-ink animate-pulse" />
                <span>MICRO-INVASION</span>
              </span>
              <span className="hidden sm:inline px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-[11px] text-white/70">
                PYTHON · PYGAME
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
              <div className="text-sm sm:text-lg font-serif font-bold tracking-tight">
                Indie Game Development
              </div>
              <div className="text-xs font-mono text-white/70 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>Micro-Invasion: Biological Roguelike in Python</span>
              </div>
            </div>
          </div>

          {/* 3 Callout Pillars beneath the workstation image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <div className="p-4 sm:p-5 rounded-2xl border border-card-border/80 bg-white/70 dark:bg-card-dark/80 backdrop-blur-sm space-y-2.5 hover:border-ink/40 transition-colors shadow-xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-ink/10 dark:bg-ink/20 text-ink dark:text-cyan">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-deep dark:text-white font-sans">
                    เครื่องมือแปลภาษา RenLingo
                  </h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-ink/10 dark:bg-ink/20 text-ink dark:text-cyan border border-ink/20 font-semibold whitespace-nowrap">
                  JavaScript
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed font-sans">
                โปรแกรมอัตโนมัติสำหรับสกัด แปลภาษา และจัดการบทสนทนาเกม Visual Novel บนเอนจิน Ren&apos;Py ช่วยให้นักแปลสร้างแพตช์ภาษาไทยได้อย่างสะดวกรวดเร็ว
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl border border-card-border/80 bg-white/70 dark:bg-card-dark/80 backdrop-blur-sm space-y-2.5 hover:border-emerald-500/40 transition-colors shadow-xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-deep dark:text-white font-sans">
                    เกมโร้กไลค์ชีวภาพ Micro-Invasion
                  </h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold whitespace-nowrap">
                  Python / Pygame
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed font-sans">
                เกมแนวเอาชีวิตรอดและกลายพันธุ์ DNA ในระดับเซลล์ พัฒนาด้วย Python และ Pygame มุ่งเน้นความลื่นไหลของ Game Loop และตรรกะเกมที่เสถียร
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl border border-card-border/80 bg-white/70 dark:bg-card-dark/80 backdrop-blur-sm space-y-2.5 hover:border-cyan/40 transition-colors shadow-xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-cyan/10 text-cyan dark:bg-cyan/20">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-deep dark:text-white font-sans">
                    แพลตฟอร์มจำลอง CPR MedivisionAR
                  </h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan/10 text-cyan border border-cyan/20 font-semibold whitespace-nowrap">
                  Top 20 วิศวะ จุฬาฯ
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed font-sans">
                แพลตฟอร์มจำลองการฝึกกู้ชีพ CPR &amp; First Aid แบบ 3D Interactive ผ่านแนวคิด Gamification พัฒนาด้วย Next.js และ Supabase (ผ่านเข้ารอบ Semi-Final Top 20 ประเทศ งาน Thailand Metaverse Hackathon)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ACT 4: PHILOSOPHY STATEMENT & INVITATION
      ========================================================================= */}
      <div className="text-center py-10 px-6 sm:px-12 rounded-3xl border border-card-border bg-gradient-to-b from-white/90 via-ink-light/20 to-transparent dark:from-card-dark/90 dark:via-ink/10 dark:to-transparent space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-ink font-semibold">
            // THE ENGINEERING ETHOS
          </span>
          <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-deep leading-snug">
            &ldquo;ตั้งคำถามให้ลึก แล้วพิสูจน์ด้วยการลงมือทำจริง&rdquo;
          </blockquote>
          <p className="text-xs font-mono text-muted">
            — ณัฐภัทร ปัดไธสง (Nxt2Pat) · โรงเรียนเทพศิรินทร์ สมุทรปราการ
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/projects">
            <Button size="lg" className="shadow-lg shadow-ink/20">
              <span>Explore projects</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a
            href={profile.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg">
              <span>GitHub @nxt2pat</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
