import React, {useState} from "react";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export const ErrorAlert = ({error}) => {
    const [openAlert, setOpenAlert] = useState(true);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false)
    }
    return (
        <Snackbar
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'top'
            }}
            open={openAlert}
            autoHideDuration={2000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity='error'
            >
                {error}
            </Alert>
        </Snackbar>
    )
}