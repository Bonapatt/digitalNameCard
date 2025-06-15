import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import CardForm from './components/CardForm'
import CardPreview from './components/CardPreview'
import QRCodeDisplay from './components/QRCodeDisplay'
import DownloadButtons from './components/DownloadButtons'
import ViewCard from './pages/ViewCard'
import './App.css'

export default function App() {
  const [data, setData] = useState(() => {
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

  useEffect(() => {
    localStorage.setItem('cardData', JSON.stringify(data))
  }, [data])

  const encodedData = btoa(JSON.stringify(data))
  const shareUrl = `${window.location.origin}/card?data=${encodedData}`

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <div className="p-4 max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
              <div>
                <h1 className="text-2xl font-bold mb-4">VCF Digital Name Card</h1>
                <CardForm data={data} onChange={setData} />
                <div className="mt-4 space-x-2">
                  <a href={shareUrl} target="_blank" className="text-blue-500 underline">
                    Share Link
                  </a>
                </div>
                <DownloadButtons data={data} cardRef={cardRef} qrValue={shareUrl} />
              </div>
              <div className="flex flex-col items-center space-y-4">
                <CardPreview data={data} refProp={cardRef} />
                <QRCodeDisplay value={shareUrl} />
              </div>
            </div>
          )}
        />
        <Route path="/card" element={<ViewCard />} />
        <Route path="*" element={(
          <div className="p-4 text-center">
            <p>Page not found.</p>
            <Link to="/" className="text-blue-500 underline">Go Home</Link>
          </div>
        )} />
      </Routes>
    </BrowserRouter>
  )
}
