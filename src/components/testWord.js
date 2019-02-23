// get word from list where showed value is smaller
export function getMeWordsFromList(data){
    console.log("loaddata-testWord-Class:"+data)
    try{
        liste = data
        i=0
        while(liste.filter(liste => liste.showed === i).length == 0){
            i=i+1
        }
        return liste.filter(liste => liste.showed === i)
    }
    catch(error){
        alert('error get!');
    }
}

export function getWordsNo(data){
    No=[]
    liste = data
    i=0
    while(liste.filter(liste => liste.showed === i).length == 0){
        i=i+1
    }
    for(j=0;j<data.length;j++){
        if(liste[j].showed === i){
            No.push(j)
        }
    }
    console.log("INSPECT*******")
    console.log(No)
    return No
}

export function getShowed(data,no){
    console.log("getShowed()")
    i=0
    try{
        liste = data.list[no].liste
        if(liste.length > 0){
            while(liste.filter(liste => liste.showed === i).length == 0){
                i=i+1
            }
        }
    }catch{
        // cant find error!
        i=0
    }
    return i
}