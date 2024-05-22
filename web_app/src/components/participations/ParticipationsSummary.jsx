import moment from 'moment'
import 'moment/dist/locale/es'
import Participation from './Participation'


const ParticipationsSummary = ({ participations }) => {

    
    const participationsData = []
    const todayEnglish = moment()
    console.log(todayEnglish)
    const todaySpanish = moment().locale('es')
    console.log(todaySpanish)
    participations.sort((a ,b) => {
        if (a.created_at < b.created_at) {
            return -1
        } 
        if (a.created_at > b.created_at) {
            return 1
        }
        return 0
    })
    participations.map( participation => {
        const obj = {}
        console.log('obj',obj)
        // obj[participation.created_at] = [participation.calification]
        obj[participation.created_at] = [participation]
        const foundObj = participationsData.find( data => Object.keys(data)[0] == participation.created_at)
        if (foundObj) {
            foundObj[participation.created_at].push(participation) 
        } else {
            participationsData.push(obj)
        }
    })



    const getFormmatedDate = () => {

    }

  return (
    <div className='text-white w-full flex flex-col justify-center items-center gap-4'>
        {/* {console.log('participationsData',participationsData)} */}
        {participationsData.map( data => (
            <Participation 
                key={Object.keys(data)[0]}
                participationDate={Object.keys(data)[0]}
                participations={data[Object.keys(data)[0]]}
            />
        ))}
    </div>
  )
}
 
export default ParticipationsSummary