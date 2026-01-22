'use client'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Jednoduchý markdown parser
  const parseMarkdown = (text: string): string => {
    if (!text) return ''
    
    let html = text

    // Code blocks (nejdříve, aby se neparsovaly jiné věci uvnitř)
    html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>')

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold mt-6 mb-4 text-gray-900">$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mt-8 mb-4 text-gray-900">$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mt-8 mb-4 text-gray-900">$1</h1>')

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary-300 pl-4 py-2 my-4 bg-gray-50 italic text-gray-700">$1</blockquote>')

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<div class="my-6"><img src="$2" alt="$1" class="w-full rounded-lg shadow-md" loading="lazy" /><p class="text-sm text-gray-500 text-center mt-2 italic">$1</p></div>')

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 hover:text-primary-700 underline" target="_blank" rel="noopener noreferrer">$1</a>')

    // Lists
    html = html.replace(/^- (.+)$/gim, '<li class="ml-6 list-disc mb-2">$1</li>')
    // Obalit souvislé listy do <ul>
    html = html.replace(/(<li[^>]*>[\s\S]*?<\/li>(?:\s*<li[^>]*>[\s\S]*?<\/li>)*)/g, '<ul class="list-disc space-y-2 my-4 ml-6">$1</ul>')

    // Inline code (po links, aby se neparsovaly uvnitř)
    html = html.replace(/`([^`\n]+)`/g, '<code class="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')

    // Italic (po bold, aby se neparsovaly ** jako italic)
    html = html.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em class="italic">$1</em>')

    // Paragraphs - rozdělit na odstavce podle dvojitých nových řádků
    const lines = html.split('\n')
    const paragraphs: string[] = []
    let currentPara: string[] = []

    lines.forEach((line, index) => {
      const trimmed = line.trim()
      
      // Pokud je prázdný řádek, ukončit odstavec
      if (!trimmed) {
        if (currentPara.length > 0) {
          paragraphs.push(currentPara.join(' '))
          currentPara = []
        }
        return
      }

      // Pokud začíná HTML tagem (header, list, blockquote, img, pre), ukončit odstavec
      if (trimmed.match(/^<(h[1-6]|ul|li|blockquote|div|pre|img)/)) {
        if (currentPara.length > 0) {
          paragraphs.push(currentPara.join(' '))
          currentPara = []
        }
        paragraphs.push(trimmed)
        return
      }

      // Přidat do aktuálního odstavce
      currentPara.push(trimmed)
    })

    // Přidat poslední odstavec
    if (currentPara.length > 0) {
      paragraphs.push(currentPara.join(' '))
    }

    // Obalit odstavce do <p> tagů
    html = paragraphs.map(para => {
      const trimmed = para.trim()
      if (!trimmed) return ''
      // Pokud už je HTML tag, nechat jak je
      if (trimmed.match(/^</)) {
        return trimmed
      }
      // Jinak vytvořit odstavec
      return `<p class="mb-4 leading-relaxed">${trimmed}</p>`
    }).filter(p => p).join('\n')

    return html
  }

  return (
    <div 
      className="prose prose-lg max-w-none text-gray-700"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  )
}
