import { updateNotify, get } from './Data';
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

export function leastNotifyNumber(data,no){
    console.log("leastNotifyNumber()")
    i=0
    try{
        liste = data.list[no].liste
        if(liste.length > 0){
            while(liste.filter(liste => liste.notify === i).length == 0){
                i=i+1
            }
        }
        return i
    }catch{
        // cant find error!
        i=0
        return i
    }
}


export async function getWordsForNotification(){
    console.log("getWordsForNotification()")
    try{
        data = await get()
        randomList = randomNumber(data)
        console.log("T----:RANDOMlİST:"+randomList)
        if(randomList != -1){
            liste = data.list[randomList].liste
            i=0
            while(liste.filter(liste => liste.notify === i).length == 0){
                i=i+1
            }
            console.log("T----:i:"+i)
            j=0
            while(liste[j].notify !== i)
            {
                j=j+1
            }
            console.log("T----:j:"+j)
            // notify arttir kaydet
            updateNotify(data, randomList, j)
            console.log("return the liste object:"+liste[j].kelime1)
            return liste[j]
        }
        return 0;
    }
    catch{
        console.log("/-/-/-/-/-/- error on getWordsFOrNotification()")
        return 0;
    }
}

function randomNumber(data){
    array =[]
    for(i=0; i<data.list.length;i++)
    {
        if(data.list[i].liste.length > 0){
            array.push(i)
        }
    }
    console.log("--------array lenght:"+array)
    console.log("--------array lenght:"+array.length)
    if(array.length == 0){
        return -1
    }
    else{
        number = Math.floor(Math.random() * array.length);
        return array[number]
    }
}