import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import CardForm from '../components/CardForm'
import CardPreview from '../components/CardPreview'
import QRCodeDisplay from '../components/QRCodeDisplay'
import DownloadButtons from '../components/DownloadButtons'
import generateVcf from '../utils/vcfGenerator'

const defaultData = {
  name: '',
  title: '',
  company: '',
  email: '',
  phone: '',
  link: '',
  photo: '',
}

export default function Home() {
  const [data, setData] = useState(defaultData)

  const cardRef = useRef(null)
  const [shareUrl, setShareUrl] = useState('')
  const router = useRouter()

  const handleReset = () => {
    setData(defaultData)
  }

  const copyLink = async () => {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert('Link copied to clipboard')
    } catch {
      alert('Failed to copy link')
    }
  }

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
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-8 font-sans text-gray-700 dark:text-gray-100 bg-gradient-to-br from-blue-50 via-purple-100 to-indigo-200 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <section className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <h1 className="text-3xl font-extrabold mb-6 text-indigo-600 dark:text-indigo-400 text-center">
            VCF Digital Name Card
          </h1>
          <CardForm data={data} onChange={setData} />
          <div className="flex flex-wrap items-center justify-center gap-2">
            {shareUrl && (
              <>
                <a
                  href={shareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300 transition"
                >
                  Open Link
                </a>
                <button
                  onClick={copyLink}
                  className="px-2 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-sm"
                >
                  Copy Link
                </button>
              </>
            )}
          </div>
          <div className="mt-4 flex justify-center space-x-2">
            <DownloadButtons data={data} cardRef={cardRef} qrValue={vcfString} />
            <button
              onClick={handleReset}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4 text-center">
          <CardPreview data={data} refProp={cardRef} />
          <QRCodeDisplay value={vcfString} />
        </div>
      </section>
    </main>
  )
}
