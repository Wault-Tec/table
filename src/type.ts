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

export interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
}

export interface SearchData {
    column: string,
    text: string,
}