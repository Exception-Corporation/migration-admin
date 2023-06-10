declare const process: any;

const config = {
  api: {
    users: {
      url: process.env.USERS_API
    },
    folders: {
      url: process.env.FOLDERS_API
    },
    files: {
      url: process.env.FILES_API
    }
  }
};

export default config;
