import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gen AI SDK
// The API key should be provided via process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Call the Gemini API to get an AI response
    // Using gemini-2.5-flash as the default model
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `You are a helpful election assistant for Indian citizens. Answer the following question: ${message}` }],
        },
      ],
    });

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    console.error('Error with Gemini API:', error);
    return NextResponse.json(
      { error: 'Failed to generate response using Google Services' },
      { status: 500 }
    );
  }
}
