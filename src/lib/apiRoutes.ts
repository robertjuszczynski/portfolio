const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 

export const apiRoutes = {
  chatbot: {
    ask: `${BASE_URL}api/gemini`
  }
}