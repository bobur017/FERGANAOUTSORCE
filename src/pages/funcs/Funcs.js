export const baseUrl = () => {
    // return "http://192.168.43.241:8888/out/api";
    return "http://192.168.43.134:8888/out/api";
    // return "http://localhost:8888/out/api";
}

export const colorText = (num) => {
    if (num < 100) {
        return {backgroundColor: 'rgba(227, 223, 107, 0.69)'}
    } else if (num < 101 && num > 99) {
        return {backgroundColor: 'rgba(115,227,107,0.56)'}
    } else {
        return {backgroundColor: 'rgba(227,143,141,0.56)'}
    }
}

export const colorTextStr = (num) => {
    if (num < 100) {
        return 'rgba(227, 223, 107, 0.69)';
    } else if (num < 101 && num > 99) {
        return 'rgba(115,227,107,0.56)';
    } else {
        return 'rgba(227,143,141,0.56)';
    }
}


export const TimestampToInputDate = (time, name) => {
    if (time) {
       return new Date(time)?.getFullYear() + "-" + ((new Date(time)?.getMonth() + 1) < 10 ? "0" + (new Date(time)?.getMonth() + 1) : (new Date(time)?.getMonth() + 1)) + "-" + (parseInt(new Date(time)?.getDate()) > 9 ? new Date(time)?.getDate() : ("0" + new Date(time)?.getDate()));
    } else {
        return '';
    }
}

export const parseLocalDate = (list) => {
 return list.join("-");
}