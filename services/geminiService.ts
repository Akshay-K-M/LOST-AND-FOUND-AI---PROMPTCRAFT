
import { GoogleGenAI } from "@google/genai";
import { Item, ItemStatus } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this environment, we assume the key is present.
  console.warn("API_KEY environment variable not set. Smart Search will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const smartSearch = async (query: string, items: Item[]): Promise<string[]> => {
  if (!API_KEY) return [];

  const model = 'gemini-2.5-flash';

  const itemsForPrompt = items.map(({ id, name, description, location, status }) => ({
    id,
    name,
    description,
    location,
    status
  }));

  const prompt = `
    You are an intelligent search assistant for a Lost & Found application.
    A user is searching for an item. Your task is to analyze the user's search query and identify the most relevant items from a provided list.

    User's Search Query: "${query}"

    List of available items:
    ${JSON.stringify(itemsForPrompt, null, 2)}

    Based on the user's query, please return a JSON array containing only the string IDs of the items that are the most likely matches. Consider the item's name, description, location, and whether it was lost or found. If the user mentions "I found a...", prioritize items listed as "LOST". If they mention "I lost my...", prioritize items listed as "FOUND".

    Return ONLY the JSON array of IDs, e.g., ["1", "3"]. If no items match, return an empty array [].
  `;
  
  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
    });
    
    const textResponse = response.text.trim();
    // Clean the response to ensure it's valid JSON
    const jsonString = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();

    const resultIds = JSON.parse(jsonString);
    if (Array.isArray(resultIds) && resultIds.every(id => typeof id === 'string')) {
      return resultIds;
    }
    return [];
  } catch (error) {
    console.error("Error during smart search:", error);
    return [];
  }
};

export const smartImageSearch = async (imageBase64DataUrl: string, items: Item[]): Promise<string[]> => {
    if (!API_KEY) return [];

    const model = 'gemini-2.5-flash';

    // Filter for only found items to compare against
    const foundItems = items.filter(item => item.status === ItemStatus.Found)
      .map(({ id, name, description, location }) => ({ id, name, description, location }));

    if (foundItems.length === 0) {
        return [];
    }
    
    const parts = imageBase64DataUrl.split(',');
    const mimeType = parts[0].match(/:(.*?);/)?.[1];
    const base64Data = parts[1];

    if (!mimeType || !base64Data) {
        console.error("Invalid base64 data URL for image search.");
        return [];
    }
    
    const imagePart = {
        inlineData: {
            mimeType,
            data: base64Data,
        },
    };

    const textPart = {
        text: `
          You are a visual search assistant for a Lost & Found application.
          A user has uploaded an image of an item they have lost. Your task is to visually analyze this image and identify the most relevant items from the provided list of FOUND items.

          List of FOUND items:
          ${JSON.stringify(foundItems, null, 2)}

          Based on the user's uploaded image, please return a JSON array containing only the string IDs of the items that are the most likely visual matches. Consider color, shape, type of item, and any distinguishing features.

          Return ONLY the JSON array of IDs, e.g., ["2", "4"]. If no items appear to match, return an empty array [].
        `,
    };

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: [textPart, imagePart] },
        });

        const textResponse = response.text.trim();
        const jsonString = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();

        const resultIds = JSON.parse(jsonString);
        if (Array.isArray(resultIds) && resultIds.every(id => typeof id === 'string')) {
            return resultIds;
        }
        return [];
    } catch (error) {
        console.error("Error during smart image search:", error);
        return [];
    }
};
