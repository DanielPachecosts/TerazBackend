import "dotenv/config";

const config = {
  port: process.env.PORT,
  dbConnection: process.env.DB_CONNECTION,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  secretKey: process.env.SECRET_KEY,
  adminUser: process.env.ADMIN_USER,
  adminPassword: process.env.ADMIN_PASSWORD,
  uploadsDir: process.env.UPLOADS_DIR,
  staticsDir: process.env.STATICS_DIR,
  HOST: process.env.HOST,
};

export default config;
