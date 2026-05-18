import { NativeModules, Platform } from 'react-native';

const { OverlayModule } = NativeModules;

export const Overlay = {
  canDrawOverlays: async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return false;
    try {
      return await OverlayModule.canDrawOverlays();
    } catch {
      return false;
    }
  },

  requestPermission: async (): Promise<void> => {
    if (Platform.OS !== 'android') return;
    try {
      await OverlayModule.requestPermission();
    } catch (e) {
      console.error('Error pidiendo permiso overlay', e);
    }
  },

  startService: async (): Promise<void> => {
    if (Platform.OS !== 'android') return;
    try {
      await OverlayModule.startService();
    } catch (e) {
      console.error('Error iniciando overlay service', e);
    }
  },

  stopService: async (): Promise<void> => {
    if (Platform.OS !== 'android') return;
    try {
      await OverlayModule.stopService();
    } catch (e) {
      console.error('Error deteniendo overlay service', e);
    }
  },
};