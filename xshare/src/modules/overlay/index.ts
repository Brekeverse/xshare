import { NativeModules, Platform, Linking } from 'react-native';

export const Overlay = {
  canDrawOverlays: async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return false;
    try {
      return await NativeModules.OverlayModule?.canDrawOverlays() ?? false;
    } catch {
      return false;
    }
  },

  requestPermission: async (): Promise<void> => {
    if (Platform.OS !== 'android') return;
    try {
      await Linking.openSettings();
    } catch (e) {
      console.error('Error abriendo ajustes', e);
    }
  },

  startService: async (): Promise<void> => {
    if (Platform.OS !== 'android') return;
    try {
      await NativeModules.OverlayModule?.startService();
    } catch (e) {
      console.error('Error iniciando overlay', e);
    }
  },

  stopService: async (): Promise<void> => {
    if (Platform.OS !== 'android') return;
    try {
      await NativeModules.OverlayModule?.stopService();
    } catch (e) {
      console.error('Error deteniendo overlay', e);
    }
  },
};