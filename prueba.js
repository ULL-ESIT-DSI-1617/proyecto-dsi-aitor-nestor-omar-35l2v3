function cleaner(str) {
    tam = str.length;
    return str.substr(1,tam);
}
function adder(str) {
    console.log(str.length);
    aux = str;
    str = [];
    str += ["-"];
    for(i = 0; i<= str.length;i++){
        str += [aux[i]];
        console.log(str);
    }
    console.log(str.length);
}
function ObjectId(str){
    return str;

}
console.log(ObjectId("591718f36c84cf705bf75a41"));
591718f36c84cf705bf75a41