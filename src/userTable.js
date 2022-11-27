/* eslint-disable no-implied-eval */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
//import user from '../../backend/models/user';

const userTable = () => {
  const [users, setUsers] = useState([]);
  const [checked, setChecked] = useState([]);
  const [pageSize, setPageSize] = useState(7);

  const handleDelete = (e) => {
    for (const id of checked) {
      const configuration = {
        method: 'delete',
        url: `https://user-dashboard-api.onrender.com/${id}`,
        data: {},
      };
      axios(configuration)
        .then(() => {
          console.log('user deleted');
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
    setTimeout((window.location.href = '/'), 1000);
  };
  const handleBlock = () => {
    for (const id of checked) {
      const configuration = {
        method: 'put',
        url: `https://user-dashboard-api.onrender.com/block/${id}`,
        data: {},
      };
      axios(configuration)
        .then(() => {
          console.log('user blocked');
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
    for (const user of users) {
      if (user._id === localStorage.getItem('id')) {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('email');
        window.location.href = '/login';
      } else {
        setTimeout((window.location.href = '/'), 1000);
      }
    }
  };
  const handleUnblock = () => {
    for (const id of checked) {
      const configuration = {
        method: 'put',
        url: `https://user-dashboard-api.onrender.com/unblock/${id}`,
        data: {},
      };
      axios(configuration)
        .then(() => {
          console.log('user unblocked');
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
    setTimeout((window.location.href = '/'), 2000);
  };

  const columns = [
    { field: '_id', headerName: 'User ID', width: 210 },
    { field: 'name', headerName: 'Name', width: 110 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'lastLogin', headerName: 'Last Login', width: 200 },
    { field: 'regDate', headerName: 'Registration Date', width: 200 },
    { field: 'status', headerName: 'Status', width: 70 },
  ];

  useEffect(() => {
    fetch('https://user-dashboard-api.onrender.com/users/')
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);
  return (
    <>
      <Button
        className="mt-3"
        onClick={() => handleUnblock()}
        variant="primary"
      >
        Unblock
      </Button>{' '}
      <Button
        className="mt-3"
        onClick={() => handleBlock()}
        variant="secondary"
      >
        Block
      </Button>{' '}
      <Button className="mt-3" onClick={() => handleDelete()} variant="danger">
        Delete
      </Button>{' '}
      <div className="mt-3" style={{ height: 475, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          checkboxSelection
          pageSize={pageSize}
          loading={!users.length}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          pagination
          rowsPerPageOptions={[7, 10, 20]}
          onSelectionModelChange={(params) => setChecked(params)}
        />
      </div>
    </>
  );
};

export default userTable;
