import { firestore } from "src/firebase";
import { 
    collection, 
    doc, 
    getDocs, 
    deleteDoc, 
    setDoc 
} from "firebase/firestore";

import { 
    Data, 
    StoreData, 
    ServerData 
} from "src/type";

export const endpoint_1: string = 'documents1';
export const endpoint_2: string = 'documents2';
const endpoint_1_dataKey: string = 'data_1';
const endpoint_2_dataKey: string = 'data_2';

export const getRequest = async (endpoint: string) => {
    try {
        let data: Data[] = [];
        const querySnapshot = await getDocs(collection(firestore, endpoint));
        querySnapshot.forEach((doc) => {
            const item = doc.data() as Data
            data = [...data, item]
        });
        return data
    } catch (e: any) {
        throw new Error(e)
    }
}

export const deleteRequest = async (id: string[], data: StoreData) => {
    let endpoint: string
    try {
        id.forEach((id) => {
            for(let key in data) {
                data[key].forEach((item) => {
                    if (item.id === id) {
                        if(key === endpoint_1_dataKey) {
                            endpoint = endpoint_1
                        } else if(key === endpoint_2_dataKey) {
                            endpoint = endpoint_2
                        }
                    }
                })
            }
            return (async () => {
                await deleteDoc(doc(firestore, endpoint, id)).then(()=> console.log(`item with id ${id} deleted from ${endpoint}`))
            })()
        })
    } catch (e: any) {
        throw new Error(e)
    }
}

//TODO:  This function need for testing the app
export const setRequest = async () => {
    const randomInteger = (min: number, max: number) => {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
      }
//TODO:  Testing data
    const data_1: ServerData[] = [
        {
            id: 'f1492e01-7789-423b-b775-07c6f86b5a5e',
            name: 'item24',
            status: 'active', 
            sum: randomInteger(1,500),
            qty: randomInteger(1,500),
            volume: randomInteger(1,500), 
            delivery_date: '2022-12-31',
            currency: 'RUB'
        },
        {
            id: '165841c2-bf76-4a1a-a8d6-e886e870d7f7',
            name: 'item22',
            status: 'archive', 
            sum: randomInteger(1,500),
            qty: randomInteger(1,500),
            volume: randomInteger(1,500), 
            delivery_date: '2023-02-11',
            currency: 'USD'
        },
        {
            id: '8da9fc14-d5ce-4ef9-895b-4b0fb7d93e70',
            name: 'item142',
            status: 'active', 
            sum: randomInteger(1,500),
            qty: randomInteger(1,500),
            volume: randomInteger(1,500), 
            delivery_date: '2023-02-22',
            currency: 'RUB'
        },
        {
            id: '6e39fd2e-7c3c-4447-a55c-73c82207d934',
            name: 'item110',
            status: 'active', 
            sum: randomInteger(1,500),
            qty: randomInteger(1,500),
            volume: randomInteger(1,500), 
            delivery_date: '2023-03-15',
            currency: 'USD'
        },
        {
            id: '4bc68795-bee0-4b3b-adc0-c18c2c251f73',
            name: 'item39',
            status: 'archive', 
            sum: randomInteger(1,500),
            qty: randomInteger(1,500),
            volume: randomInteger(1,500), 
            delivery_date: '2023-01-10',
            currency: 'RUB'
        },
        {
            id: 'ef961509-be6d-4b2a-87e6-e10cf0f63ff1',
            name: 'item13',
            status: 'active', 
            sum: randomInteger(1,500),
            qty: randomInteger(1,500),
            volume: randomInteger(1,500), 
            delivery_date: '2023-04-25',
            currency: 'USD'
        },
        {
            id: '17cb3184-3a96-4eea-a2d6-123c9ca5f9d5',
            name: 'item131',
            status: 'active', 
            sum: randomInteger(1,500),
            qty: randomInteger(1,500),
            volume: randomInteger(1,500), 
            delivery_date: '2023-06-21',
            currency: 'USD'
        }
    ]
    const data_2: ServerData[] = [
        {
            id: '98370d2a-7b03-45fd-93e7-651fff0122a8',
            name: 'item23',
            status: 'archive', 
            sum: randomInteger(1,500),
            qty: randomInteger(1,500),
            volume: randomInteger(1,500), 
            delivery_date: '2023-04-17',
            currency: 'USD'
        },
        {
            id: 'a13ebd32-541a-4075-b7e5-3f2f222ad76e',
            name: 'item21',
            status: 'archive', 
            sum: randomInteger(1,500),
            qty: randomInteger(1,500),
            volume: randomInteger(1,500), 
            delivery_date: '2023-02-01',
            currency: 'USD'
        },
        {
            id: 'b6713790-1317-47b0-a180-fc815c00f8e0',
            name: 'item65',
            status: 'active', 
            sum: randomInteger(1,500),
            qty: randomInteger(1,500),
            volume: randomInteger(1,500), 
            delivery_date: '2023-01-13',
            currency: 'RUB'
        },
        {
            id: 'c477f774-7098-4197-b082-4e293b98974c',
            name: 'item102',
            status: 'active', 
            sum: randomInteger(1,500),
            qty: randomInteger(1,500),
            volume: randomInteger(1,500), 
            delivery_date: '2023-02-26',
            currency: 'RUB'
        },
        {
            id: 'b46e50c2-fa42-4929-b42b-d3bb68cd5bf3',
            name: 'item204',
            status: 'archive', 
            sum: randomInteger(1,500),
            qty: randomInteger(1,500),
            volume: randomInteger(1,500), 
            delivery_date: '2023-05-01',
            currency: 'USD'
        },
        {
            id: '7a1c081c-33ff-492e-a771-84222f801cbb',
            name: 'item191',
            status: 'active', 
            sum: randomInteger(1,500),
            qty: randomInteger(1,500),
            volume: randomInteger(1,500), 
            delivery_date: '2023-05-22',
            currency: 'RUB'
        },
        {
            id: '88f44e76-f9a5-422f-9a2a-7aed83d11ce6',
            name: 'item184',
            status: 'active', 
            sum: randomInteger(1,500),
            qty: randomInteger(1,500),
            volume: randomInteger(1,500), 
            delivery_date: '2023-05-28',
            currency: 'USD'
        },
    ]

    try {
        data_1.map((item) => {
           return (async () => {
            await setDoc(doc(firestore, endpoint_1, item.id), item)})()
        })
        data_2.map((item) => {
            return (async () => {
             await setDoc(doc(firestore, endpoint_2, item.id), item)})()
         })
    } catch (e: any) {
        throw new Error(e)
    }
}