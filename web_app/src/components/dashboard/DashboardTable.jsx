import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel } from "@tanstack/react-table"
import { useState } from "react"
import { Dialog, DialogPanel } from "@tremor/react"

const DashboardTable = ({ students, columns }) => {

    const data = students || []
    const [open, setOpen] = useState(false)

    const columnsDynamic = [
        {
            header: 'First Name',
            accessorKey: 'firstName'
        },
        {
            header: 'Last Name',
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
        <table className="bg-gray-900 w- full overflow-x-scroll ">
           {columnsDynamic && <thead>
                {
                    table.getHeaderGroups().map( headerGroup => (
                        <tr 
                            key={headerGroup.id}
                            className="bg-gray-950"
                            
                        >
                            {
                                headerGroup.headers.map( header => (
                                    <th 
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="py-6 w-[260px] text-xl font-poppins"
                                    >
                                        {header.placeholderId ? null : header.column.columnDef.header}
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>}
           {students &&  <tbody>
                {
                    table.getRowModel().rows.map( row => (
                        <tr key={row.id}
                        >
                            {
                                row.getVisibleCells().map( cell => (
                                    <td key={cell.id}
                                    className={`px-8 py-4 font-palanquin text-lg 
                                        ${cell.getValue() == 'AD' && 'bg-green-500'}
                                        ${cell.getValue() == 'A' && 'bg-yellow-300'}
                                        ${cell.getValue() == 'B' && 'bg-amber-500'}
                                        ${cell.getValue() == 'C' && 'bg-red-500'}
                                        ${cell.getValue() == 'NA' && 'bg-blue-600'}
                                        border border-slate-800
                                        cursor-pointer
                                    `}
                                    onClick={() => setOpen(true)}
                                    >
                                        {console.log(cell.getValue())}
                                        {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                                        <p className="text-center">
                                            {cell.getValue()}
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
                <h2>Modificar Nota</h2>
                <button onClick={() => setOpen(false)}> 
                    Close
                </button>
            </DialogPanel>
        </Dialog>
    </div>
  )
}

export default DashboardTable