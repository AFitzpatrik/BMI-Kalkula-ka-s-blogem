'use client'

import { useEffect } from 'react'

interface AdBannerProps {
  slot?: string
  style?: React.CSSProperties
  format?: string
  responsive?: boolean
}

export default function AdBanner({ 
  slot = '1234567890', 
  style = { display: 'block', minWidth: '320px', minHeight: '100px' },
  format = 'auto',
  responsive = true
}: AdBannerProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      }
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <div className="my-8 flex justify-center">
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
