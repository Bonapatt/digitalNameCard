import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { Buffer } from 'buffer'
import CardPreview from '../src/components/CardPreview'

export default function CardPage() {
  const router = useRouter()
  const dataParam = router.query.data

  const cardData = useMemo(() => {
    if (!dataParam) return {}
    try {
      const decoded = typeof window === 'undefined'
        ? Buffer.from(dataParam, 'base64').toString('utf-8')
        : atob(dataParam)
      return JSON.parse(decoded)
    } catch {
      return {}
    }
  }, [dataParam])

  return (
    <div className="p-4 flex justify-center">
      <CardPreview data={cardData} />
    </div>
  )
}
