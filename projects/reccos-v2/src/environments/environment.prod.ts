export const environment = {
  production: true,
  apiUrl: 'https://api.reccos.com/api',
  appName: 'Reccos',
  version: '2.0.0',
  debugMode: false,
  authConfig: {
    tokenExpirationTime: 3600, // tempo em segundos (1 hora)
    refreshTokenEnabled: true,
    maxLoginAttempts: 5,
  },
  featureFlags: {
    enableNewDashboard: true,
    enableNotifications: true,
  },
};
