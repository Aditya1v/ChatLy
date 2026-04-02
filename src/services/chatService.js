import { API_URL } from "../constants/constants";

export const fetchChatResponse = async (payload) => {
  let res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  res = await res.json();
  if (!res.candidates) {
    throw new Error("Invalid API response");
  }
  return res.candidates[0].content.parts[0].text;
};