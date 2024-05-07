import { styles } from "../../utils/styles"
import useAnnouncements from "../../hooks/useAnnouncements"
import GetAnnouncements from "../../components/getters/GetAnnouncements"
import AnnouncemntsMain from "../../components/announcemnts/AnnouncemntsMain"

const Announcements = () => {

    const {announcements, setAnnouncements} = useAnnouncements()

  return (
    <div className='min-h-[100vh] text-white'>
        <h2 className={`mt-12 ${styles.gradientTitle}`}>Anuncios</h2>
        {!announcements 
        ?        
            <GetAnnouncements 
                setAnnouncements={setAnnouncements}
            />
        :
            <AnnouncemntsMain />
        }
    </div>
  )
}

export default Announcements