import moment from "moment"
import { Divider } from "@tremor/react"

const Participation = ({ participationDate, participationsCalifications }) => {

    const fomrattedDate = `${moment(participationDate).locale('es').format('dddd Do')} ${moment(participationDate).locale('es').format('MMMM')}`

  return (
    <div className='flex flex-col justify-between items-start w-[75%]'>
        <div className="flex gap-8 justify-between w-[100%] mb-4">
            <p className='font-bold font-poppins'>{fomrattedDate}:</p>
            <p>{participationsCalifications.length} {participationsCalifications.length > 1 ? 'participaciones' : 'participación'}</p>
        </div>
        <div className="flex gap-6 W-[100%]">
            {participationsCalifications.map( calification => (
                <p
                    className={`font-bold 
                        ${calification == 'AD' && 'text-green-500'}
                        ${calification == 'A' && 'text-yellow-300'}
                        ${calification == 'B' && 'text-amber-500'}
                        ${calification == 'C' && 'text-red-500'}
                    `}
                >{calification}</p>
            ))}
        </div>
        <Divider></Divider>
    </div>
  )
}

export default Participation