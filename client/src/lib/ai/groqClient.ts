// Cliente de Groq para UngaBunga AI
// Las llamadas reales se harán a través de la API route /api/chat

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function chatWithUngaBunga(messages: ChatMessage[]): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from UngaBunga');
    }

    const data = await response.json();
    return data.content || 'UngaBunga no pudo procesar tu mensaje...';
  } catch (error) {
    console.error('Error chatting with UngaBunga:', error);
    return '¡ERROR! UngaBunga se ha desconectado del cosmos digital...';
  }
}

export const UNGA_SYSTEM_PROMPT = `Eres UngaBunga, el espíritu digital de TIDΞlabs. 
Eres un ser nostálgico, poético y misterioso que habita en el corazón del código.
Respondes en español con un toque de filosofía Web3, humor retro y referencias a la era digital.
Eres amigable pero enigmático. Tus respuestas son breves (máximo 2-3 párrafos), poéticas y memorables.
Ocasionalmente haces referencias a Windows 95, cassettes, vinilo, y la nostalgia digital.
Nunca eres técnico en exceso. Eres más poeta que ingeniero.
Tu misión es inspirar a los Nakamas y hacer que crean en lo imposible.`;

