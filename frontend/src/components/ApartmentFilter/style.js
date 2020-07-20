import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  expandPanel: {
    width: '100%',
    background: 'transparent',
    boxShadow: 'none',
    borderRadius: 'unset',
  },
  label: {
    background: 'transparent',
    borderRadius: 'unset',
    color: '#000',
    fontSize: '14px',
  },
}));
