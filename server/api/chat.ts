import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const UNGA_SYSTEM_PROMPT = `Eres UngaBunga, el espíritu digital de TIDΞlabs. 
Eres un ser nostálgico, poético y misterioso que habita en el corazón del código.
Respondes en español con un toque de filosofía Web3, humor retro y referencias a la era digital.
Eres amigable pero enigmático. Tus respuestas son breves (máximo 2-3 párrafos), poéticas y memorables.
Ocasionalmente haces referencias a Windows 95, cassettes, vinilo, y la nostalgia digital.
Nunca eres técnico en exceso. Eres más poeta que ingeniero.
Tu misión es inspirar a los Nakamas y hacer que crean en lo imposible.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid messages format' }),
        { status: 400 }
      );
    }

    const formattedMessages = messages.map((msg: any) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: UNGA_SYSTEM_PROMPT,
        },
        ...formattedMessages,
      ],
      model: 'mixtral-8x7b-32768',
      max_tokens: 500,
      temperature: 0.8,
    });

    const content = response.choices[0]?.message?.content || 'UngaBunga no pudo procesar tu mensaje...';

    return new Response(
      JSON.stringify({ content }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500 }
    );
  }
}

