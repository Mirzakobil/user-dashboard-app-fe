/* eslint-disable no-implied-eval */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
//import user from '../../backend/models/user';

const userTable = () => {
  const apiLink1 = 'https://user-dashboard-api.onrender.com';
  const apiLink2 = 'http://localhost:4000';
  const [users, setUsers] = useState([]);
  const [checked, setChecked] = useState([]);
  const [pageSize, setPageSize] = useState(7);

  const handleDelete = (e) => {
    for (const id of checked) {
      const configuration = {
        method: 'delete',
        url: `${apiLink1}/${id}`,
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
    window.location.href = '/';
  };
  const handleBlock = () => {
    checked.forEach((e) => {
      const configuration = {
        method: 'put',
        url: `${apiLink1}/block/${e}`,
        data: {},
      };
      axios(configuration)
        .then(() => {
          console.log('user blocked');
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    });
    checked.forEach((e) => {
      if (e === localStorage.getItem('id')) {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('email');
        window.location.href = '/login';
      } else {
        window.location.href = '/';
      }
    });
  };
  const handleUnblock = () => {
    for (const id of checked) {
      const configuration = {
        method: 'put',
        url: `${apiLink1}/unblock/${id}`,
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
    window.location.href = '/';
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
    fetch(`${apiLink1}/users/`)
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
