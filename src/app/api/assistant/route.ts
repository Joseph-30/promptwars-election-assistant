import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    // Check if the API key exists and isn't the placeholder
    if (!apiKey || apiKey === "your_key_here") {
      return NextResponse.json(
        { error: 'AI Service is in offline/fallback mode. Please provide a valid GEMINI_API_KEY.' }, 
        { status: 503 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
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
