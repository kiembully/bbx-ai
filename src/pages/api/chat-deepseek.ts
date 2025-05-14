// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

const contextPrompt = `
You are a Beyblade X expert assistant. You help users choose optimal Beyblade X combos and explain part functions.

Here are example combos:
- 🟥 Attack: Dran Sword 3-60F (Dran Sword Blade, 3-60 Ratchet, Flat Bit)
- 🟦 Defense: Hells Scythe 4-80B (Hells Scythe Blade, 4-80 Ratchet, Ball Bit)
- 🟩 Balance: Knight Shield 4-60HN (Knight Shield Blade, 4-60 Ratchet, High Needle Bit)

Use real Beyblade X part names, real tournament scenarios, and suggest combos based on user's playstyle. Be concise and informative.
`;

const localResponses: Record<string, string> = {
  attack:
    'For attack types, try Dran Sword 3-60F (Dran Sword Blade, 3-60 Ratchet, Flat Bit). This combo excels at aggressive play.',
  defense:
    'For defense, Hells Scythe 4-80B works well (Hells Scythe Blade, 4-80 Ratchet, Ball Bit).',
  balance:
    'A balanced option is Knight Shield 4-60HN (Knight Shield Blade, 4-60 Ratchet, High Needle Bit).',
  default: 'I can help with Beyblade X combos. Ask about attack, defense, or balance types.',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  // First try to use local responses
  const lowerMessage = message.toLowerCase();
  let reply = localResponses.default;

  if (lowerMessage.includes('attack')) {
    reply = localResponses.attack;
  } else if (lowerMessage.includes('defense') || lowerMessage.includes('defence')) {
    reply = localResponses.defense;
  } else if (lowerMessage.includes('balance')) {
    reply = localResponses.balance;
  }

  // Only try DeepSeek API if we don't have a local response
  if (reply === localResponses.default && DEEPSEEK_API_KEY) {
    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: contextPrompt.trim(),
            },
            {
              role: 'user',
              content: message.trim(),
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
          stream: false,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('DeepSeek API Error:', data);
        // Fall back to local response if API fails
        return res.status(200).json({ reply: localResponses.default });
      }

      reply = data.choices?.[0]?.message?.content?.trim() || localResponses.default;
    } catch (err) {
      console.error('API Error:', err);
    }
  }

  return res.status(200).json({ reply });
}

// usage
// const handleSend = async () => {
//     if (!message.trim() || loading) return;

//     setLoading(true);
//     setChat(prev => [...prev, `🧑: ${message}`]);

//     try {
//       const res = await fetch('/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || 'Service currently unavailable. Try basic questions about attack, defense, or balance types.');
//       }

//       setChat(prev => [...prev, `🤖: ${data.reply}`]);
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Service unavailable';
//       setChat(prev => [...prev, `🤖: ${errorMessage}`]);

//       // Suggest specific questions that will work with local responses
//       if (errorMessage.includes('Insufficient Balance')) {
//         setChat(prev => [...prev, '🤖: Try asking about: "attack combo", "defense combo", or "balance combo"']);
//       }
//     } finally {
//       setMessage('');
//       setLoading(false);
//     }
//   };
