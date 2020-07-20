import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export default makeStyles(theme => ({
  root: {
    width: '100%',
    cursor: 'pointer',
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardTitle: {
    textTransform: 'capitalize',
  },
  divider: {
    margin: theme.spacing(0, 2),
  },
  actionsPadding: {
    padding: theme.spacing(1, 2),
  },
  description: {
    minHeight: '60px',
  },
  flex: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  justify: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    marginTop: theme.spacing(1),
  },
  status: {
    marginLeft: theme.spacing(2),
    fontSize: '12px',
  },
  availableStatus: {
    backgroundColor: '#6EB81D',
  },
  rentedStatus: {
    backgroundColor: '#FF507C',
  },
  fs13: {
    fontSize: '13px',
  },
  mr4: {
    marginRight: '4px',
  },
  mt5: {
    marginTop: '5px',
  },
}));
