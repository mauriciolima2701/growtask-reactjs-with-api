import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Logo_ from '../../../../shared/components/logo/Logo_';
import Divider from '@mui/material/Divider';
import CancelIcon from '@mui/icons-material/Cancel';
import { StyleModalArchive } from '../archived/styleModalArchive';





interface PropsModal {
    openModal: boolean;
    closeModal: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined
    clickCancel: React.MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode | JSX.Element;
}


const ModalFilter: React.FC<PropsModal> = ({ openModal, clickCancel, closeModal, children }) => {


    return (
        <>
            <Modal
                open={openModal}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <StyleModalArchive>
                    <Box>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ display: 'flex', justifyContent: 'space-between' }}
                        >
                            <Logo_ />

                            <Button onClick={clickCancel}>  <CancelIcon sx={{ color: 'orangered', fontSize: 35 }} /> </Button>

                        </Typography>

                        <div className='textTitleEdit'> - TAREFAS ENCONTRADAS - </div>

                        <Divider sx={{ mb: 3, mt: 2, border: 1, color: '#13DFDC', width: '100%' }} />

                        <Typography id="modal-modal-description" sx={{ mt: 2, overflowY: 'scroll' }} className='cardArchived'>

                            {children}

                        </Typography>
                    </Box>
                </StyleModalArchive>
            </Modal>
        </>
    );
}

export default ModalFilter;