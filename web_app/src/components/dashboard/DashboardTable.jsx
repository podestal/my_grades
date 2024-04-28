import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel } from "@tanstack/react-table"
import { useState } from "react"
import { Dialog, DialogPanel } from "@tremor/react"
import UpdateGradeModal from "./dashboardComponents/UpdateGradeModal"

const DashboardTable = ({ studentsData, columns }) => {

    const data = studentsData || []
    const [open, setOpen] = useState(false)
    const [activity, setActivity] = useState('')
    const [student, setStudent] = useState('')
    const [calification, setCalification] = useState('')
    const [gradeId, setGradeId] = useState('')

    const columnsDynamic = [
        {
            header: 'Nombres',
            accessorKey: 'firstName'
        },
        {
            header: 'Apellidos',
            accessorKey: 'lastName'
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
    <div className=" flex items-center justify-start w-full overflow-x-scroll shadow-violet-950 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]">
        {/* {console.log('Students', students[0].grades[0].calification)} */}
        <table className="bg-gray-900 w- full overflow-x-scroll ">
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
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="py-6 min-w-[160px] text-xl font-poppins"
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
                            className="w-[120px]"
                        >
                            {
                                row.getVisibleCells().map( cell => (
                                    <td key={cell.id}
                                    className={`px-8 py-4 font-palanquin text-lg 
                                        ${cell.getValue() && cell.getValue().calification == 'AD' && 'bg-green-500'}
                                        ${cell.getValue() && cell.getValue().calification == 'A' && 'bg-yellow-300'}
                                        ${cell.getValue() && cell.getValue().calification == 'B' && 'bg-amber-500'}
                                        ${cell.getValue() && cell.getValue().calification == 'C' && 'bg-red-500'}
                                        ${cell.getValue() && cell.getValue().calification == 'NA' && 'bg-blue-600'}
                                        border border-violet-950
                                        cursor-pointer
                                        
                                    `}
                                    onClick={() => {
                                        setActivity(cell.column.id)
                                        setOpen(true)
                                        setGradeId(cell.getValue().gradeId)
                                        setCalification(cell.getValue().calification)
                                        setStudent(`${cell.row.original.firstName} ${cell.row.original.lastName}`)
                                    }}
                                    >
                                        {/* {console.log(cell.row.original.firstName)} */}
                                        {/* {console.log('Cell value', cell.getValue())} */}
                                        {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                                        <p className="text-center hover:ml-3">
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
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            static={true}
        >
            <DialogPanel>
                <UpdateGradeModal 
                    activity={activity}
                    student={student}
                    setOpen={setOpen}
                    calification={calification}
                    gradeId={gradeId}
                />
            </DialogPanel>
        </Dialog>
    </div>
  )
}

export default DashboardTable