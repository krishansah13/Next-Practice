import sql from "better-sqlite3";

const db = sql("meals.db");

export default async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug : string)  {
    return db.prepare('SELECT * from meals where slug = ?').get(slug);
}