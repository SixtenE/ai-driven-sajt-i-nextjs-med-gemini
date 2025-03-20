import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export async function POST(req: Request) {
  const { prompt, bot } = await req.json()

  const { text } = await generateText({
    model: google('gemini-2.0-flash-001'),
    prompt: `
        Pretend you are ${bot} and answer: ${prompt}
    `,
  })

  return Response.json({ message: text })
}
