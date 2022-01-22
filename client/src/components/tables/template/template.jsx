import React, { useMemo } from 'react'

import { 
    useTable, 
    // useFilters,
    // useGlobalFilter,
    // useAsyncDebounce 
} from 'react-table';

import './template.styles.css';

const TableTemplate = ({ columns, data, customClass }) => {

    // React.useMemo(
    //     () => ({
    //       text: (rows, id, filterValue) => {
    //         return rows.filter(row => {
    //           const rowValue = row.values[id]
    //           return rowValue !== undefined
    //             ? String(rowValue)
    //                 .toLowerCase()
    //                 .startsWith(String(filterValue).toLowerCase())
    //             : true
    //         })
    //       },
    //     }),
    //     []
    //   );

    // function GlobalFilter({
    //     preGlobalFilteredRows,
    //     globalFilter,
    //     setGlobalFilter,
    //   }) {
    //     const count = preGlobalFilteredRows.length
    //     const [value, setValue] = useState(globalFilter)
    //     const onChange = useAsyncDebounce(value => {
    //       setGlobalFilter(value || undefined)
    //     }, 200)

    //     return (
    //         <span>
    //           Search:{' '}
    //           <input
    //             value={value || ""}
    //             onChange={e => {
    //               setValue(e.target.value);
    //               onChange(e.target.value);
    //             }}
    //             placeholder={`${count} records...`}
    //             style={{
    //               fontSize: '1.1rem',
    //               border: '0',
    //               padding: '3px 5px',
    //               width: '60%'
    //             }}
    //           />
    //         </span>
    //       )
    //     };

    // function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter },}) {
    //     const count = preFilteredRows.length
        
    //     return (
    //         <input
    //         value={filterValue || ''}
    //         onChange={e => { setFilter(e.target.value || undefined)}}
    //         placeholder={`Search ${count} records...`}
    //         />
    //     );
    // };

    // const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }),[]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        // state,
        // preGlobalFilteredRows,
        // setGlobalFilter,
      } = useTable(
        {
          columns,
          data,
        //   defaultColumn,
        },
        // useFilters, 
        // useGlobalFilter 
      )

    return (
            <table {...getTableProps()} className={`custom-table ${customClass}`}>
            <thead>
                {/* <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                /> */}
                {
                headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                rows.map(row => {
                    prepareRow(row)
                    return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                        <td {...cell.getCellProps()}>
                            {cell.render('Cell')}
                        </td>
                        ))
                    }
                    </tr>
                    )})
                }
            </tbody>
        </table>
    )
}

export default TableTemplate
