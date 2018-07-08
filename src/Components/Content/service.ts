import Axios from 'axios';

export const getData = (url: string, callback: (response: any) => void) => {
    Axios.get(url).then(response => callback(response))
                  .catch(error => console.warn(error));
}