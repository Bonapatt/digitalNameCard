import QRCode from 'react-qr-code'

export default function QRCodeDisplay({ value }) {
  if (!value) return null
  return (
    <div className="p-2 bg-white inline-block">
      <QRCode value={value} size={128} />
    </div>
  )
}
