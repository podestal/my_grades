import moment from 'moment'
import 'moment/dist/locale/es'


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
        obj[participation.created_at] = [participation.calification]
        const foundObj = participationsData.find( data => Object.keys(data)[0] == participation.created_at)
        if (foundObj) {
            foundObj[participation.created_at].push(participation.calification) 
        } else {
            participationsData.push(obj)
        }
    })

    const getFormmatedDate = () => {

    }
  return (
    <div className='text-white w-full flex flex-col justify-center items-center gap-4'>
        {console.log('participations',participations)}
        {console.log('participationsData', participationsData)}
        {participationsData.map( data => (
            <div className='flex gap-8 justify-between items-start w-[75%]'>
                <p>{moment(Object.keys(data)[0]).locale('es').format('dddd Do')} de {moment(Object.keys(data)[0]).locale('es').format('MMMM')}:</p>
                <p>{data[Object.keys(data)[0]].length} participaciones</p>
            </div>
        ))}

    </div>
  )
}
 
export default ParticipationsSummary