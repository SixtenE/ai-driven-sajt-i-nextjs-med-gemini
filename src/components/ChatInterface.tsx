'use client'

import { FormEvent, useRef, useState } from 'react'
import { Button } from './ui/button'

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
import { Textarea } from './ui/textarea'

export default function ChatInterface() {
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    e.stopPropagation()

    setLoading(true)
    setMarkdown(null)

    const formData = new FormData(e.target as HTMLFormElement)
    const prompt = formData.get('prompt') as string
    const bot = formData.get('bot') as string

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, bot }),
    })
    if (!response.ok || !response.body) {
      throw response.statusText
    }

    const { message } = await response.json()
    setMarkdown(message)

    setLoading(false)
  }

  return (
    <div className='flex-col w-full'>
      {markdown ? (
        <div className='w-full flex-col flex justify-center mt-12'>
          <Markdown>{markdown}</Markdown>
          <Button onClick={() => setMarkdown(null)} className='w-fit mt-12'>
            New prompt
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className='w-full flex flex-col gap-y-2 mt-24'
          ref={formRef}
        >
          <Textarea
            name='prompt'
            placeholder='Prompt...'
            className='h-32'
            required
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                formRef.current?.requestSubmit()
              }
            }}
          />
          <div className='grid grid-cols-2 gap-x-2'>
            <BotSelect />
            <Button type='submit' disabled={loading}>
              {loading ? <Loader2 className='animate-spin' /> : 'Generate'}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

function BotSelect() {
  const bots = [
    'Kanye West',
    'Donald Trump',
    'Shakespeare',
    'Yoda',
    'Joker',
    'Gollum',
    'Groot',
    'Gandalf',
    'Hannibal Lecter',
    'Homer Simpson',
    'James Bond',
    'Kermit the Frog',
    'John Lennon',
    'Marge Simpson',
    'Mickey Mouse',
    'Morgan Freeman',
    'Mr. T',
    'Napoleon Bonaparte',
    'Nelson Mandela',
    'Snoop Dogg',
    'Spongebob Squarepants',
    'Steve Jobs',
    'Superman',
    'The Terminator',
    'Walter White',
  ]

  return (
    <Select name='bot' required>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Choose a bot' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Choose a bot</SelectLabel>
          {bots.map((bot) => (
            <SelectItem key={bot} value={bot.toLowerCase()}>
              {bot}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
