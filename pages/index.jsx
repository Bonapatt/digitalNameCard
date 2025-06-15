import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
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
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
    const { data: encoded } = router.query
    if (typeof encoded === 'string') {
      try {
        const json = atob(encoded)
        const parsed = JSON.parse(json)
        setData(parsed)
      } catch {
        // ignore invalid data
      }
    }
  }, [router.isReady, router.query])

  useEffect(() => {
    const stored = localStorage.getItem('cardData')
    if (stored) setData(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('cardData', JSON.stringify(data))
    const encoded = btoa(JSON.stringify(data))
    if (typeof window !== 'undefined') {
      setShareUrl(`${window.location.origin}/card?data=${encoded}`)
    }
  }, [data])

  const vcfString = generateVcf(data)

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-8 font-sans text-gray-700 dark:text-gray-100 bg-gray-50 dark:bg-gray-900">
      <section className="w-full max-w-3xl space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-extrabold mb-6 text-indigo-600 dark:text-indigo-400 text-center">
            VCF Digital Name Card
          </h1>
          <CardForm data={data} onChange={setData} />
          <div className="mt-4 space-x-2 text-center">
            {shareUrl && (
              <a
                href={shareUrl}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300 transition"
              >
                Share Link
              </a>
            )}
          </div>
          <DownloadButtons data={data} cardRef={cardRef} qrValue={vcfString} />
        </div>
        <div className="flex flex-col items-center space-y-4 text-center">
          <CardPreview data={data} refProp={cardRef} />
          <QRCodeDisplay value={vcfString} />
        </div>
      </section>
    </main>
  )
}
