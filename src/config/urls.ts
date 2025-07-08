const isDevelopment = process.env.NODE_ENV === 'development';

// Base URLs for different environments
const config = {
  development: {
    realmUrl: 'https://realm.hirednext.co/',  // Updated to point to the external Realm site
  },
  production: {
    // Update these URLs when deploying
    realmUrl: 'https://realm.hirednext.co/',  // Updated to point to the external Realm site
  },
};

// Export the URLs based on the current environment
export const urls = isDevelopment ? config.development : config.production;

// Helper function to get the full Realm URL
export const getRealmUrl = () => {
  return urls.realmUrl;  // Simply return the URL as it's now a full URL in production
}; 