'use client'

import { useEffect, useState } from 'react'

interface AdBannerProps {
  slot?: string
  style?: React.CSSProperties
  format?: string
  responsive?: boolean
}

export default function AdBanner({ 
  slot, 
  style = { display: 'block', minWidth: '320px', minHeight: '100px' },
  format = 'auto',
  responsive = true
}: AdBannerProps) {
  const [showPlaceholder, setShowPlaceholder] = useState(true)
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX'
  const adSlot = slot || process.env.NEXT_PUBLIC_ADSENSE_SLOT || '1234567890'

  useEffect(() => {
    // Zkontrolovat, zda je AdSense ID nastaveno (ne placeholder)
    const isPlaceholder = adClientId.includes('XXXXXXXXXXXXXXXX')
    
    if (isPlaceholder) {
      setShowPlaceholder(true)
      return
    }

    // Inicializovat AdSense pouze pokud není placeholder
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
        setShowPlaceholder(false)
      }
    } catch (err) {
      console.error('AdSense error:', err)
      setShowPlaceholder(true)
    }
  }, [])

  // Zobrazit placeholder banner pro testování
  if (showPlaceholder || adClientId.includes('XXXXXXXXXXXXXXXX')) {
    return (
      <div className="my-8 flex justify-center">
        <div 
          className="bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-600"
          style={{ 
            minWidth: '320px', 
            minHeight: '250px',
            width: '100%',
            maxWidth: '300px'
          }}
        >
          <div className="text-center p-4">
            <p className="text-sm font-semibold mb-2">📢 Reklamní banner</p>
            <p className="text-xs text-gray-500">
              Zde bude zobrazena<br />
              Google AdSense reklama
            </p>
            <p className="text-xs text-gray-400 mt-2">
              (320 x 250)
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Skutečný AdSense banner
  return (
    <div className="my-8 flex justify-center">
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={adClientId}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
