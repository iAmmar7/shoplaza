import 'dotenv/config';

export default {
  name: 'shoplaza',
  version: '1.0.0',
  extra: {
    FIREBASE_URL: process.env.FIREBASE_URL,
    FIREBASE_KEY: process.env.FIREBASE_KEY,
    FIREBASE_AUTH_URL: process.env.FIREBASE_AUTH_URL,
  },
};
