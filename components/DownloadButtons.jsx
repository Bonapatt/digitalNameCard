import { toPng } from 'html-to-image'
import { saveAs } from 'file-saver'
import generateVcf from '../utils/vcfGenerator'

export default function DownloadButtons({ data, cardRef, qrValue }) {
  const downloadVcf = () => {
    const vcfContent = generateVcf(data)
    const blob = new Blob([vcfContent], { type: 'text/vcard;charset=utf-8' })
    saveAs(blob, `${data.name || 'contact'}.vcf`)
  }

  const downloadPng = () => {
    if (!cardRef.current) return
    toPng(cardRef.current).then((dataUrl) => {
      saveAs(dataUrl, 'namecard.png')
    })
  }

  const downloadQr = () => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return
    canvas.toBlob((blob) => {
      if (blob) saveAs(blob, 'qr.png')
    })
  }

  return (
    <div className="space-x-2 mt-4">
      <button onClick={downloadVcf} className="px-3 py-2 bg-blue-500 text-white rounded">
        Download VCF
      </button>
      <button onClick={downloadPng} className="px-3 py-2 bg-green-500 text-white rounded">
        Download Card
      </button>
      {qrValue && (
        <button onClick={downloadQr} className="px-3 py-2 bg-purple-500 text-white rounded">
          Download QR
        </button>
      )}
    </div>
  )
}
