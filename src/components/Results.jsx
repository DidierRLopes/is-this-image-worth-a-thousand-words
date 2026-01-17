function Results({ description, wordCount }) {
  const isWorthThousand = wordCount >= 1000
  const colorClass = isWorthThousand ? 'text-green-500' : 'text-red-500'

  return (
    <div className="border border-gray-200 p-6">
      <div className="flex gap-8">
        <div className="flex-shrink-0 text-center">
          <div className={`text-7xl font-bold ${colorClass}`}>
            {wordCount.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500 mt-2">words</div>
        </div>

        <div className="flex-1 border-l border-gray-200 pl-8">
          <h3 className="font-medium text-black mb-2">Description</h3>
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
            {description}
          </p>
        </div>
      </div>

      <div className={`mt-6 pt-4 border-t border-gray-200 text-center ${colorClass}`}>
        {isWorthThousand ? (
          <span className="font-medium">
            This image is worth {wordCount.toLocaleString()} words!
          </span>
        ) : (
          <span className="font-medium">
            This image is only worth {wordCount.toLocaleString()} words.
          </span>
        )}
      </div>
    </div>
  )
}

export default Results
