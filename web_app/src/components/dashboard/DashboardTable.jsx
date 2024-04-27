import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel } from "@tanstack/react-table"
import { useState } from "react"

const DashboardTable = ({ students, columns }) => {

    const data = students || []

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
    <div className=" flex items-center justify-start w-full overflow-x-scroll">
        <table className="bg-gray-800 w- full overflow-x-scroll ">
           {columnsDynamic && <thead>
                {
                    table.getHeaderGroups().map( headerGroup => (
                        <tr 
                            key={headerGroup.id}
                            className="bg-gray-900"
                            
                        >
                            {
                                headerGroup.headers.map( header => (
                                    <th 
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="py-6 text-xl font-poppins"
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
                                    className="px-20 py-4"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>}
        </table>
    </div>
  )
}

export default DashboardTable