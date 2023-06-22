declare const process: any;

const config = {
  hostname: process.env.HOSTNAME,
  api: {
    users: {
      url: process.env.USERS_API
    },
    migration: {
      url: process.env.MIGRATION_API
    }
  }
};

export default config;
