import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(8, 2),
    alignItems: 'center',
  },
  noPadding: {
    padding: '0px 16px !important',
  },
  errorPane: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
}));
