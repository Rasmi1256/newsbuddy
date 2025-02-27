import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        country: "us",
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    res.status(200).json(response.data.articles);
  } catch {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
