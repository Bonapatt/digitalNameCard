import { useState } from 'react'

export default function CardForm({ data, onChange }) {
  const [imagePreview, setImagePreview] = useState(data.photo || '')

  const inputClass =
    'mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500'

  const handleChange = (e) => {
    const { name, value } = e.target
    onChange({ ...data, [name]: value })
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setImagePreview(reader.result)
      onChange({ ...data, photo: reader.result })
    }
    reader.readAsDataURL(file)
  }

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Full Name</label>
        <input className={inputClass} name="name" value={data.name} onChange={handleChange} />
      </div>
      <div>
        <label className="block text-sm font-medium">Job Title</label>
        <input className={inputClass} name="title" value={data.title} onChange={handleChange} />
      </div>
      <div>
        <label className="block text-sm font-medium">Company</label>
        <input className={inputClass} name="company" value={data.company} onChange={handleChange} />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input type="email" className={inputClass} name="email" value={data.email} onChange={handleChange} />
      </div>
      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input className={inputClass} name="phone" value={data.phone} onChange={handleChange} />
      </div>
      <div>
        <label className="block text-sm font-medium">LinkedIn / Website</label>
        <input className={inputClass} name="link" value={data.link} onChange={handleChange} />
      </div>
      <div>
        <label className="block text-sm font-medium">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="mt-1 block w-full text-sm text-gray-900 dark:text-gray-100 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
        />
        {imagePreview && (
          <img src={imagePreview} alt="preview" className="mt-2 h-20 w-20 object-cover rounded" />
        )}
      </div>
    </form>
  )
}
