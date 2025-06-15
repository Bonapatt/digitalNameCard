import { useRouter } from 'next/router'
import { useMemo } from 'react'
import CardPreview from '../components/CardPreview'

export default function ViewCard() {
  const router = useRouter()
  const { data: encoded } = router.query

  const cardData = useMemo(() => {
    if (!encoded || typeof encoded !== 'string') return {}
    try {
      const json = atob(encoded)
      return JSON.parse(json)
    } catch {
      return {}
    }
  }, [encoded])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <CardPreview data={cardData} />
    </div>
  )
}
