import { makeStyles } from '@material-ui/styles';

export default makeStyles(theme => ({
  root: {
    boxShadow: 'none',
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: '8px',
  },
  logo: {
    fontSize: '20px',
    color: 'white',
    textDecoration: 'none',
  },
  link: {
    marginRight: '16px',
    color: '#FFFFFF',
    textDecoration: 'none',
  },
  activeLink: {
    color: 'orange',
  },
}));
