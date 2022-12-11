import { firestore } from "../firebase";
import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc  } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject  } from "firebase/storage";

export const getRequest = async () => {
    try {
        //  @ts-ignore
        let data = [];
        const querySnapshot = await getDocs(collection(firestore, "Documents"));
        querySnapshot.forEach((doc) => {
            //  @ts-ignore
            data = [...data, ...doc.data().data]
        });
        //  @ts-ignore
        return data
    } catch (e) {
        //  @ts-ignore
        throw new Error(e)
    }   
}