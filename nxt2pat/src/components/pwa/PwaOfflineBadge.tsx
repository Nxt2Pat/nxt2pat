'use client';

import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const PwaOfflineBadge: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center">
      {isOnline ? (
        <Badge variant="emerald">
          <Wifi className="w-3 h-3 inline mr-1" />
          ONLINE
        </Badge>
      ) : (
        <Badge variant="amber">
          <WifiOff className="w-3 h-3 inline mr-1" />
          CACHED_OFFLINE
        </Badge>
      )}
    </div>
  );
};
