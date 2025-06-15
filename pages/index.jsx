import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import CardForm from '../src/components/CardForm'
import CardPreview from '../src/components/CardPreview'
import QRCodeDisplay from '../src/components/QRCodeDisplay'
import DownloadButtons from '../src/components/DownloadButtons'
import generateVcf from '../src/utils/vcfGenerator'

export default function Home() {
  const [data, setData] = useState(() => {
    if (typeof window === 'undefined') return {
      name: '',
      title: '',
      company: '',
      email: '',
      phone: '',
      link: '',
      photo: '',
    }
    const stored = localStorage.getItem('cardData')
    return stored ? JSON.parse(stored) : {
      name: '',
      title: '',
      company: '',
      email: '',
      phone: '',
      link: '',
      photo: '',
    }
  })

  const cardRef = useRef(null)
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cardData', JSON.stringify(data))
      const encoded = btoa(JSON.stringify(data))
      setShareUrl(`${window.location.origin}/card?data=${encoded}`)
    }
  }, [data])

  const vcfString = generateVcf(data)

  return (
    <div className="p-4 max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">VCF Digital Name Card</h1>
        <CardForm data={data} onChange={setData} />
        <div className="mt-4 space-x-2">
          {shareUrl && (
            <Link href={shareUrl} target="_blank" className="text-blue-500 underline">
              Share Link
            </Link>
          )}
        </div>
        <DownloadButtons data={data} cardRef={cardRef} qrValue={vcfString} />
      </div>
      <div className="flex flex-col items-center space-y-4">
        <CardPreview data={data} refProp={cardRef} />
        <QRCodeDisplay value={vcfString} />
      </div>
    </div>
  )
}
