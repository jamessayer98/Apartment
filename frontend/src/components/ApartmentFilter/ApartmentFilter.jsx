import React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  Slider,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import useStyles from './style';

function LabelComponent({ children, open, value }) {
  const classes = useStyles();

  return (
    <Tooltip
      classes={{
        tooltip: classes.label,
      }}
      title={value}
      open={open}
      placement="top"
    >
      {children}
    </Tooltip>
  );
}

function ApartmentFilter({ filterParams, onChangeFilterParams }) {
  const classes = useStyles();
  const priceMarks = [
    { label: '$10', value: 0 },
    { label: '$10,000', value: 10000 },
  ];
  const sizeMarks = [
    { label: '100m²', value: 100 },
    { label: '5,000m²', value: 5000 },
  ];
  const roomsMarks = [
    { label: '1 Room', value: 1 },
    { label: '100 Room(s)', value: 100 },
  ];

  return (
    <Toolbar className={classes.root} disableGutters>
      <ExpansionPanel className={classes.expandPanel}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="filter-panel"
        >
          <Typography variant="h6">
            Filter by
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={4}>
            <Grid item sm={3}>
              <Typography variant="body1">
                Price: 
              </Typography>
            </Grid>
            <Grid item sm={9}>
              <Slider
                value={filterParams.price}
                valueLabelDisplay="auto"
                min={10}
                max={10000}
                marks={priceMarks}
                ValueLabelComponent={LabelComponent}
                valueLabelFormat={value => `$${value}`}
                onChange={(event, value) => onChangeFilterParams('price', value)}
              />
            </Grid>
            <Grid item sm={3}>
              <Typography variant="body1">
                Size: 
              </Typography>
            </Grid>
            <Grid item sm={9}>
              <Slider
                value={filterParams.size}
                valueLabelDisplay="auto"
                min={100}
                max={5000}
                marks={sizeMarks}
                ValueLabelComponent={LabelComponent}
                valueLabelFormat={value => `${value}m²`}
                onChange={(event, value) => onChangeFilterParams('size', value)}
              />
            </Grid>
            <Grid item sm={3}>
              <Typography variant="body1">
                Number of rooms: 
              </Typography>
            </Grid>
            <Grid item sm={9}>
              <Slider
                value={filterParams.rooms}
                valueLabelDisplay="auto"
                min={1}
                max={100}
                marks={roomsMarks}
                ValueLabelComponent={LabelComponent}
                valueLabelFormat={value => `${value} Room(s)`}
                onChange={(event, value) => onChangeFilterParams('rooms', value)}
              />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Toolbar>
  );
}

export default ApartmentFilter;
