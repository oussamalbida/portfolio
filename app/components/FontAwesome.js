'use client'
import Script from 'next/script'

export default function FontAwesome() {
  return (
    <Script 
      src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"
      strategy="afterInteractive"
    />
  )
}
