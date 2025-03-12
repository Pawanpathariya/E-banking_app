const GenPass=()=>{
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|`";
    var pass="";
    for(let i=0;i<8;i++){
        let random=Math.floor(Math.random()*str.length);
        pass+=str.charAt(random);
    }
return pass;
}

module.exports={GenPass}