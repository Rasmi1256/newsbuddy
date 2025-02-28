import axios from "axios";
import * as cheerio from "cheerio";

interface Article {
  title: string;
  link: string;
}

export async function scrapeNews(
  path: string,
  selector: string
): Promise<Article[]> {
  const url = `https://www.hindustantimes.com/${path}`;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const articles: Article[] = [];

    $(selector).each((_, element) => {
      const title: string = $(element).find("a").text().trim();
      const link: string | undefined = $(element).find("a").attr("href");
      if (title && link) {
        articles.push({
          title,
          link: link.startsWith("/")
            ? `https://www.hindustantimes.com${link}`
            : link,
        });
      }
    });

    return articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}
