import { publicProcedure, router } from '../_core/trpc';
import { z } from 'zod';
import { getUngaBungaMCP } from '../mcp/ungabungaMCP';

export const ungabungaRouter = router({
  /**
   * Procesa un mensaje del usuario
   */
  chat: publicProcedure
    .input(
      z.object({
        message: z.string(),
        sessionId: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const mcp = getUngaBungaMCP();
        const response = await mcp.processMessage(input.message);

        return {
          success: true,
          message: response,
          timestamp: new Date(),
        };
      } catch (error) {
        console.error('Error en chat UngaBunga:', error);
        return {
          success: false,
          message: 'Error procesando tu mensaje. Intenta de nuevo.',
          timestamp: new Date(),
        };
      }
    }),

  /**
   * Busca información en la web
   */
  searchWeb: publicProcedure
    .input(
      z.object({
        query: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const mcp = getUngaBungaMCP();
        const results = await mcp.searchWeb(input.query);

        return {
          success: true,
          results,
        };
      } catch (error) {
        console.error('Error en búsqueda web:', error);
        return {
          success: false,
          results: [],
        };
      }
    }),

  /**
   * Analiza tendencias Web3
   */
  analyzeTrends: publicProcedure
    .input(
      z.object({
        topic: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const mcp = getUngaBungaMCP();
        const analysis = await mcp.analyzeTrends(input.topic);

        return {
          success: true,
          analysis,
        };
      } catch (error) {
        console.error('Error analizando tendencias:', error);
        return {
          success: false,
          analysis: 'No se pudo analizar las tendencias.',
        };
      }
    }),

  /**
   * Genera poesía sobre un tema
   */
  generatePoetry: publicProcedure
    .input(
      z.object({
        theme: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const mcp = getUngaBungaMCP();
        const poetry = await mcp.generatePoetry(input.theme);

        return {
          success: true,
          poetry,
        };
      } catch (error) {
        console.error('Error generando poesía:', error);
        return {
          success: false,
          poetry: 'Poesía no disponible en este momento.',
        };
      }
    }),

  /**
   * Obtiene el contexto actual de UngaBunga
   */
  getContext: publicProcedure.query(async () => {
    try {
      const mcp = getUngaBungaMCP();
      const context = mcp.getContext();

      return {
        success: true,
        context,
      };
    } catch (error) {
      console.error('Error obteniendo contexto:', error);
      return {
        success: false,
        context: null,
      };
    }
  }),

  /**
   * Resetea la conversación
   */
  resetConversation: publicProcedure.mutation(async () => {
    try {
      const mcp = getUngaBungaMCP();
      mcp.resetConversation();

      return {
        success: true,
        message: 'Conversación reseteada. Empecemos de nuevo. 🌊',
      };
    } catch (error) {
      console.error('Error reseteando conversación:', error);
      return {
        success: false,
        message: 'Error reseteando conversación.',
      };
    }
  }),

  /**
   * Obtiene el historial de conversación
   */
  getHistory: publicProcedure.query(async () => {
    try {
      const mcp = getUngaBungaMCP();
      const history = mcp.getConversationHistory();

      return {
        success: true,
        history,
      };
    } catch (error) {
      console.error('Error obteniendo historial:', error);
      return {
        success: false,
        history: [],
      };
    }
  }),
});

