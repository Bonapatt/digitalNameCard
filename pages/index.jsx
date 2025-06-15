import { useEffect, useRef, useState } from 'react'
import CardForm from '../components/CardForm'
import CardPreview from '../components/CardPreview'
import QRCodeDisplay from '../components/QRCodeDisplay'
import DownloadButtons from '../components/DownloadButtons'
import generateVcf from '../utils/vcfGenerator'

export default function Home() {
  const [data, setData] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    link: '',
    photo: '',
  })

  const cardRef = useRef(null)
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('cardData')
    if (stored) setData(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('cardData', JSON.stringify(data))
    const encoded = Buffer.from(JSON.stringify(data)).toString('base64')
    if (typeof window !== 'undefined') {
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
            <a href={shareUrl} target="_blank" rel="noreferrer" className="text-blue-500 underline">
              Share Link
            </a>
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
