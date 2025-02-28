import { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";
import { scrapeNews } from "./utils/scrap";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const news = await scrapeNews("cricket", ".dataList");

    const news = await scrapeNews("entertainment", ".listingPage");
    res.status(200).json(news);
  } catch {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
