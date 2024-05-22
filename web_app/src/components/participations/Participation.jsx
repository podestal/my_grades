import moment from "moment"
import { Divider } from "@tremor/react"

const Participation = ({ participationDate, participations, setParticipation, setUpdate, setOpenForm }) => {

    const fomrattedDate = `${moment(participationDate).locale('es').format('dddd Do')} ${moment(participationDate).locale('es').format('MMMM')}`

  return (
    <div className='flex flex-col justify-between items-start w-[75%]'>
        <div className="flex gap-8 justify-between w-[100%] mb-4">
            <p className='font-bold font-poppins'>{fomrattedDate}:</p>
            <p>{participations.length} {participations.length > 1 ? 'participaciones' : 'participación'}</p>
        </div>
        <div className="flex gap-6 W-[100%]">
            {participations.map( participation => (
                <p
                    onClick={() =>{ 
                        console.log('calification from participation', participation)
                        setParticipation(participation)
                        setUpdate(true)
                        setOpenForm(true)
                    }}
                    className={`
                        font-bold cursor-pointer
                        ${participation.calification == 'AD' && 'text-green-500'}
                        ${participation.calification == 'A' && 'text-yellow-300'}
                        ${participation.calification == 'B' && 'text-amber-500'}
                        ${participation.calification == 'C' && 'text-red-500'}
                    `}
                >{participation.calification}</p>
            ))}
        </div>
        <Divider></Divider>
    </div>
  )
}

export default Participation