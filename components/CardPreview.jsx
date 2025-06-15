export default function CardPreview({ data, refProp }) {
  return (
    <div
      ref={refProp}
      className="max-w-sm rounded-xl overflow-hidden shadow-lg p-6 bg-card-gradient text-white backdrop-blur-sm ring-1 ring-white/10 transform-gpu hover:scale-105 transition-transform duration-300"
    >
      {data.photo && (
        <img
          src={data.photo}
          alt="profile"
          className="h-24 w-24 object-cover rounded-full mx-auto mb-4 ring-2 ring-white/50"
        />
      )}
      <h2 className="text-xl font-bold text-center">{data.name || 'Full Name'}</h2>
      <p className="text-center text-sm">{data.title || 'Job Title'}</p>
      <p className="text-center text-sm mb-2">{data.company || 'Company'}</p>
      <p className="text-center text-sm">{data.email}</p>
      <p className="text-center text-sm">{data.phone}</p>
      {data.link && (
        <a
          href={data.link}
          className="text-blue-200 underline text-center block hover:text-white transition-colors"
          target="_blank"
          rel="noreferrer"
        >
          {data.link}
        </a>
      )}
    </div>
  )
}
