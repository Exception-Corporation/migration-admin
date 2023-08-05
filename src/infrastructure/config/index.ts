declare const process: any;

const config = {
  hostname: process.env.HOSTNAME,
  api: {
    users: {
      url: process.env.USERS_API
    },
    migration: {
      url: process.env.MIGRATION_API
    },
    websocket: {
      url: process.env.WEBSOCKET_API
    }
  }
};

export default config;
