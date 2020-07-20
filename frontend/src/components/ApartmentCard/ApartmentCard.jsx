import React from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Typography,
} from '@material-ui/core';
import { useConfirm } from 'material-ui-confirm';
import LocationIcon from '@material-ui/icons/LocationOn';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import UpdateIcon from '@material-ui/icons/Create';
import { useSnackbar } from 'notistack';

import useStyles from './style';
import { deleteApartment } from '../../store/reducers/apartment';

function ApartmentCard({ apartment, maxWidth, actionable, onClickApartment }) {
  const classes = useStyles();
  const snackbar = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  const handleEditApartment = () => {
    history.push(`/apartment/${apartment.id}`);
  };

  const handleDeleteApartment = () => {
    confirm({
      description: 'Are you going to delete this apartment?',
    }).then(() => {
      dispatch(deleteApartment({
        id: apartment.id,
        success: () => {
          snackbar.enqueueSnackbar('Delete apartment successfully', { variant: 'success' });
        },
      }));
    });
  };

  const handleClick = () => {
    if (onClickApartment) {
      onClickApartment(apartment.id);
    }
  }

  const renderAddress = (address) => {
    const splitedAddress = address.split(',');
    return splitedAddress.slice(splitedAddress.length - 2).join(', ');
  };

  return (
    <Card
      className={classes.root}
      style={{
        maxWidth: maxWidth ? `${maxWidth}px` : 'unset',
      }}
      onClick={handleClick}
    >
      <CardHeader
        classes={{
          title: classes.cardTitle,
        }}
        avatar={
          <Avatar className={classes.avatar}>
            {apartment.realtor.firstName[0].toUpperCase()}
          </Avatar>
        }
        action={
          actionable && (
            <Box className={classes.actions}>
              <IconButton color="primary" onClick={handleEditApartment}>
                <UpdateIcon fontSize="small" />
              </IconButton>
              <IconButton color="secondary" onClick={handleDeleteApartment}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          )
        }
        title={`${apartment.realtor.firstName} ${apartment.realtor.lastName}`}
        subheader={new Date(apartment.addedDate).toString().slice(0, 15)}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {apartment.name} 
          <Chip
            size="small"
            label={apartment.status}
            color={apartment.status === 'AVAILABLE' ? 'primary' : 'secondary'}
            classes={{
              root: classes.status,
              colorPrimary: classes.availableStatus,
              colorSecondary: classes.rentedStatus,
            }}
          />
        </Typography>
        <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
          {apartment.description}
        </Typography>
      </CardContent>
      <hr className={classes.divider} />
      <CardActions classes={{ root: classes.actionsPadding }}>
        <Typography classes={{ root: classes.fs13 }}>
          ${apartment.price}/Month
        </Typography>
        <Typography classes={{ root: classes.fs13 }}>
          {apartment.rooms} Room(s) / {apartment.size} m<sup>2</sup>
        </Typography>
        <div className={classes.grow} />
        <div className={clsx(classes.flex, classes.justify)}>
          <LocationIcon className={classes.mr4} fontSize="small" />
          <Typography classes={{ root: classes.fs13 }}>
            {renderAddress(apartment.address)}
          </Typography>
        </div>
      </CardActions>
    </Card>
  );
}

export default ApartmentCard;
