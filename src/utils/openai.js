export async function analyzeImage(apiKey, imageDataUrl) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Describe this image in as much detail as possible. Be extremely thorough and verbose.

Describe every element you can see: the subjects, objects, colors, textures, lighting, composition, mood, atmosphere, any text visible, the background, foreground, any actions taking place, spatial relationships between objects, artistic style if applicable, and any other details that would help someone who cannot see the image understand it completely.

Do not hold back - the goal is to create the most comprehensive description possible.`,
            },
            {
              type: 'image_url',
              image_url: {
                url: imageDataUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 4096,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error?.message || `API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0]?.message?.content || ''
}
