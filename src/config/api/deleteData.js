import { firebaseDatabase } from '../firebase';
import getAllData from './getAllData';

const deleteData = key => {
    return new Promise((resolve, reject) => {
        firebaseDatabase
            .ref('galery/' + key)
            .remove()
            .then(() => {
                return resolve(getAllData());
            })
            .catch(err => reject(err));
    });
}

export default deleteData;