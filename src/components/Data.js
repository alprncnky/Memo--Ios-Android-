import { AsyncStorage } from 'react-native';
import { getShowed } from './testWord';

// get list object
export async function get(){
    try{
        var lists = await AsyncStorage.getItem('lists');
        var parsed = JSON.parse(lists);
        console.log("DATA-CLASS-GET()");
        console.log(parsed);
        return parsed;
    }
    catch(error){
        alert('error get!');
    }
}

// get list from id
export async function getList(index){
    try{
        var lists = await AsyncStorage.getItem('lists');
        var parsed = JSON.parse(lists);
        console.log("DATA-CLASS-GET()");
        return parsed.list[index].liste;
    }
    catch(error){
        alert('error get!');
    }
}

// add new list - (if object null create object then add list)
export async function addList(listname){
    obj = await get()
    if(obj != null){
        obj.list.push({ name: listname, liste: [] })
        await AsyncStorage.setItem('lists',JSON.stringify(obj));
        console.log("DATA-CLASS-ADDLİST-DONE")
    }else {
        obj = {
            list: []
        }
        obj.list.push({ name: listname, liste: [] })
        await AsyncStorage.setItem('lists',JSON.stringify(obj));
    }
}

// add word to list
export async function addWord(listNo, word1, word2){
    obj = await get()
    show = getShowed(obj,listNo)
    obj.list[listNo].liste.push({kelime1: word1, kelime2: word2, showed: show, count: 0});
    await AsyncStorage.setItem('lists',JSON.stringify(obj));
}


// delete word from list
export async function deleteWord(listNo, wordNo) {
    obj = await get()
    obj.list[listNo].liste.splice(wordNo, 1);
    await AsyncStorage.setItem('lists',JSON.stringify(obj));
}

// delete list
export async function deleteList(listNo) {
    obj = await get()
    obj.list.splice(listNo, 1);
    await AsyncStorage.setItem('lists',JSON.stringify(obj));
}

// update words value
export async function updateWords(listNo,kelimeNo,word1,word2) {
    obj = await get()
    obj.list[listNo].liste[kelimeNo].kelime1 = word1
    obj.list[listNo].liste[kelimeNo].kelime2 = word2
    await AsyncStorage.setItem('lists',JSON.stringify(obj));
}

// update words showed
export async function updateScore(listNo,kelimeNo,answer,pass){
    obj = await get()
    count = obj.list[listNo].liste[kelimeNo].count
    obj.list[listNo].liste[kelimeNo].showed = obj.list[listNo].liste[kelimeNo].showed + 1
    if(answer == true){     // true answer
        if(count >= 3){
            obj.list[listNo].liste[kelimeNo].count = 3
        }
        else{
            obj.list[listNo].liste[kelimeNo].count = count + 1
        }
    }
    else{   // wrong answer
        if(count <= -3){
            obj.list[listNo].liste[kelimeNo].count = -3
        }
        else{
            obj.list[listNo].liste[kelimeNo].count = count - 1
        }
    }
    await AsyncStorage.setItem('lists',JSON.stringify(obj));
}