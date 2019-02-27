import PushNotification from 'react-native-push-notification';
import BackgroundJob from 'react-native-background-job';
import { getNotificationData, setNotificationData, get } from './Data';
import { getWordsForNotification } from './testWord';

const regularJobKey = "regularJobKey";

BackgroundJob.register({
  jobKey: regularJobKey,
  job: () => sendNotification()
});

async function sendNotification(){
    console.log("background-fired-notifcation-sendNotification()")
    // do the notifaction background thing...
    data = await getWordsForNotification()
    if(data != 0){
      console.log("NOTİFICATION SHOWED")
      text = data.kelime1 +" - "+ data.kelime2
      PushNotification.localNotification({
        title: "Ezberleme Zamanı!", // (optional)
        message: text,
      })
    }
    else{
      console.log("ERRON ON SENDNOTİFİCTAON()")
    }
}

function SetNotification(minute){
  var miliSec=minute*60000;
  console.log("milisec:"+miliSec)
  try{
    BackgroundJob.cancelAll();
    }
    catch{
      console.log("error on SetNotification()")
    }
    BackgroundJob.schedule({
      jobKey: regularJobKey,
      allowWhileIdle: true,
      exact: true,
      persist: true,
      override: true,
      requiresCharging: false,
      allowWhileIdle: true,
      notificationTitle: "Notification title",
      notificationText: "Notification text",
      period: miliSec
    });
}

export async function HandleNotification() {
  try{
    var onOff = await getNotificationData()
    if(onOff != 0){
      console.log("goto SetNotification")
      SetNotification(onOff) // onOff value carrying minutes value like 30,60 send to 
    }
    else{
      BackgroundJob.cancelAll();
      console.log("onOff is 0 or not set")
    }
  }catch{
    console.log("errorn on HnadleNotification()")
  }
}