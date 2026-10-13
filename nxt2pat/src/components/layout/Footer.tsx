import React from 'react';
import Link from 'next/link';
import { Mail, Heart, Gamepad2 } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { Container } from '@/components/ui/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-card-border mt-20 bg-white/40 dark:bg-card-dark/40 backdrop-blur-xs pb-[env(safe-area-inset-bottom,1.5rem)] pt-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-start justify-between">
          {/* Identity & Creed */}
          <div className="space-y-3 max-w-lg">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg text-deep">NATTHAPHAT PATTHAISONG</span>
              <span className="text-xs font-mono text-cyan px-2 py-0.5 rounded-full bg-cyan/10 border border-cyan/20">
                @nxt2pat
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed font-sans">
              ผสานโลกฮาร์ดแวร์และซอฟต์แวร์ เพื่อสร้างสรรค์นวัตกรรมที่แก้ปัญหาได้จริง — จากระบบสมองกลฝังตัว IoT, หุ่นยนต์อัตโนมัติ ไปจนถึงเว็บแอปพลิเคชันความเร็วสูง
            </p>
          </div>

          {/* Direct Channels */}
          <div className="space-y-3 md:text-right md:flex md:flex-col md:items-end">
            <h4 className="text-xs font-mono uppercase tracking-wider text-deep font-semibold">
              Connect &amp; Channels
            </h4>
            <div className="flex flex-wrap gap-2.5 md:justify-end">
              <a
                href="https://github.com/nxt2pat"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-card-border text-xs font-medium text-deep hover:border-ink hover:text-ink transition-colors bg-white/70 dark:bg-card-dark/70"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://nxt2pat.itch.io"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-card-border text-xs font-medium text-deep hover:border-emerald-500 hover:text-emerald-500 transition-colors bg-white/70 dark:bg-card-dark/70"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Itch.io</span>
              </a>
              <Link
                href="/about#contact"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-card-border text-xs font-medium text-deep hover:border-cyan hover:text-cyan transition-colors bg-white/70 dark:bg-card-dark/70"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Hub</span>
              </Link>
            </div>
            <p className="text-xs text-muted">
              โรงเรียนเทพศิรินทร์ สมุทรปราการ · Samut Prakan, Thailand (UTC+7)
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-card-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div className="flex items-center gap-1">
            <span>© 2026 Natthaphat Patthaisong (Nxt2Pat). Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline mx-0.5" />
            <span>and Rosalind.</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <Link href="/about" className="hover:text-ink transition-colors">Biography</Link>
            <Link href="/projects" className="hover:text-ink transition-colors">Projects</Link>
            <Link href="/blog" className="hover:text-ink transition-colors">Devlogs</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
