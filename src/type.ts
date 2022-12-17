export interface ServerData {
    id: string,
    name: string,
    status: 'active' | 'archive',
    sum: number,
    qty: number,
    volume: number, 
    delivery_date: string,
    currency: string,
}

export interface Data extends ServerData {
    total: number
}

export interface StoreData {
    [key: string]: Data[]
}

export interface SearchData {
    column: keyof Data | null | 'all',
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
    rows: Data[],
    data: StoreData,
    clearSelected: Function
  }