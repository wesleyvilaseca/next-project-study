import React from 'react'
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material'

export default function ConfirmComponent(props) {
    const { open, title, onClose, onConfirm } = props;

    return (
        <Dialog
            open={open}
            onClose={() => onClose()}
        >
            <DialogTitle disableTypography><h6>{title || 'Tem certeza que deseja excluir ?'}</h6></DialogTitle>
            <Button onClick={() => onClose()}>
                Não
            </Button>
            <Button onClick={() => {
                onClose();
                onConfirm();
            }}
                variant="contained"
                color="primary"
            >
                Sim
            </Button>

        </Dialog>
    )
}
