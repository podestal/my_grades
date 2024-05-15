import { styles } from "../../utils/styles"
import useAnnouncements from "../../hooks/useAnnouncements"
import GetAnnouncements from "../../components/getters/GetAnnouncements"
import AnnouncemntsMain from "../../components/announcemnts/AnnouncemntsMain"
import CreateAnnouncements from "../../components/announcemnts/CreateAnnouncements"
import { competenciesData } from "../../data/competencies"
import { MultiSelect, MultiSelectItem } from "@tremor/react"
import { useState } from "react"

const Announcements = () => {

    const {announcements, setAnnouncements} = useAnnouncements()

    const [selectedCompetencies, setSelectedCompetencies] = useState([])

  return (
    <div className='min-h-[100vh] text-white'>
        {console.log('selectedCompetencies', selectedCompetencies)}
        {/* <div className="flex items-center justify-center mt-12 gap-12">
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
        } */}
        <MultiSelect value={selectedCompetencies} onValueChange={value => {
            setSelectedCompetencies(value)
        }}>
            <MultiSelectItem value="1">primera</MultiSelectItem>
            <MultiSelectItem value="2">segunda</MultiSelectItem>
            <MultiSelectItem value="3">tercera</MultiSelectItem>
        </MultiSelect>
    </div>
  )
}

export default Announcements