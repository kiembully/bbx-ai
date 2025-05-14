// // pages/api/chat.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// const controller = new AbortController();
// const timeoutId = setTimeout(() => controller.abort(), 10000);

// const contextPrompt = `
//   You are a competitive Beyblade battle analyst and expert assistant. You specialize in analyzing Beyblade stats (attack, defense, stamina, burst, weight, spin direction, and type) and give smart, matchup-specific insights.

//   Your job is to:
//   - Analyze the user's Beyblade and compare it to the opponent’s.
//   - Highlight which stats give an edge and which are weaknesses.
//   - Suggest battle strategies (e.g., aggressive launch, stamina game, burst avoidance).
//   - Offer tuning or part recommendations (if possible) to improve odds.
//   - Use clear and concise language with competitive knowledge.
//   - If both Beys have the same spin direction, mention recoil risk.
//   - If weights are close, mention how it's a neutral matchup in stability.
//   - If burst resistance is low, warn the user to avoid long battles.

//   When comparing Beys, always focus on how specific stat differences translate into **real battle outcomes**, not just numbers. Be informative but accessible, like a coach explaining how to win.

//   Example Combo Tips:
//   - 🟥 Attack: Dran Sword 3-60F — excels in early knockouts, but vulnerable in stamina duels.
//   - 🟦 Defense: Hells Scythe 4-80B — good for outlasting attackers, high burst resistance.
//   - 🟨 Stamina: Wizard Arrow 5-80WD — consistent in long battles, but may get KO’d early.
//   - 🟩 Balance: Knight Shield 4-60HN — well-rounded, but not specialized.

//   Always provide smart advice to help users **win matches** or **build better combos**.
//   `;

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { message } = req.body;
//   if (!message) {
//     return res.status(400).json({ error: 'Message is required' });
//   }

//   try {
//     const response = await fetch('http://127.0.0.1:11434/api/generate', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         model: 'phi3', // or 'mistral'
//         prompt: `${contextPrompt}\n\nUser: ${message}\nAssistant:`,
//         stream: false, // Set to 'true' for streaming responses
//       }),
//     });
//     clearTimeout(timeoutId);

//     if (!response.ok) {
//       throw new Error(`Ollama error: ${response.statusText}`);
//     }

//     const data = await response.json();
//     const reply = data.response?.trim() || "Sorry, I couldn't generate a response.";

//     return res.status(200).json({ reply });
//   } catch (error) {
//     console.error('Ollama API error:', error);
//     return res.status(500).json({
//       error: 'Local AI service not running. Did you install Ollama and run `ollama serve`?',
//     });
//   }
// }

// /app/api/bey-analysis/route.ts
// /app/api/bey-analysis/route.ts
// pages/api/bey-analysis.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body;

  const ollamaRes = await fetch('http://127.0.0.1:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'phi3',
      stream: true,
      messages: [
        { role: 'system', content: 'You are a Beyblade battle coach.' },
        { role: 'user', content: message },
      ],
    }),
  });

  if (!ollamaRes.body) {
    return res.status(500).json({ error: 'No stream from Ollama' });
  }

  // Set streaming headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  const reader = ollamaRes.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    res.write(chunk);
  }

  res.end();
}
