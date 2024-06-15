import { useAnnouncementsQuery } from "../../tanstack/Announcements"
import Loading from "../../utils/Loading"
import Error from "../../utils/Error"
import useAuth from "../../hooks/useAuth"
import { styles } from "../../utils/styles"
import { useState } from "react"
import Announcements from "../../components/announcemnts/Announcements"
import CreateAnnouncements from "../../components/announcemnts/CreateAnnouncements"
import { useClasesQuery } from "../../tanstack/Clases"
import { useAssignaturesQueryByInstructor } from "../../tanstack/Assignatures"

const AnnouncementsPage = () => {

    const { user } = useAuth()
    const { data: announcements, isLoading: announcementsLoading, isError: isAnnouncementError, error: announcementError} = useAnnouncementsQuery(user)
    const {data: clases, isLoading: clasesLoading, isError: isClasesError, error: clasesError} = useClasesQuery(user)
    const {data: assignatures, isLoading: assignaturesLoading, isError: isAssignaturesError, error: assignaturesError} = useAssignaturesQueryByInstructor(user)

    if (announcementsLoading) return <Loading />

    if (clasesLoading) return <Loading />

    if (assignaturesLoading) return <Loading />

    if (isAnnouncementError) return <Error error={announcementError}/>

    if (isClasesError) return <Error error={clasesError}/>

    if (isAssignaturesError) return <Error error={assignaturesError}/>

  return (
    <div className="text-white min-h-[100vh] mt-[5rem] w-full relative">
        <div className="flex justify-center items-center w-full gap-12">
          <h2 className={`my-12 ${styles.gradientTitle}`}>Anuncios</h2>
          <CreateAnnouncements 
            clases={clases.data}
            assignatures={assignatures}
          />
        </div>
        {/* Filters */}
        {/* Announcemnts */}
        {console.log('announcements', announcements)}
        <Announcements 
            announcements={announcements}
            clases={clases.data}
            assignatures={assignatures}
        />
    </div>
  )
}

export default AnnouncementsPage