import {axios} from 'axios';


export const downloadFilesa = (url, fileName) => {
    axios({
        url,
        method: 'GET',
        responseType: 'blob',
    }).then((response) => {
        const blobbedResponse = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = blobbedResponse;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    });
}