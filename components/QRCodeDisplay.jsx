import QRCode from 'react-qr-code'

export default function QRCodeDisplay({ value }) {
  if (!value) return null
  return (
    <div className="p-2 bg-white dark:bg-gray-100 inline-block rounded-lg shadow">
      <QRCode value={value} size={160} />
    </div>
  )
}
