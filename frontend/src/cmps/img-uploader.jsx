import { updateImgUrl } from '../store/story.actions.js'
import { uploadService } from '../assets/services.js/upload.service.js'

export function ImgUploader({ onUploaded = null, changeImage }) {
  async function uploadImg(ev) {
    let secure_url = await uploadService(ev)
    onUploaded && onUploaded(secure_url)
    updateImgUrl(secure_url)
  }

  return (
    <div className='upload-preview'>
      <button className='replace-img-btn'>
        <label htmlFor='imgUpload'>
          {changeImage ? 'Replace Image' : 'Select from computer'}
        </label>
      </button>
      <input
        type='file'
        hidden
        multiple
        size='60'
        onChange={uploadImg}
        accept='img/*'
        id='imgUpload'
      />
    </div>
  )
}
