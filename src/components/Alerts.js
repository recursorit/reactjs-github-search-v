import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Alerts = ({errorMessage, timeout, severity, onClose}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let timer;

    timer = setTimeout(() => {
      setOpen(false);
      onClose('');
    }, timeout || 4000);

    return () => {
      clearTimeout(timer);
    }
  }, [setOpen, onClose, timeout]);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                onClose('');
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {errorMessage}
        </Alert>
      </Collapse>
    </div>
  );
}

export default Alerts;