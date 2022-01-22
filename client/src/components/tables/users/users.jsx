import React from 'react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { confirmAlert } from "react-confirm-alert";

import TableTemplate from '../template/template';

import DeleteBtn from '../../../images/delete_button.svg';

import { deleteUserStart  } from '../../../redux/modal/modal.actions';

const ManageUsersTable = ({ users }) => {
    const dispatch = useDispatch();
    
    const memberId = useSelector(state => state.memberState.memberId);
    
    const handleDelete = (userId) => {
      const responseAlert = (message, type) => toast[type](message, {
        id: 'delete-user',
      });

      confirmAlert({
        title: "Confirm Delete",
        message: `Are you sure to delete ${userId.toUpperCase()} ?`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              dispatch(deleteUserStart({ memberId, userId, responseAlert }));
        
            },
          },
          {
            label: "No",
            onClick: () => alert.show("Operation Cancelled"),
          },
        ],
      });

    };

    const data = React.useMemo(() => users, [users]);
    const columns = React.useMemo(
      () => [
        {
          Header: 'User ID',
          id: 'addUser',
          accessor: d => `${d.id}`,
          Cell: ({ value }) => (
              <span style={{ color:'darkslategrey',  fontWeight: '500' }}>{value}</span> 
            ),
        },
        {
          Header:'First Name',
          id: 'manageFname',
          accessor: d => `${d.fname}`,
          Cell: ({ value }) => (
              <span style={{ color:'darkslategrey',  fontWeight: '500' }}>{value}</span> 
            ),
        },

        {
          Header: 'Last Name',
          accessor: d => `${d.lname}`,
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
                alt={`remove ${value}`} 
                onClick={(e) => handleDelete(value)} 
                className='remove-email-btn'
                title={`Remove ${value}`}
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

export default ManageUsersTable;
