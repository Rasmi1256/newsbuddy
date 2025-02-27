import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeNews(path: string) {
  const url = `https://www.bbc.com/${path}`; // Change as needed
  const { data } = await axios.get(url);

  console.log(data);

  const $ = cheerio.load(data);
  const articles: { title: string; link: string }[] = [];

  $("sc-227eb15e-2 harZpM").each((_, element) => {
    const title = $(element).text().trim();
    const link = $(element).attr("href");
    if (title && link) {
      articles.push({
        title,
        link: link.startsWith("/") ? `https://www.bbc.com${link}` : link,
      });
    }
  });

  return articles;
}

console.log(scrapeNews("news"));
