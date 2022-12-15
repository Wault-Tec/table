import { firestore } from "src/firebase";
import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc, deleteField, setDoc, query } from "firebase/firestore";
import { Data } from "src/type";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import dataSlice from "src/store/slices/dataSlice";

// export const getRequest = async (endpoint: string) => {
//     try {
//         let data: Data[] = [];
//         const querySnapshot = await getDocs(collection(firestore, "Documents"));
//         querySnapshot.forEach((doc) => {
//             if(doc.id === endpoint && doc.data().data) {
//                 data = [...data, ...doc.data().data]
//             }
//         });
//         return data
//     } catch (e: any) {
//         throw new Error(e)
//     }   
// }


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

export const deleteRequest = async (id: string[]) => {
    try {
        id.map((id) => {
            return (async () => {
                await deleteDoc(doc(firestore, "documents1", id))
                await deleteDoc(doc(firestore, "documents2", id))
                console.log('DELETE')
            })()
        })
    } catch (e: any) {
        throw new Error(e)
    }
}


export const setRequest = async (id: string, data: Data) => {
    try {
        const docRef = await setDoc(doc(firestore, "documents2", id),
            data
        );
        // return docRef.id
    } catch (e: any) {
        throw new Error(e)
    }
}