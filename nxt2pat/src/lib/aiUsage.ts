export type NormalizedAiUsage = 'none' | 'partial' | 'mostly' | 'full';

export type AiUsageInput =
  | NormalizedAiUsage
  | 'no-ai'
  | 'partial-ai'
  | 'mostly-ai'
  | 'full-ai'
  | 'ไม่ใช้เอไอ'
  | 'ใช้เอไอบางส่วน'
  | 'ใช้เอไอส่วนใหญ่'
  | 'ใช้เอไอทั้งหมด';

export interface AiUsageConfig {
  key: NormalizedAiUsage;
  label: string; // ภาษาไทยตามที่ผู้ใช้กำหนด
  shortLabel: string;
  badgeVariant: 'neutral' | 'cyan' | 'amber' | 'purple';
  description: string;
}

export const AI_USAGE_LEVELS: Record<NormalizedAiUsage, AiUsageConfig> = {
  none: {
    key: 'none',
    label: 'ไม่ใช้เอไอ',
    shortLabel: 'No AI',
    badgeVariant: 'neutral',
    description: 'ผลงานที่คิดค้น พัฒนา และเขียนโค้ดด้วยตนเองทั้งหมด 100% โดยไม่พึ่งพา AI',
  },
  partial: {
    key: 'partial',
    label: 'ใช้เอไอบางส่วน',
    shortLabel: 'Partial AI',
    badgeVariant: 'cyan',
    description: 'ใช้ AI ช่วยเหลือบางส่วน เช่น เป็นคู่คิดค้นคว้า ตรวจทานตรรกะ หรือช่วยเสริมการทำงาน',
  },
  mostly: {
    key: 'mostly',
    label: 'ใช้เอไอส่วนใหญ่',
    shortLabel: 'Mostly AI',
    badgeVariant: 'amber',
    description: 'ใช้ AI สร้างโครงสร้างหรือเนื้อหาหลัก แล้วนำมาปรับแต่งและผสานระบบ',
  },
  full: {
    key: 'full',
    label: 'ใช้เอไอทั้งหมด',
    shortLabel: 'Full AI',
    badgeVariant: 'purple',
    description: 'ผลงานที่สร้างและประมวลผลขึ้นด้วย Generative AI ทั้งหมด',
  },
};

/**
 * Normalizes any AI usage input string to its standard configuration
 */
export function getAiUsageConfig(val?: string | null): AiUsageConfig | null {
  if (!val) return null;
  const clean = val.trim().toLowerCase();

  if (clean === 'none' || clean === 'no-ai' || clean === 'ไม่ใช้เอไอ') {
    return AI_USAGE_LEVELS.none;
  }
  if (clean === 'partial' || clean === 'partial-ai' || clean === 'ใช้เอไอบางส่วน') {
    return AI_USAGE_LEVELS.partial;
  }
  if (clean === 'mostly' || clean === 'mostly-ai' || clean === 'ใช้เอไอส่วนใหญ่') {
    return AI_USAGE_LEVELS.mostly;
  }
  if (clean === 'full' || clean === 'full-ai' || clean === 'ใช้เอไอทั้งหมด') {
    return AI_USAGE_LEVELS.full;
  }

  return null;
}
