import React from 'react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { confirmAlert } from "react-confirm-alert";

import TableTemplate from '../template/template';

import DeleteBtn from '../../../images/delete_button.svg';

import { 
    deleteEmailFromDistroStart  
  } from '../../../redux/modal/modal.actions';

const EmailDistroTable = ({ emails }) => {
    const dispatch = useDispatch();
    
    const memberId = useSelector(state => state.memberState.memberId);
    
    const handleDelete = (email) => {
      const responseAlert = (message, type) => toast[type](message, {
        id: 'delete-email',
      });

      confirmAlert({
        title: "Confirm Delete",
        message: `Are you sure to delete ${email.toUpperCase()} ?`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              dispatch(deleteEmailFromDistroStart({ memberId, email, responseAlert}));
            },
          },
          {
            label: "No",
            onClick: () => alert.show("Operation Cancelled"),
          },
        ],
      });
    };

    const data = React.useMemo(() => emails, [emails]);
    const columns = React.useMemo(
      () => [
        {
          Header: 'Emails',
          id: 'addEmail',
          accessor: d => `${d.email}`,
          Cell: ({ value }) => (
              <span style={{ color:'darkslategrey',  fontWeight: '500' }}>{value}</span> 
            ),
        },
        {
            Header: 'Delete',
            accessor: d => `${d.email}`,
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

export default EmailDistroTable;
