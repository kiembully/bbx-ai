// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const HF_API_KEY = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;
const MODEL = 'mistralai/Mixtral-8x7B-Instruct-v0.1'; // you can swap this for another if needed

// Domain-specific prompt
const contextPrompt = `
You are a Beyblade X expert assistant. You help users choose optimal Beyblade X combos and explain part functions.

Here are example combos:
- 🟥 Attack: Dran Sword 3-60F (Dran Sword Blade, 3-60 Ratchet, Flat Bit)
- 🟦 Defense: Hells Scythe 4-80B (Hells Scythe Blade, 4-80 Ratchet, Ball Bit)
- 🟩 Balance: Knight Shield 4-60HN (Knight Shield Blade, 4-60 Ratchet, High Needle Bit)

Use real Beyblade X part names and suggest combos based on user's playstyle. Be concise and informative.
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `${contextPrompt}\n\nUser: ${message}\nAssistant:`,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Hugging Face Error:', error);
      return res.status(500).json({ error: 'Hugging Face API error' });
    }

    const data = await response.json();
    const text = data?.[0]?.generated_text || 'Sorry, no response.';
    const reply = text.replace(/^.*?\nAssistant:/, '').trim();

    return res.status(200).json({ reply });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('❌ Error:', err.message);
    } else {
      console.error('❌ Unknown error:', err);
    }
    return res.status(500).json({ error: 'Server error' });
  }
}
