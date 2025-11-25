import pkg from "pg";
const { Pool } = pkg;

export const db = new Pool({
  user: "postgres",      // tu usuario de pgAdmin
  host: "localhost",
  database: "psicologia",
  password: "Mialana1234",
  port: 5432
});

