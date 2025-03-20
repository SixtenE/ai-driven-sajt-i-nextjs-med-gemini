'use client'

import { FormEvent, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import Markdown from 'react-markdown'
import { Loader2 } from 'lucide-react'

export default function ChatInterface() {
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    e.stopPropagation()

    setLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const prompt = formData.get('prompt') as string
    const bot = formData.get('bot') as string

    console.log(prompt, bot)

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, bot }),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch response')
    }

    const data = await response.json()
    setMarkdown(data.message)
    setLoading(false)
  }

  return (
    <div className='flex-col'>
      <form
        onSubmit={handleSubmit}
        className='w-full flex flex-col gap-y-2 px-56 mt-56'
      >
        <BotSelect />

        <Input type='text' name='prompt' placeholder='Prompt...' required />
        <Button type='submit' disabled={loading}>
          {loading ? <Loader2 className='animate-spin' /> : 'Generate'}
        </Button>
      </form>
      <div className='w-full px-32 mt-12'>
        {markdown && <Markdown>{markdown}</Markdown>}
      </div>
    </div>
  )
}

function BotSelect() {
  return (
    <Select name='bot' required>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Choose a bot' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Choose a bot</SelectLabel>
          <SelectItem value='kanye'>Kanye West</SelectItem>
          <SelectItem value='trump'>Donald Trump</SelectItem>
          <SelectItem value='shakespeare'>Shakespeare</SelectItem>
          <SelectItem value='yoda'>Yoda</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
