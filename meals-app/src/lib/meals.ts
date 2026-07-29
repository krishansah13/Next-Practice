import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

type Meal = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  instructions: string;
  image: string;
  creator: string;
  creator_email: string;
};

export default async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug: string): Meal | undefined {
  return db
    .prepare("SELECT * FROM meals WHERE slug = ?")
    .get(slug) as Meal | undefined;
}

export async function saveMeal(meal: {
  title: string;
  slug: string;
  instructions: string;
  image: File;
  summary: string;
  creator: string;
  creator_email: string;
}) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving Image Failed!");
    }
  });

  const imagePath = `/images/${fileName}`;
  const mealToSave = {
    ...meal,
    slug: meal.slug,
    image: imagePath,
  };

  db.prepare(
    `
    Insert into meals(title, summary, instructions, creator, creator_email, image, slug)
    Values (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug)
    `,
  ).run(mealToSave);
}
