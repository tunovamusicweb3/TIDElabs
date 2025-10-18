/**
 * MSN Messenger Emoticons - Colección retro de emoticonos
 * Basado en los emoticonos clásicos de MSN Messenger (2000s)
 */

export interface Emoticon {
  name: string;
  triggers: string[];
  emoji: string;
  description: string;
}

export const MSN_EMOTICONS: Emoticon[] = [
  {
    name: 'smile',
    triggers: [':)', ':-)', ':D', ':-D'],
    emoji: '😊',
    description: 'Sonrisa',
  },
  {
    name: 'sad',
    triggers: [':(', ':-(', ':/'],
    emoji: '😢',
    description: 'Triste',
  },
  {
    name: 'wink',
    triggers: [';)', ';-)'],
    emoji: '😉',
    description: 'Guiño',
  },
  {
    name: 'tongue',
    triggers: [':P', ':-P', ':p', ':-p'],
    emoji: '😜',
    description: 'Lengua',
  },
  {
    name: 'surprise',
    triggers: [':O', ':-O', ':o', ':-o'],
    emoji: '😮',
    description: 'Sorpresa',
  },
  {
    name: 'cool',
    triggers: [':cool:', '8)', '8-)'],
    emoji: '😎',
    description: 'Genial',
  },
  {
    name: 'confused',
    triggers: [':?', ':-?', ':S', ':-S'],
    emoji: '😕',
    description: 'Confundido',
  },
  {
    name: 'love',
    triggers: ['<3', ':heart:'],
    emoji: '❤️',
    description: 'Amor',
  },
  {
    name: 'fire',
    triggers: [':fire:', '🔥'],
    emoji: '🔥',
    description: 'Fuego',
  },
  {
    name: 'thinking',
    triggers: [':thinking:', '🤔'],
    emoji: '🤔',
    description: 'Pensando',
  },
  {
    name: 'party',
    triggers: [':party:', '🎉'],
    emoji: '🎉',
    description: 'Fiesta',
  },
  {
    name: 'money',
    triggers: [':money:', '💰'],
    emoji: '💰',
    description: 'Dinero',
  },
  {
    name: 'rocket',
    triggers: [':rocket:', '🚀'],
    emoji: '🚀',
    description: 'Cohete',
  },
  {
    name: 'wave',
    triggers: [':wave:', '👋'],
    emoji: '👋',
    description: 'Onda',
  },
  {
    name: 'clap',
    triggers: [':clap:', '👏'],
    emoji: '👏',
    description: 'Aplauso',
  },
];

/**
 * Reemplaza triggers de emoticonos con emojis en texto
 */
export function replaceEmoticons(text: string): string {
  let result = text;

  MSN_EMOTICONS.forEach((emoticon) => {
    emoticon.triggers.forEach((trigger) => {
      const regex = new RegExp(`\\${trigger.split('').join('\\')}`, 'g');
      result = result.replace(regex, emoticon.emoji);
    });
  });

  return result;
}

/**
 * Obtiene sugerencias de emoticonos basadas en entrada del usuario
 */
export function getEmoticonSuggestions(input: string): Emoticon[] {
  if (!input || input.length < 1) return [];

  return MSN_EMOTICONS.filter((emoticon) =>
    emoticon.triggers.some((trigger) => trigger.includes(input)) ||
    emoticon.name.includes(input.toLowerCase())
  );
}

/**
 * Animación de emoticono flotante
 */
export interface FloatingEmoticon {
  id: string;
  emoji: string;
  x: number;
  y: number;
  duration: number;
}

export function createFloatingEmoticon(
  emoji: string,
  x: number,
  y: number
): FloatingEmoticon {
  return {
    id: `${Date.now()}-${Math.random()}`,
    emoji,
    x,
    y,
    duration: 2000,
  };
}

