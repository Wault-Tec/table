import { 
    useEffect, 
    useState 
} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

import { AlertProps } from 'src/type';
import { deleteRequest } from 'src/api/firebaseApi';
import { useAppDispatch } from 'src/hooks';
import {fetchData} from 'src/store/slices/dataSlice';

export const AlertDialog = ({ selected, rows, data, clearSelected }: AlertProps) => {
    const [open, setOpen] = useState(false);
    const [itemsNames, setItemNames] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const names: string[] = [];
        rows.map((item) => {
            if (selected.includes(item.id)) {
                names.push(item.name)
            }
        })
        setItemNames(names)
    }, [selected, rows])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleApply = () => {
        deleteRequest(selected, data)
            .then(() => dispatch(fetchData()))
            .then(() =>  setOpen(false))
            .then(() => clearSelected())
    }

    return (
        <div>
            <Button variant="outlined" startIcon={<DeleteIcon />} disabled={!selected.length} onClick={handleClickOpen}>
                Annul selected
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Alert"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to annul the {itemsNames.length > 1 ? 'items' : 'item'}:
                        {itemsNames.map((name, index) =>
                            <Typography 
                                sx={{ fontWeight: 'Bold' }} 
                                component="span" 
                                key={name}
                            >
                                 {name}{itemsNames.length !== index + 1 ? ', ' : ''}
                            </Typography>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleApply} autoFocus>
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}