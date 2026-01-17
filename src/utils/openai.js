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
              text: `You are an expert image analyst. Your task is to write the LONGEST, most EXHAUSTIVE description possible of this image. Aim for at least 1000 words. Do not summarize - EXPAND on every detail.

Write a comprehensive analysis covering ALL of the following sections in depth:

1. OVERVIEW: What is the main subject? What type of image is this (photo, painting, illustration, etc.)?

2. FOREGROUND DETAILS: Describe every object, person, or element in the foreground. Include their positions, sizes, colors, textures, materials, conditions, and relationships to each other.

3. MIDDLE GROUND: What occupies the middle portion of the image? Describe all elements with the same level of detail.

4. BACKGROUND: What is visible in the background? Describe the setting, environment, sky, distant objects, etc.

5. PEOPLE/CHARACTERS (if any): Describe each person's appearance, clothing (fabric, style, fit, colors, patterns, accessories), facial expressions, body language, poses, actions, and apparent emotions.

6. COLORS & LIGHTING: What is the color palette? Describe the lighting - its direction, quality (harsh/soft), color temperature, shadows, highlights, and how it affects the mood.

7. TEXTURES & MATERIALS: Identify and describe the textures visible - smooth, rough, glossy, matte, metallic, fabric types, etc.

8. COMPOSITION & FRAMING: How is the image composed? Rule of thirds? Symmetry? Leading lines? What's the focal point?

9. TEXT & SYMBOLS (if any): Transcribe any visible text. Describe any logos, signs, symbols, or written elements.

10. MOOD & ATMOSPHERE: What emotions does this image evoke? What's the overall tone?

11. CONTEXT & INTERPRETATION: What story does this image tell? What might be happening before/after this moment?

12. TECHNICAL ASPECTS: If discernible - camera angle, depth of field, focus, any post-processing effects.

Remember: Be EXHAUSTIVE. Describe EVERYTHING you can see. The goal is to create a description so detailed that someone could recreate the image from your words alone. Do not use bullet points - write in flowing paragraphs.`,
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
