import { useRouter } from 'next/router'
import { useMemo } from 'react'
import CardPreview from '../components/CardPreview'

export default function ViewCard() {
  const router = useRouter()
  const { data: encoded } = router.query

  const cardData = useMemo(() => {
    if (!encoded) return {}
    try {
      const json = Buffer.from(encoded, 'base64').toString()
      return JSON.parse(json)
    } catch {
      return {}
    }
  }, [encoded])

  return (
    <div className="p-4 flex justify-center">
      <CardPreview data={cardData} />
    </div>
  )
}
