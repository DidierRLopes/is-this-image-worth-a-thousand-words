import { useState } from 'react'

function ApiKeyInput({ apiKey, onChange }) {
  const [isVisible, setIsVisible] = useState(false)
  const [inputValue, setInputValue] = useState(apiKey)

  const handleSave = () => {
    onChange(inputValue)
  }

  const maskedKey = apiKey ? `${apiKey.slice(0, 7)}...${apiKey.slice(-4)}` : ''

  return (
    <div className="border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span className="text-sm text-gray-600">OpenAI API Key</span>
        <span className="text-xs text-gray-400">(stored locally only)</span>
      </div>

      {apiKey && !isVisible ? (
        <div className="flex items-center gap-2">
          <code className="flex-1 bg-gray-100 px-3 py-2 text-sm font-mono">{maskedKey}</code>
          <button
            onClick={() => setIsVisible(true)}
            className="px-3 py-2 text-sm border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Change
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="password"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="sk-..."
            className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:border-black text-sm font-mono"
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors"
          >
            Save
          </button>
          {apiKey && (
            <button
              onClick={() => {
                setIsVisible(false)
                setInputValue(apiKey)
              }}
              className="px-3 py-2 text-sm border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default ApiKeyInput
