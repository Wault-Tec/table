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
import { deleteRequest, setRequest } from 'src/api/firebaseApi';
import { useAppDispatch } from 'src/hooks';
import {fetchData} from 'src/store/slices/dataSlice';
import {Data} from 'src/type';

export const AlertDialog = ({ selected, rows, data }: AlertProps) => {
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


    // function randomInteger(min: number, max: number) {
    //     // случайное число от min до (max+1)
    //     let rand = min + Math.random() * (max + 1 - min);
    //     return Math.floor(rand);
    //   }


    // const newRows: Data[] = [
    //     {
    //         id: 'f1492e01-7789-423b-b775-07c6f86b5a5e',
    //         name: 'item24',
    //         status: 'active', // {‘active’, ‘archive’}
    //         sum: randomInteger(1,500),
    //         qty: randomInteger(1,500),
    //         volume: randomInteger(1,500), 
    //         delivery_date: '2022-12-31',
    //         currency: 'RUB',
    //         total: 1
    //     },
    //     {
    //         id: '165841c2-bf76-4a1a-a8d6-e886e870d7f7',
    //         name: 'item22',
    //         status: 'archive', // {‘active’, ‘archive’}
    //         sum: randomInteger(1,500),
    //         qty: randomInteger(1,500),
    //         volume: randomInteger(1,500), 
    //         delivery_date: '2023-02-11',
    //         currency: 'USD',
    //         total: 1
    //     },
    //     {
    //         id: '8da9fc14-d5ce-4ef9-895b-4b0fb7d93e70',
    //         name: 'item142',
    //         status: 'active', // {‘active’, ‘archive’}
    //         sum: randomInteger(1,500),
    //         qty: randomInteger(1,500),
    //         volume: randomInteger(1,500), 
    //         delivery_date: '2023-02-22',
    //         currency: 'RUB',
    //         total: 1
    //     },
    //     {
    //         id: '6e39fd2e-7c3c-4447-a55c-73c82207d934',
    //         name: 'item110',
    //         status: 'active', // {‘active’, ‘archive’}
    //         sum: randomInteger(1,500),
    //         qty: randomInteger(1,500),
    //         volume: randomInteger(1,500), 
    //         delivery_date: '2023-03-15',
    //         currency: 'USD',
    //         total: 1
    //     },
    //     {
    //         id: '4bc68795-bee0-4b3b-adc0-c18c2c251f73',
    //         name: 'item39',
    //         status: 'archive', // {‘active’, ‘archive’}
    //         sum: randomInteger(1,500),
    //         qty: randomInteger(1,500),
    //         volume: randomInteger(1,500), 
    //         delivery_date: '2023-01-10',
    //         currency: 'RUB',
    //         total: 1
    //     },
    //     {
    //         id: 'ef961509-be6d-4b2a-87e6-e10cf0f63ff1',
    //         name: 'item13',
    //         status: 'active', // {‘active’, ‘archive’}
    //         sum: randomInteger(1,500),
    //         qty: randomInteger(1,500),
    //         volume: randomInteger(1,500), 
    //         delivery_date: '2023-04-25',
    //         currency: 'USD',
    //         total: 1
    //     }
    // ]



    const handleApply = () => {
        deleteRequest(selected)
            .then(() => {
                dispatch(fetchData())
            })

        setOpen(false);
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