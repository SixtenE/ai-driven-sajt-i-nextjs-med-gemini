import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const { text } = await generateText({
    model: google('gemini-2.0-flash-001'),
    prompt,
  })

  return Response.json({ message: text })
}
