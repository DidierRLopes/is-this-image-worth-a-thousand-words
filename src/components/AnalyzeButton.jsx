function AnalyzeButton({ onClick, disabled, isLoading }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-4 text-lg font-medium transition-colors
        ${disabled
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-black text-white hover:bg-gray-800'
        }
      `}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Analyzing...
        </span>
      ) : (
        'How many words is this image worth?'
      )}
    </button>
  )
}

export default AnalyzeButton
