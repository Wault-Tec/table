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
import {Data} from 'src/type';

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


    function randomInteger(min: number, max: number) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
      }


    // const newRows: any = [
    //     {
    //         id: '24226ac6-da7e-4cb8-8385-6e48ea10c7cb',
    //         name: 'item28',
    //         status: 'active', // {‘active’, ‘archive’}
    //         sum: randomInteger(1,500),
    //         qty: randomInteger(1,500),
    //         volume: randomInteger(1,500), 
    //         delivery_date: '2022-12-30',
    //         currency: 'RUB',
    //     },
    //     {
    //         id: 'a13ebd32-541a-4075-b7e5-3f2f222ad76e',
    //         name: 'item21',
    //         status: 'archive', // {‘active’, ‘archive’}
    //         sum: randomInteger(1,500),
    //         qty: randomInteger(1,500),
    //         volume: randomInteger(1,500), 
    //         delivery_date: '2023-02-01',
    //         currency: 'USD',
    //     },
    //     {
    //         id: 'c477f774-7098-4197-b082-4e293b98974c',
    //         name: 'item102',
    //         status: 'active', // {‘active’, ‘archive’}
    //         sum: randomInteger(1,500),
    //         qty: randomInteger(1,500),
    //         volume: randomInteger(1,500), 
    //         delivery_date: '2023-02-26',
    //         currency: 'RUB',
    //     },
    //     {
    //         id: '74096522-9038-4b30-90c2-4ddcf698a13e6',
    //         name: 'item13',
    //         status: 'active', // {‘active’, ‘archive’}
    //         sum: randomInteger(1,500),
    //         qty: randomInteger(1,500),
    //         volume: randomInteger(1,500), 
    //         delivery_date: '2023-03-11',
    //         currency: 'USD',
    //     },
    //     {
    //         id: 'b6713790-1317-47b0-a180-fc815c00f8e0',
    //         name: 'item65',
    //         status: 'archive', // {‘active’, ‘archive’}
    //         sum: randomInteger(1,500),
    //         qty: randomInteger(1,500),
    //         volume: randomInteger(1,500), 
    //         delivery_date: '2023-01-13',
    //         currency: 'RUB',
    //     },
    //     {
    //         id: '98370d2a-7b03-45fd-93e7-651fff0122a8',
    //         name: 'item23',
    //         status: 'archive', // {‘active’, ‘archive’}
    //         sum: randomInteger(1,500),
    //         qty: randomInteger(1,500),
    //         volume: randomInteger(1,500), 
    //         delivery_date: '2023-04-17',
    //         currency: 'USD',
    //     }
    // ]


    const handleApply = () => {
        // const newRows = rows.filter((item) => !selected.includes(item.id))
        // updateRequest(newRows)
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