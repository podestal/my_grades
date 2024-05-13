import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel } from "@tanstack/react-table"
import { useState } from "react"
import { Dialog, DialogPanel } from "@tremor/react"
import UpdateGradeModal from "./dashboardComponents/UpdateGradeModal"

const DashboardTable = ({ studentsData, columns, selectedCategory, selectedCompetency }) => {

    const data = studentsData || []
    const [open, setOpen] = useState(false)
    const [activity, setActivity] = useState('')
    const [student, setStudent] = useState('')
    const [calification, setCalification] = useState('')
    const [gradeId, setGradeId] = useState('')

    const columnsDynamic = [
        {
            header: 'Alumno',
            accessorKey: 'fullName'
        },
        {
            header: 'Promedio',
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
                                        if (cell.column.id == 'average') {
                                            if (selectedCategory != 'all' || selectedCompetency == 'all') {
                                                return
                                            }
                                        }
                                        setActivity(cell.column.id)
                                        setOpen(true)
                                        setGradeId(cell.getValue().id)
                                        setCalification(cell.getValue().calification)
                                        setStudent(cell.row.original.fullName)
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
        <UpdateGradeModal 
            activity={activity}
            student={student}
            setOpen={setOpen}
            open={open}
            calification={calification}
            gradeId={gradeId}
        />
    </div>
  )
}

export default DashboardTable