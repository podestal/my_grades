import { styles } from "../../utils/styles"
import useAnnouncements from "../../hooks/useAnnouncements"
import GetAnnouncements from "../../components/getters/GetAnnouncements"
import AnnouncemntsMain from "../../components/announcemnts/AnnouncemntsMain"
import CreateAnnouncements from "../../components/announcemnts/CreateAnnouncements"

const Announcements = () => {

    const {announcements, setAnnouncements} = useAnnouncements()

  return (
    <div className='min-h-[100vh] text-white'>
        <div className="flex items-center justify-center mt-12 gap-12">
            <h2 className={`${styles.gradientTitle}`}>Anuncios</h2>
            <CreateAnnouncements />
        </div>
        {announcements.length == 0 
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