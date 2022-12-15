import { firestore } from "src/firebase";
import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc, deleteField  } from "firebase/firestore";
import { Data } from "src/type";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject  } from "firebase/storage";

export const getRequest = async (endpoint: string) => {
    try {
        let data: Data[] = [];
        const querySnapshot = await getDocs(collection(firestore, "Documents"));
        querySnapshot.forEach((doc) => {
            if(doc.id === endpoint && doc.data().data) {
                data = [...data, ...doc.data().data]
            }
        });
        return data
    } catch (e: any) {
        throw new Error(e)
    }   
}

// id: keyof Data
export const updateRequest = async (data: Data[]) => {
    try {
        const docRef = doc(firestore, "Documents", "documents2")
        await updateDoc(docRef, {
            data: [...data]
        })
    } catch (e: any) {
        throw new Error(e)
    }   
}