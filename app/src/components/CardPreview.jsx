export default function CardPreview({ data, refProp }) {
  return (
    <div ref={refProp} className="max-w-sm rounded shadow p-4 bg-white text-gray-900">
      {data.photo && (
        <img src={data.photo} alt="profile" className="h-24 w-24 object-cover rounded-full mx-auto mb-4" />
      )}
      <h2 className="text-xl font-bold text-center">{data.name || 'Full Name'}</h2>
      <p className="text-center text-sm">{data.title || 'Job Title'}</p>
      <p className="text-center text-sm mb-2">{data.company || 'Company'}</p>
      <p className="text-center text-sm">{data.email}</p>
      <p className="text-center text-sm">{data.phone}</p>
      {data.link && (
        <a href={data.link} className="text-blue-500 text-center block" target="_blank" rel="noreferrer">
          {data.link}
        </a>
      )}
    </div>
  )
}
