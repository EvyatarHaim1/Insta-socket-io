export const uploadService = async (ev) => {
  const CLOUD_NAME = 'dsinv9pik'
  const UPLOAD_PRESET = 'Oliakra'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const files = ev.target.files
  const formData = new FormData()

  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)
    try {
      const res = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData,
      })
      const elImg = document.createElement('img')
      const { url } = await res.json()

      return url
    } catch (err) {
      console.error(err)
    }
  }
}
