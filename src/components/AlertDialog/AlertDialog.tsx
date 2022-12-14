import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { AlertProps } from 'src/type';
import Typography from '@mui/material/Typography';
import { updateRequest } from 'src/api/firebaseApi';

export const AlertDialog = ({ selected, rows }: AlertProps) => {
    const [open, setOpen] = useState(false);
    const [itemsNames, setItemNames] = useState<string[]>([])

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
        const newRows = rows.filter((item) => !selected.includes(item.id))
        console.log(newRows)
        updateRequest(newRows)
    }

    return (
        <div>
            <Button variant="outlined" startIcon={<DeleteIcon />} disabled={!!!selected.length} onClick={handleClickOpen}>
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