import { useState, useEffect, useCallback } from 'react';
import { ReaderSettings } from '../types';
import { getStoredSettings, saveStoredSettings, DEFAULT_SETTINGS } from '../utils/storage';

export function useReaderSettings() {
  const [settings, setSettings] = useState<ReaderSettings>(getStoredSettings);

  // Sync to local storage and HTML dark mode class
  useEffect(() => {
    saveStoredSettings(settings);

    if (settings.theme === 'dark' || settings.theme === 'oled') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const updateSettings = useCallback((newSettings: Partial<ReaderSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return {
    settings,
    updateSettings,
    resetSettings,
  };
}
