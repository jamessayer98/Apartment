import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Container,
  IconButton,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Typography,
} from '@material-ui/core';
import { useConfirm } from 'material-ui-confirm';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useSnackbar } from 'notistack';

import useStyles from './style';
import UserTableHeader from '../../components/UserTableHeader';
import LoadingFallback from '../../components/LoadingFallback';
import { getUsers, deleteUser } from '../../store/reducers/user';
import { GET_USERS_REQUEST } from '../../store/types';
import { requestFail, requestPending } from '../../utils/request';
import { capitalize } from '../../utils/naming';

function UserTable({ users }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const snackbar = useSnackbar();

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (users.length > 0 && users.length % rowsPerPage === 0 && users.length / rowsPerPage <= page) {
      setPage(page - 1);
    }
  }, [users]);

  const handleEditUser = (id) => {
    history.push(`/user/${id}`);
  };

  const handleDeleteUser = (id) => {
    confirm({
      description: 'Are you going to delete this user?',
    }).then(() => {
      dispatch(deleteUser({
        id,
        success: () => {
          snackbar.enqueueSnackbar('Delete user successfully', { variant: 'success' });
        },
      }));
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return users.length > 0 ? (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>User Type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user, index) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.config.role}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditUser(user.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  ) : (
    <Typography variant="h6">
      No available users
    </Typography>
  );
}

function UserList() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  const userStatus = useSelector(state => state.user.status);
  const userError = useSelector(state => state.user.error);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleAddUser = () => {
    history.push('/user');
  };

  const getErrorText = (error) => {
    if (error.status === 401) return 'Error 401 (Unauthorized)';
    return error ?
      Object.keys(error.data).map((key) => (
        <div key={key}>{`${capitalize(key)}: ${error.data[key]}`}</div>
      )) : '';
  };

  const renderContent = () => {
    if (userStatus === requestPending(GET_USERS_REQUEST)) return <LoadingFallback />;
    if (userStatus === requestFail(GET_USERS_REQUEST)) {
      return (
        <Alert className={classes.errorPane} severity="error">
          <AlertTitle>Error</AlertTitle>
          {getErrorText(userError)}
        </Alert>        
      )
    }

    return <UserTable users={users} />;
  };

  return (
    <Container maxWidth="lg">
      <TableContainer className={classes.root} component={Paper}>
        <UserTableHeader onAddUser={handleAddUser} />
        {renderContent()}
      </TableContainer>
    </Container>
  )
}

export default UserList;
