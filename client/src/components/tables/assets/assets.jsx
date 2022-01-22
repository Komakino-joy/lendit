import React from 'react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { confirmAlert } from "react-confirm-alert";

import TableTemplate from '../template/template';

import DeleteBtn from '../../../images/delete_button.svg';

import {
  removeSelectedAssetStart
} from '../../../redux/asset/asset.actions';

const ManageAssetsTable = ({ assets }) => {
    const dispatch = useDispatch();
    
    const memberId = useSelector(state => state.memberState.memberId);
    
    const handleDelete = (assetId) => {
      const responseAlert = (message, type) => toast[type](message, {
        id: 'delete-asset',
      });

      confirmAlert({
        title: "Confirm Delete",
        message: `Are you sure to delete ${assetId.toUpperCase()} ?`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              dispatch(removeSelectedAssetStart({assetId, memberId, responseAlert }));
            },
          },
          {
            label: "No",
            onClick: () => alert.show("Operation Cancelled"),
          },
        ],
      });
    };

    const data = React.useMemo(() => assets, [assets]);
    const columns = React.useMemo(
      () => [
        {
          Header: 'Asset ID',
          id: 'addAsset',
          accessor: d => `${d.id}`,
          Cell: ({ value }) => (
              <span style={{ color:'darkslategrey',  fontWeight: '500' }}>{value}</span> 
            ),
        },
        {
          Header: 'Asset Tag',
          accessor: d => `${d.name}`,
          Cell: ({ value }) => (
              <span style={{ color:'darkslategrey',  fontWeight: '500' }}>{value}</span> 
            ),
        },

        {
          Header: 'Serial',
          accessor: d => `${d.serial}`,
          Cell: ({ value }) => (
              <span style={{ color:'darkslategrey',  fontWeight: '500' }}>{value}</span> 
            ),
        },
        {
          Header: 'Model',
          accessor: d => `${d.model}`,
          Cell: ({ value }) => (
              <span style={{ color:'darkslategrey',  fontWeight: '500' }}>{value}</span> 
            ),
        },
        {
          Header: 'Status',
          accessor: d => `${d.status}`,
          Cell: ({ value }) => (
              <span style={{ color:'darkslategrey',  fontWeight: '500' }}>{value}</span> 
            ),
        },
        {
            Header: 'Delete',
            accessor: d => `${d.id}`,
            Cell: ({ value }) => (
              <img 
                src={DeleteBtn} 
                alt={`Delete ${value}`} 
                onClick={(e) => handleDelete(value)} 
                className='remove-email-btn'
                title={`Delete ${value}`}
              />
            )
        },

      ],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
      
    )
    
    return (
        <TableTemplate data={data} columns={columns} />
      )
    }

export default ManageAssetsTable;
