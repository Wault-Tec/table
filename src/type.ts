export interface Data {
    id: string,
    name: string,
    status: string, // {‘active’, ‘archive’}
    sum: number,
    qty: number,
    volume: number, 
    delivery_date: string,
    currency: string,
    total: number
}

export interface StoreData {
    [key: string]: Data[]
}

export interface SearchData {
    column: keyof Data | null,
    text: string,
}

export interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export interface EnhancedTableToolbarProps {
    numSelected: number,
    clearSelected: Function
}

export type AlertProps = {
    selected: string[],
    rows: Data[]
  }