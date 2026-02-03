'use client'

import { useState, useRef } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [imageAlt, setImageAlt] = useState('')
  const [imageWidth, setImageWidth] = useState('')
  const [imageWidthUnit, setImageWidthUnit] = useState<'px' | '%'>('px')
  const [uploading, setUploading] = useState(false)

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    
    onChange(newText)
    
    // Obnovení pozice kurzoru
    setTimeout(() => {
      textarea.focus()
      const newPosition = start + before.length + selectedText.length + after.length
      textarea.setSelectionRange(newPosition, newPosition)
    }, 0)
  }

  const insertImage = () => {
    if (!imageUrl.trim()) return

    const widthValue = imageWidth.trim()
    const widthPart = widthValue ? `{width=${widthValue}${imageWidthUnit}}` : ''
    const imgTag = `\n\n![${imageAlt || 'Obrázek'}](${imageUrl})${widthPart}\n\n`
    insertText(imgTag)
    setShowImageDialog(false)
    setImageUrl('')
    setImageAlt('')
    setImageWidth('')
    setImageWidthUnit('px')
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Kontrola typu
    if (!file.type.startsWith('image/')) {
      alert('Soubor musí být obrázek')
      return
    }

    // Kontrola velikosti (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Soubor je příliš velký (max 5MB)')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Chyba při nahrávání')
      }

      const data = await response.json()
      setImageUrl(data.url)
      setShowImageDialog(true)
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Chyba při nahrávání obrázku')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const formatText = (format: string) => {
    const formats: { [key: string]: [string, string] } = {
      bold: ['**', '**'],
      italic: ['*', '*'],
      heading1: ['\n# ', '\n'],
      heading2: ['\n## ', '\n'],
      heading3: ['\n### ', '\n'],
      link: ['[', '](url)'],
      list: ['\n- ', '\n'],
      quote: ['\n> ', '\n'],
      code: ['`', '`'],
    }

    const [before, after] = formats[format] || ['', '']
    insertText(before, after)
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden relative">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => formatText('bold')}
          className="px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-100 font-bold text-sm"
          title="Tučné"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => formatText('italic')}
          className="px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-100 italic text-sm"
          title="Kurzíva"
        >
          <em>I</em>
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => formatText('heading1')}
          className="px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm font-semibold"
          title="Nadpis 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => formatText('heading2')}
          className="px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm font-semibold"
          title="Nadpis 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => formatText('heading3')}
          className="px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm font-semibold"
          title="Nadpis 3"
        >
          H3
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => formatText('list')}
          className="px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm"
          title="Seznam"
        >
          • Seznam
        </button>
        <button
          type="button"
          onClick={() => formatText('quote')}
          className="px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm"
          title="Citace"
        >
          " Citace
        </button>
        <button
          type="button"
          onClick={() => formatText('code')}
          className="px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm font-mono"
          title="Kód"
        >
          {'</>'}
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm disabled:opacity-50"
          title="Nahrát obrázek z PC"
        >
          {uploading ? '⏳ Nahrávání...' : '📁 Nahrát obrázek'}
        </button>
        <button
          type="button"
          onClick={() => setShowImageDialog(true)}
          className="px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm"
          title="Vložit obrázek z URL"
        >
          🖼️ Obrázek (URL)
        </button>
        <button
          type="button"
          onClick={() => formatText('link')}
          className="px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm"
          title="Odkaz"
        >
          🔗 Odkaz
        </button>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border-0 focus:ring-0 focus:outline-none resize-y min-h-[300px] font-mono text-sm"
        rows={15}
      />

      {/* Image Dialog */}
      {showImageDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Vložit obrázek</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL obrázku nebo cesta k nahránému souboru *
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg nebo /uploads/filename.jpg"
                  className="input-field"
                  autoFocus
                />
                {imageUrl && (
                  <div className="mt-2">
                    <img 
                      src={imageUrl} 
                      alt="Náhled" 
                      className="max-w-full h-auto rounded border border-gray-300"
                      style={{ maxHeight: '200px' }}
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Popis obrázku (alt text)
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Popis obrázku"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Šířka obrázku (volitelné)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={imageWidth}
                    onChange={(e) => setImageWidth(e.target.value)}
                    placeholder={imageWidthUnit === 'px' ? 'např. 600' : 'např. 60'}
                    className="input-field"
                    min="1"
                  />
                  <select
                    value={imageWidthUnit}
                    onChange={(e) => setImageWidthUnit(e.target.value as 'px' | '%')}
                    className="input-field w-24"
                  >
                    <option value="px">px</option>
                    <option value="%">%</option>
                  </select>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setImageWidth('25')
                      setImageWidthUnit('%')
                    }}
                    className="px-2.5 py-1 text-xs bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
                  >
                    25%
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImageWidth('50')
                      setImageWidthUnit('%')
                    }}
                    className="px-2.5 py-1 text-xs bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
                  >
                    50%
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImageWidth('75')
                      setImageWidthUnit('%')
                    }}
                    className="px-2.5 py-1 text-xs bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
                  >
                    75%
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImageWidth('100')
                      setImageWidthUnit('%')
                    }}
                    className="px-2.5 py-1 text-xs bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
                  >
                    100%
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Příklad: 600px nebo 60%. Bez vyplnění se použije plná šířka.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={insertImage}
                  className="btn-primary flex-1"
                  disabled={!imageUrl.trim()}
                >
                  Vložit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowImageDialog(false)
                    setImageUrl('')
                    setImageAlt('')
                  }}
                  className="btn-secondary"
                >
                  Zrušit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
