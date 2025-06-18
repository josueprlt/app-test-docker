import {IconCrossStroke} from "../icons";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import 'dayjs/locale/fr';

const modalStyle = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    width: '80%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    outline: 'none',
    maxHeight: '90vh',
    overflowY: 'auto'
};

export const TemplateModal = ({ children, open, handleClose, title }) => {

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className="relative" sx={modalStyle}>
                <div onClick={handleClose} className="cursor-pointer">
                    <IconCrossStroke className="absolute top-4 right-4 w-8 h-8"/>
                </div>
                <h2 className='text-xl text-center font-bold mb-6'>{title}</h2>

                <Stack direction="column" spacing={1} sx={{alignItems: 'center', marginBottom: '25px'}}>
                    {children}
                </Stack>
            </Box>
        </Modal>
    );
};