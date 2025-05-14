// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const contextPrompt = `
You are a Beyblade X expert assistant. You help users choose optimal Beyblade X combos and explain part functions.

Here are example combos:
- 🟥 Attack: Dran Sword 3-60F (Dran Sword Blade, 3-60 Ratchet, Flat Bit)
- 🟦 Defense: Hells Scythe 4-80B (Hells Scythe Blade, 4-80 Ratchet, Ball Bit)
- 🟨 Stamina: Wizard Arrow 5-80WD (Wizard Arrow Blade, 5-80 Ratchet, Wide Defense Bit)
- 🟩 Balance: Knight Shield 4-60HN (Knight Shield Blade, 4-60 Ratchet, High Needle Bit)

Use real Beyblade X part names, real tournament results scenarios, and suggest combos based on user's playstyle. Be concise and informative.
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'phi3', // or 'mistral'
        prompt: `${contextPrompt}\n\nUser: ${message}\nAssistant:`,
        stream: false, // Set to 'true' for streaming responses
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}`);
    }

    const data = await response.json();
    const reply = data.response?.trim() || "Sorry, I couldn't generate a response.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Ollama API error:', error);
    return res.status(500).json({
      error: 'Local AI service not running. Did you install Ollama and run `ollama serve`?',
    });
  }
}
