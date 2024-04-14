import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"

const DashboardTable = ({ students, columns }) => {

    const table = useReactTable({
        data: students,
        columns: [
            {
                header: 'First Name',
                accessorKey: 'firstName'
            },
            {
                header: 'Last Name',
                accessorKey: 'lastName'
            },
            ...columns
        ],
        getCoreRowModel:getCoreRowModel()
    })

  return (
    <div>
        <table>
            <thead>
                {
                    table.getHeaderGroups().map( headerGroup => (
                        <tr 
                            key={headerGroup.id}
                        >
                            {
                                headerGroup.headers.map( header => (
                                    <th 
                                        key={header.id}
                                        // onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {header.placeholderId ? null : header.column.columnDef.header}
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody>
                {
                    table.getRowModel().rows.map( row => (
                        <tr key={row.id}>
                            {
                                row.getVisibleCells().map( cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default DashboardTable