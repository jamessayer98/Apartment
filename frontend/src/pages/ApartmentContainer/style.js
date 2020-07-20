import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  noPadding: {
    padding: '0px 16px !important',
  },
  pagination: {
    display: 'flex',
    margin: theme.spacing(3, 0),
    justifyContent: 'center',
  },
}));
