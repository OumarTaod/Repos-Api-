var client =  null;

function connecter(url, callback){
    if(client === null){
        client = new MongoClient(url);
        
        client .connect((erreur) =>{
            if(erreur){
                client = null;
                callback(erreur);
                
            }else{callback();}
        })
    } else{
        callback();
    }
}