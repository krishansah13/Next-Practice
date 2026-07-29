import sql from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "meals.db");
console.log("DB PATH:", dbPath);

const db = sql(dbPath);

export default async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
}
