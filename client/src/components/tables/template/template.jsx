import React, { useMemo } from 'react'

import { 
    useTable, 
    useFilters,
    useGlobalFilter 
} from 'react-table';

import GlobalFilter from './global-filter';

import './template.styles.css';

const TableTemplate = ({ columns, data, customClass }) => {

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


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
      } = useTable(
        {
          columns,
          data,
          defaultColumn,
        },
        useFilters, 
        useGlobalFilter 

      )

    return (
            <table {...getTableProps()} className={`custom-table ${customClass}`}>
            <thead>
                <tr>
                    <th style={{padding: 0}}>
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                    </th>
                </tr>

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
