export const environment = {
  production: false,
  apiUrl: 'https://localhost:8080/api',
  appName: 'Reccos - Staging',
  version: '2.0.0',
  debugMode: true,
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
