import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.homesolve.app',
  appName: 'HomeSolve',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
