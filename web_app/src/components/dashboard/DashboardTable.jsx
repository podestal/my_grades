import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel } from "@tanstack/react-table"
import { useState } from "react"
import { Dialog, DialogPanel } from "@tremor/react"
import UpdateGradeModal from "./dashboardComponents/UpdateGradeModal"
import useCategories from "../../hooks/useCategories"
import CreateAverage from "../averages/CreateAverage"
import UpdateAverage from "../averages/UpdateAverage"
import StudentParticipations from "../participations/StudentParticipations"
import StudentSummaryModal from "./dashboardComponents/StudentSummaryModal"

const DashboardTable = ({ studentsData, columns, selectedCategory, selectedCompetency, selectedCapacity, quarter, assignature, activities }) => {

    const data = studentsData || []
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const [activity, setActivity] = useState('')
    const [student, setStudent] = useState('')
    const [studentId, setStudentId] = useState('')
    const [calification, setCalification] = useState('')
    const [gradeId, setGradeId] = useState('')
    const {categories} = useCategories()
    const [forceConclusions, setForceConclusions] = useState(false)
    const [final, setFinal] = useState(false)
    const averageTitle = selectedCategory == 'all' ? 'Logro' : `Promedio de ${categories.find(cat => cat.id == selectedCategory).title}`
    const [averages, setAverages] = useState(false)
    const [createAverage, setCreateAverage] = useState(false)
    const [averageId, setAverageId] = useState('')
    const [conclusion, setConclusion] = useState('')
    const [isParticipation, setIsParticipation] = useState(false)
    const [studentSummary, setStudentSummary] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState(false)
    const participationsColumn = selectedCapacity != '' && selectedCategory == 'all' ? [{   
        header: 'Participaciones',
        accessorKey: 'participations'
    }] : []
    

    const columnsDynamic = [
        {
            header: 'Alumno',
            accessorKey: 'student'
        },
        // {
        //     header: 'ID',
        //     accessorKey: 'studentId'
        // },
        {
            header: averageTitle,
            accessorKey: 'average'
        },
        ...participationsColumn,
        ...columns
    ]

    const [sorting, setSorting] = useState([])

    const table = useReactTable({
        data,
        columns: columnsDynamic,
        getCoreRowModel:getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting
        },
        onSortingChange: setSorting
    })

  return (
    <div className=" flex items-center justify-start overflow-x-scroll shadow-violet-950 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] mb-12">
        <table className="bg-gray-900">
            {console.log('activities', activities)}
           {columnsDynamic && <thead>
                {
                    table.getHeaderGroups().map( headerGroup => (
                        <tr 
                            key={headerGroup.id}
                    
                        >
                            {
                                headerGroup.headers.map( header => (
                                    <th 
                                        key={header.id}
                                        // onClick={() => console.log('header',header.id)}
                                        className={`py-6 min-w-[160px] ${header.id == 'student' && 'min-w-[300px]'} text-md font-poppins 
                                                    ${header.id == 'student' && 'sticky w-[200px] left-0 bg-gray-900'}
                                                    `}
                                    >
                                        {header.placeholderId ? null : header.column.columnDef.header}
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>}
           {studentsData &&  <tbody>
                {
                    table.getRowModel().rows.map( row => (
                        <tr key={row.id}
                        >
                            {
                                row.getVisibleCells().map( cell => (
                                    <td key={cell.id}
                                    className={`px-18 py-4 font-palanquin text-md 
                                        ${cell.getValue() && cell.getValue().calification == 'AD' && cell.getValue().id != 0 && 'bg-green-500'}
                                        ${cell.getValue() && cell.getValue().calification == 'A' && cell.getValue().id != 0 && 'bg-yellow-300 text-gray-600'}
                                        ${cell.getValue() && cell.getValue().calification == 'B' && cell.getValue().id != 0 && 'bg-amber-500'}
                                        ${cell.getValue() && cell.getValue().calification == 'C' && cell.getValue().id != 0 && 'bg-red-500'}
                                        ${cell.getValue() && cell.getValue().calification == 'NA' && cell.getValue().id != 0 && 'bg-blue-700'}
                                        ${!cell.getValue()?.calification && 'sticky w-[200px] left-0 bg-gray-900'}
                                        border border-violet-950 border-l-0
                                        cursor-pointer
                                        
                                    `}
                                    onClick={() => {

                                        setCreateAverage(false)
                                        setAverages(false)
                                        setForceConclusions(false)
                                        setError(false)
                                        if (cell.getValue()?.school) {
                                            console.log('Student clicked')
                                            setStudentSummary(true)
                                            setStudentId(cell.row.original.studentId)
                                            setSelectedStudent(cell.getValue())
                                            setOpen(true)
                                            return
                                        }
                                        // if (cell.getValue().id == 0)
                                        if (cell.getValue()?.participation) {
                                            setIsParticipation(true)
                                        }
                                        if (cell.column.id == 'average') {
                                            // console.log('conclusion',cell.getValue().conclusion)
                                            const conclusionFromAPI = cell.getValue().conclusion == null ? '' : cell.getValue().conclusion
                                            setAverageId(cell.getValue().id)
                                            setConclusion(conclusionFromAPI)
                                            if (selectedCapacity != '') {
                                                return
                                            }
                                            if (cell.getValue().id == 0) {
                                                setCreateAverage(true)
                                                // console.log('student id',cell.row.original.studentId);
                                                
                                            }
                                        }
                                        if (cell.getValue()?.final) {
                                            setAverages(true)
                                            setForceConclusions(true)
                                            setFinal(true)
                                        }
                                        // console.log('cell', cell.getValue()?.final)
                                        setActivity(cell.column.id)
                                        setOpen(true)
                                        setGradeId(cell.getValue().id)
                                        setCalification(cell.getValue().calification)
                                        setStudent(cell.row.original.fullName)
                                        setStudentId(cell.row.original.studentId)
                                        
                                    }}
                                    >
                                        {/* {console.log(cell.getValue())} */}
                                        {/* {console.log('Cell value', cell.getValue())} */}
                                        {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                                        <p className="text-center hover:ml-3 font-bold">
                                            {cell.getValue() && cell.getValue().calification ? cell.getValue().calification : `${cell.getValue()?.first_name} ${cell.getValue()?.last_name}`}
                                        </p>
                                        
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>}
        </table>
        {/* open, setOpen, setStudentSummary, student */}
        {averages 
        ? 
        <>
            {createAverage 
            ? 
            <CreateAverage
                open={open}
                setOpen={setOpen}
                student={student}
                studentId={studentId}
                calification={calification}
                setCalification={setCalification}
                selectedCompetency={selectedCompetency}
                quarter={quarter}
                assignature={assignature}
                conclusion={conclusion}
                setConclusion={setConclusion}
            />
            : 
            <UpdateAverage
                open={open}
                setOpen={setOpen}
                student={student}
                studentId={studentId}
                calification={calification}
                setCalification={setCalification}
                selectedCompetency={selectedCompetency}
                quarter={quarter}
                assignature={assignature}
                averageId={averageId}
                conclusion={conclusion}
                setConclusion={setConclusion}
            />
            }
        </>
        : 
        <>
            {isParticipation 
            ? 
            <StudentParticipations
                studentId={studentId}
                open={open}
                setOpen={setOpen}
                setIsParticipation={setIsParticipation}
                quarter={quarter}
                selectedCompetency={selectedCompetency}
                selectedCapacity={selectedCapacity}
                assignature={assignature}
            /> 
            : 
            <>
                {studentSummary 
                ? 
                <StudentSummaryModal 
                    open={open}
                    setOpen={setOpen}
                    setStudentSummary={setStudentSummary}
                    student={selectedStudent}
                    activities={activities}
                    studentId={studentId}
                />
                : 
                <UpdateGradeModal 
                    activity={activity}
                    student={student}
                    setOpen={setOpen}
                    open={open}
                    calification={calification}
                    setCalification={setCalification}
                    gradeId={gradeId}
                    forceConclusions={forceConclusions}
                    setForceConclusions={setForceConclusions}
                    error={error}
                    setError={setError}
                    studentId={studentId}
                />}
            </>
            }
        </>
        }
    </div>
  )
}

export default DashboardTable