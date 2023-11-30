import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export async function getSortedPostsData() {
  const allPostsData = [];

  // Get file names under /posts
  const fileNames = await fs.readdir(postsDirectory);
  for await (const fileName of fileNames) {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = await fs.readFile(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    allPostsData.push({
      id,
      ...matterResult.data,
    });
  }

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date === b.date) {
      return 0;
    } else if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
