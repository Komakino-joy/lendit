import React, { useMemo } from 'react'

import { 
    useTable, 
<<<<<<< HEAD
    // useFilters,
    // useGlobalFilter,
    // useAsyncDebounce 
} from 'react-table';

=======
    useFilters,
    useGlobalFilter 
} from 'react-table';

import GlobalFilter from './global-filter';

>>>>>>> ec7fea9a3405a91f2d32c719ef41f0dbe4031e8d
import './template.styles.css';

const TableTemplate = ({ columns, data, customClass }) => {

<<<<<<< HEAD
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
=======
    useMemo(
        () => ({
          text: (rows, id, filterValue) => {
            return rows.filter(row => {
              const rowValue = row.values[id]
              return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue).toLowerCase())
                : true
            })
          },
        }),
        []
      );

    function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter },}) {
        const count = preFilteredRows.length
        
        return (
            <input
            value={filterValue || ''}
            onChange={e => { setFilter(e.target.value || undefined)}}
            placeholder={`Search ${count} records...`}
            />
        );
    };

    const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }),[]);
>>>>>>> ec7fea9a3405a91f2d32c719ef41f0dbe4031e8d

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
<<<<<<< HEAD
        // state,
        // preGlobalFilteredRows,
        // setGlobalFilter,
=======
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
>>>>>>> ec7fea9a3405a91f2d32c719ef41f0dbe4031e8d
      } = useTable(
        {
          columns,
          data,
<<<<<<< HEAD
        //   defaultColumn,
        },
        // useFilters, 
        // useGlobalFilter 
=======
          defaultColumn,
        },
        useFilters, 
        useGlobalFilter 
>>>>>>> ec7fea9a3405a91f2d32c719ef41f0dbe4031e8d
      )

    return (
            <table {...getTableProps()} className={`custom-table ${customClass}`}>
            <thead>
<<<<<<< HEAD
                {/* <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                /> */}
=======
                <tr>
                    <th style={{padding: 0}}>
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                    </th>
                </tr>
>>>>>>> ec7fea9a3405a91f2d32c719ef41f0dbe4031e8d
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
