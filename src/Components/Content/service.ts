import Axios from 'axios';

export const getData = (url: string, params: any, callback: (response: any) => void) => {
    Axios.get(url, { params }).then(response => callback(response))
                              .catch(error => console.warn(error));
}