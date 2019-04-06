import { AsyncStorage } from 'react-native';
import { getShowed, leastNotifyNumber } from './testWord';

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
        obj.list.push({ name: listname, liste: [], correct: 0, notification: 0 })
        await AsyncStorage.setItem('lists',JSON.stringify(obj));
        console.log("DATA-CLASS-ADDLİST-DONE")
    }else {
        obj = {
            list: []
        }
        obj.list.push({ name: listname, liste: [], correct: 0, notification: 0 })
        await AsyncStorage.setItem('lists',JSON.stringify(obj));
    }
}

// add word to list
export async function addWord(listNo, word1, word2){
    obj = await get()
    show = getShowed(obj,listNo)
    notifyNo = leastNotifyNumber(obj, listNo)
    console.log("notifyNo:"+notifyNo)
    obj.list[listNo].liste.push({kelime1: word1, kelime2: word2, showed: show, count: 0, notify: notifyNo});
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
        obj.list[listNo].correct = obj.list[listNo].correct + 1
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


// update notify data and save after notification showed
export async function updateNotify(data,listNo, kelimeNo){
    console.log("updateNotfiy()")
    obj = data
    obj.list[listNo].notification = obj.list[listNo].notification + 1
    obj.list[listNo].liste[kelimeNo].notify = obj.list[listNo].liste[kelimeNo].notify + 1
    await AsyncStorage.setItem('lists',JSON.stringify(obj));
}



//**************  Save Notification On Off data ******************* */
//***************************************************************** */

// set notification is "on" or "off"
export async function setNotificationData(onOff){
    try{
        var onOffStr = onOff.toString()
        await AsyncStorage.setItem('Notification', onOffStr);
    }
    catch{ console.log("error set notification")}
}

// get notification data
export async function getNotificationData(){
    try{
        minutesStr = await AsyncStorage.getItem('Notification');
        minutes = Number(minutesStr)
        return minutes
    }
    catch{ 
        Console.log("error on getNotification")
        return 0
    }
}
//***************************************************************** */
//***************************************************************** */



// THIS FUNCTION RUN ONE TIME. 
export async function addKey(){
    // run 1 time
    try{
        var exist = await AsyncStorage.getItem('add');
        if(exist == null){
            console.log("exist==null ifte")
            obj = await get()
            if(obj == null){
                console.log("obj NULL on addKey()")
                // Create Object Structure
                obj = {
                    list: []
                }
            }           
            // add SampleList List and add 4 words in it.
            obj.list.push({ name: "SampleList", liste: [], correct: 0, notification: 0 })
            obj.list[0].liste.push({kelime1: "my", kelime2: "mi", showed: 0, count: 0, notify: 0});
            obj.list[0].liste.push({kelime1: "name", kelime2: "nombre", showed: 0, count: 0, notify: 0});
            obj.list[0].liste.push({kelime1: "is", kelime2: "es", showed: 0, count: 0, notify: 0});
            obj.list[0].liste.push({kelime1: "memo", kelime2: "memo", showed: 0, count: 0, notify: 0});
            await AsyncStorage.setItem('lists',JSON.stringify(obj));
            await AsyncStorage.setItem('add',"itsNotNullAnymore");
        }
        else{
            console.log("addKey zaten calisti")
        }
    }
    catch{
        console.log("error on addkey()")
    }
}