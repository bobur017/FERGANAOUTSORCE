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
  }else {
    return {backgroundColor: 'rgba(227,143,141,0.56)'}
  }
}

export const colorTextStr = (num) => {
  if (num < 100) {
    return 'rgba(227, 223, 107, 0.69)';
  } else if (num < 101 && num > 99) {
    return 'rgba(115,227,107,0.56)';
  }else {
    return 'rgba(227,143,141,0.56)';
  }
}
