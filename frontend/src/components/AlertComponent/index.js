import React from 'react'
import { changeAlert } from '../../store/actions/alert.action'
import { Modal, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { MdError, MdCheckCircle } from 'react-icons/md'

export default function AlertComponent() {
    const dispatch = useDispatch();
    const alert = useSelector(state => state.alertReducer)

    if (alert.open) {
        setTimeout(() => dispatch(changeAlert({ open: false })), alert.time);
    }

    return (
        <Modal
            open={alert.open}
            onClose={() => dispatch(changeAlert({ open: false }))}
            className="d-flex justify-content-center align-items-center h-100"
        >
            <div className='bg-white rounded-lg d-flex align-items-center outline-none p-4'>
                {(alert.class === 'success') &&
                    <MdCheckCircle style={{ fontSize: "2.5rem" }} className='me-3 text-success' />
                }
                {(alert.class === 'error') &&
                    <MdError style={{ fontSize: "2.5rem" }} className='me-3 text-danger' />
                }
                <Typography variant="subtitle1">{alert.msg}</Typography>
            </div>
        </Modal>
    )
}
