import { useState, useEffect } from 'react';
import { firebaseDatabase, firebaseStorage } from '../firebase';

const useStorage = file => {

    const [url, setUrl] = useState('');
    const [uploaded, setUploaded] = useState(0);

    useEffect(() => {
        const storageRefs = firebaseStorage.ref(`${Date.now()}`);

        storageRefs.put(file).on('state_changed', snap => {
            let uploading = (snap.bytesTransferred / snap.totalBytes) * 100;
            setUploaded(uploading);
        }, err => {
            console.log("error upload file : ", err);
        }, async () => {
            const urlDownlod = await storageRefs.getDownloadURL();
            setUrl(urlDownlod);

            firebaseDatabase.ref('galery').push({
                image: urlDownlod
            })
                .then(() => {
                    alert('berhasil upload !');
                })
                .catch(() => {
                    alert('gagal upload !');
                })
        });
    }, [file]);

    return { url, uploaded };

}

export default useStorage;