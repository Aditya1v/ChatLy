import { URL } from "../constants/constants";

export const fetchChatResponse = async (payload) => {
  let res = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  res = await res.json();
  return res.candidates[0].content.parts[0].text;
};