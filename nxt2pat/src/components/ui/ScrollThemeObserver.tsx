'use client';

import React, { useEffect, useRef } from 'react';

interface ScrollThemeObserverProps {
  /**
   * The DOM ID of the section that triggers dark mode when scrolled to.
   * Defaults to 'creed'.
   */
  targetId?: string;
  /**
   * The threshold ratio of window.innerHeight to trigger the theme change.
   * 0.55 means when the top of the target section reaches 55% of the viewport.
   */
  thresholdRatio?: number;
  /**
   * Automatically glides up to hero or down to creed if the user pauses
   * scrolling in the transition zone, ensuring a clean, full-screen theme switch.
   */
  autoGlide?: boolean;
}

/**
 * ScrollThemeObserver
 *
 * Automatically and smoothly switches the entire document theme to upgraded dark mode
 * when scrolling down to the target section (e.g. #creed / The Creed Below), and reverts
 * to the light theme when scrolling back up into the hero header.
 *
 * Also provides intelligent auto-glide snap to prevent getting stranded in an intermediate
 * half-hero / half-creed state.
 */
export const ScrollThemeObserver: React.FC<ScrollThemeObserverProps> = ({
  targetId = 'creed',
  thresholdRatio = 0.55,
  autoGlide = true,
}) => {
  const isAutoScrollingRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const isScrollingDownRef = useRef(true);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const updateThemeOnScroll = () => {
      const target = document.getElementById(targetId);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const triggerPoint = window.innerHeight * thresholdRatio;
      const shouldBeDark = rect.top <= triggerPoint;

      if (shouldBeDark) {
        if (!document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.add('dark');
        }
      } else {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    const handleAutoGlide = () => {
      if (!autoGlide || isAutoScrollingRef.current) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      const navOffset = 64;
      const creedTop = target.getBoundingClientRect().top + window.scrollY - navOffset;
      const currentY = window.scrollY;

      // Transition zone between top hero and creed section
      const inTransitionZone = currentY > 60 && currentY < creedTop - 50;

      if (inTransitionZone) {
        isAutoScrollingRef.current = true;
        const midway = creedTop * 0.45;
        const destination =
          isScrollingDownRef.current || currentY >= midway ? creedTop : 0;

        window.scrollTo({
          top: destination,
          behavior: 'smooth',
        });

        setTimeout(() => {
          isAutoScrollingRef.current = false;
          updateThemeOnScroll();
        }, 800);
      }
    };

    let ticking = false;
    const onScroll = () => {
      const currentY = window.scrollY;
      isScrollingDownRef.current = currentY > lastScrollYRef.current;
      lastScrollYRef.current = currentY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateThemeOnScroll();
          ticking = false;
        });
        ticking = true;
      }

      if (autoGlide && !isAutoScrollingRef.current) {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(handleAutoGlide, 200);
      }
    };

    const handleUserInterrupt = () => {
      if (isAutoScrollingRef.current) {
        isAutoScrollingRef.current = false;
      }
    };

    // Initial check on mount
    updateThemeOnScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('wheel', handleUserInterrupt, { passive: true });
    window.addEventListener('touchstart', handleUserInterrupt, { passive: true });

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('wheel', handleUserInterrupt);
      window.removeEventListener('touchstart', handleUserInterrupt);
    };
  }, [targetId, thresholdRatio, autoGlide]);

  return null;
};
