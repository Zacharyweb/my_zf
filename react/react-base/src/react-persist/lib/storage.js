export default {
    setValue(key,value){
        localStorage.setItem(key,value);
    },
    getValue(key){
       return localStorage.getItem(key);
    }
};