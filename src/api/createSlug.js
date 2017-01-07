export default string => string.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
