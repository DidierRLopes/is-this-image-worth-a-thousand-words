import { useState, useEffect } from 'react'
import Header from './components/Header'
import ApiKeyInput from './components/ApiKeyInput'
import ImageUpload from './components/ImageUpload'
import AnalyzeButton from './components/AnalyzeButton'
import Results from './components/Results'
import { analyzeImage } from './utils/openai'

function App() {
  const [apiKey, setApiKey] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const savedKey = localStorage.getItem('openai_api_key')
    if (savedKey) {
      setApiKey(savedKey)
    }
  }, [])

  const handleApiKeyChange = (key) => {
    setApiKey(key)
    localStorage.setItem('openai_api_key', key)
  }

  const handleImageSelect = (file) => {
    setImage(file)
    setResult(null)
    setError(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleAnalyze = async () => {
    if (!apiKey || !image) return

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const description = await analyzeImage(apiKey, imagePreview)
      const wordCount = description.trim().split(/\s+/).length
      setResult({ description, wordCount })
    } catch (err) {
      setError(err.message || 'Failed to analyze image')
    } finally {
      setIsLoading(false)
    }
  }

  const canAnalyze = apiKey && image && !isLoading

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Header />

        <div className="mt-12 space-y-8">
          <ApiKeyInput apiKey={apiKey} onChange={handleApiKeyChange} />

          <ImageUpload
            imagePreview={imagePreview}
            onImageSelect={handleImageSelect}
          />

          <AnalyzeButton
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            isLoading={isLoading}
          />

          {error && (
            <div className="p-4 border border-red-500 text-red-500 text-center">
              {error}
            </div>
          )}

          {result && (
            <Results
              description={result.description}
              wordCount={result.wordCount}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
