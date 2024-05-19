import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel } from "@tanstack/react-table"
import { useState } from "react"
import { Dialog, DialogPanel } from "@tremor/react"
import UpdateGradeModal from "./dashboardComponents/UpdateGradeModal"
import useCategories from "../../hooks/useCategories"
import CreateAverage from "../averages/CreateAverage"

// FOR NOW
import AveragesForm from "../averages/AveragesForm"

const DashboardTable = ({ studentsData, columns, selectedCategory, selectedCompetency, selectedCapacity, quarter, assignature }) => {

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
    

    const columnsDynamic = [
        {
            header: 'ID',
            accessorKey: 'studentId'
        },
        {
            header: 'Alumno',
            accessorKey: 'fullName'
        },
        {
            header: averageTitle,
            accessorKey: 'average'
        },
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
            {/* {console.log('averageTitle', averageTitle)} */}
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
                                        onClick={() => console.log(header)}
                                        className={`py-6 min-w-[160px] ${header.id == 'fullName' && 'min-w-[300px]'} text-md font-poppins sticky top-0 `}
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
                                        // if (cell.getValue().id == 0)
                                        if (cell.column.id == 'average') {
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
                                            {cell.getValue() && cell.getValue().calification ? cell.getValue().calification : cell.getValue()}
                                        </p>
                                        
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>}
        </table>
        
        {averages 
        ? 
        <>
            {console.log('handling averages')}
            {createAverage 
            ? 
                // open, setOpen, student, studentId, calification, setCalification, average, quarter, assignature, create 
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
            />

            : 
            // open, setOpen, student, studentId, calification, setCalification, average, quarter, assignature, create 
            // <CreateAverage
            //     open={open}
            //     setOpen={setOpen}
            //     student={student}
            //     studentId={studentId}
            //     calification={calification}
            //     setCalification={setCalification}
            //     selectedCompetency={selectedCompetency}
            //     quarter={quarter}
            //     assignature={assignature}
            // />
            <>{console.log('Update average')}</>
            }
        </>
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
        />
        }
    </div>
  )
}

export default DashboardTable