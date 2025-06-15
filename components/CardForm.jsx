import { useState } from 'react'

export default function CardForm({ data, onChange }) {
  const [imagePreview, setImagePreview] = useState(data.photo || '')

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
        <input
          className="mt-1 w-full border px-3 py-2 rounded"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Job Title</label>
        <input
          className="mt-1 w-full border px-3 py-2 rounded"
          name="title"
          value={data.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Company</label>
        <input
          className="mt-1 w-full border px-3 py-2 rounded"
          name="company"
          value={data.company}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          className="mt-1 w-full border px-3 py-2 rounded"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          className="mt-1 w-full border px-3 py-2 rounded"
          name="phone"
          value={data.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">LinkedIn / Website</label>
        <input
          className="mt-1 w-full border px-3 py-2 rounded"
          name="link"
          value={data.link}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleImage} />
        {imagePreview && (
          <img src={imagePreview} alt="preview" className="mt-2 h-20 w-20 object-cover rounded" />
        )}
      </div>
    </form>
  )
}
