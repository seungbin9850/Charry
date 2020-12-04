import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname + "../../../.env") });

export const config = {
  test_module: false,
  database: {
    host: process.env.DB_HOST || "",
    port: 3306,
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    name: process.env.DB_NAME || "",
  },
};
