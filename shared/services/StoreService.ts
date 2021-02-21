const KEYS = {
  Bearer: 'bearer',
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IiIsInJvbGUiOiIxIiwibmJmIjoxNjEzODkwOTY0LCJleHAiOjE2MTQ0OTU3NjQsImlhdCI6MTYxMzg5MDk2NH0.B8Fv52EWRtzrowenrr5A47yKHAfEbKkjCeDcQf7dd9Q';

const StoreService = {
  getBearerToken: async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      return resolve(token);
    });
  },

  setBearerToken: async (token: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      return resolve();
    });
  },

  remoteBearerToken: async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      return resolve();
    });
  },
};

export default StoreService;
