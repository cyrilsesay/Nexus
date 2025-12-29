
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMerchantInsights = async (transactions: Transaction[]) => {
  const summary = transactions.map(t => ({
    amount: t.amount,
    method: t.method,
    status: t.status,
    time: t.timestamp
  }));

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze these merchant transactions and provide a professional business growth summary. 
      Focus on payment trends between Orange Money, Afri Money and Cards.
      Transactions: ${JSON.stringify(summary.slice(0, 50))}
      
      Respond with exactly 3 bullet points:
      1. Volume trend insight.
      2. Popular payment channel recommendation.
      3. Risk/Fraud observation if any.`,
      config: {
        temperature: 0.7,
      },
    });

    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("Gemini Insights Error:", error);
    return "Insights unavailable. Please check your transaction volume.";
  }
};
