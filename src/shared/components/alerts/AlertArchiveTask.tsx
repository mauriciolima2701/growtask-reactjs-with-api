import { forwardRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import CancelIcon from '@mui/icons-material/Cancel';
import Divider from '@mui/material/Divider';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


interface PropsAlertRemove {
    openRemove: boolean;
    closeAlertArchive: () => void;
    clickAlertArchive: () => void;
    status?: string;
}


const AlertArchiveTask: React.FC<PropsAlertRemove> = ({ openRemove, closeAlertArchive, status, clickAlertArchive }) => {


    return (
        <>
            <Dialog
                open={openRemove}
                TransitionComponent={Transition}
                keepMounted
                onClose={closeAlertArchive}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Deseja realmente {status} esta tarefa?</DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
                </DialogContent>

                <Divider sx={{ mb: 1, mt: 2, border: 1, color: '#13DFDC', width: '80%', margin: '0 auto' }} />

                <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button onClick={clickAlertArchive}>
                        <MoveToInboxIcon sx={{ color: 'green', fontSize: '35px' }} />
                    </Button>

                    <Button onClick={closeAlertArchive}>
                        <CancelIcon sx={{ color: 'orange', fontSize: '35px' }} />
                    </Button>

                </DialogActions>

            </Dialog>
        </>
    );
}

export default AlertArchiveTask