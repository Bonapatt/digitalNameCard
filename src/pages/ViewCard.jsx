import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import CardPreview from '../components/CardPreview'

export default function ViewCard() {
  const [params] = useSearchParams()
  const cardData = useMemo(() => {
    const encoded = params.get('data')
    if (!encoded) return {}
    try {
      const json = atob(encoded)
      return JSON.parse(json)
    } catch {
      return {}
    }
  }, [params])

  return (
    <div className="p-4 flex justify-center">
      <CardPreview data={cardData} />
    </div>
  )
}
