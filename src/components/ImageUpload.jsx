import { useRef, useState } from 'react'

function ImageUpload({ imagePreview, onImageSelect }) {
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      onImageSelect(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file)
    }
  }

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed cursor-pointer transition-colors
        ${isDragging ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400'}
        ${imagePreview ? 'p-4' : 'p-12'}
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {imagePreview ? (
        <div className="flex flex-col items-center gap-4">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-64 object-contain"
          />
          <p className="text-sm text-gray-500">Click or drag to change image</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div className="text-center">
            <p className="font-medium text-black">Upload your image</p>
            <p className="text-sm text-gray-500 mt-1">Click or drag and drop</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
