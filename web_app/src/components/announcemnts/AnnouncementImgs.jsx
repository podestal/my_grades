import { API_URL } from "../../api/api"

const AnnouncementImgs = ({ images, form }) => {
  return (
    <div className={` flex ${form && 'flex-col'}`}>
        {images.map( img => (
            <img className="my-8" key={img.id} width={form ? 150 :450} height={form ? 150 :450} src={`${API_URL}${img.image}`}/>
        ))}
    </div>
  )
}

export default AnnouncementImgs