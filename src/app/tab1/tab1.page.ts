import { Component, wtfStartTimeRange} from '@angular/core';
//import { Storage } from '@ionic/storage';
import { ToastController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  data: any;
   water:number;
   isenabled:boolean=true;
   constructor(public toastController:ToastController,public alertController: AlertController ){
 
      /*
      generate setup Date:water 
      

      */ 
     console.log("tab1.ts loaded");
      this.data = {};
      this.water = 0;

     function resetAtMidnight() {
     var now = new Date();
     var night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // the next day, ...
        0, 0, 0 // ...at 00:00:00 hours
    );
    var msToMidnight = night.getTime() - now.getTime();

    setTimeout(function() {
        this.reset();              //      <-- This is the function being called at midnight.
        resetAtMidnight();    //      Then, reset again next midnight.
    }, msToMidnight);
}

    


    }
    async setPrompt(water:number) {
      const alert = await this.alertController.create({
        
        header: 'Add '+water+' fl Oz',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }
          , {
            text: 'Add Water',
            handler: () => {
            this.addWater(water)
              console.log('Confirm Ok');
            }
          }
        ]
      });
      await alert.present();
    }
    
    async CustomPrompt() {
      const alert = await this.alertController.create({
        header: 'Enter a custom amount',
        inputs: [
          {
            type: 'number',
            name: 'input',
            
            min: 0,
            value:0,
            placeholder:'Enter quanity of water'
          }
        ],
        buttons: [
          {
            text: 'Change to Metric (mL)',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }
          , {
            text: 'Add',
            handler: customamount => {
              /* 
              customamount.input is a string type and will auto concatenate
              with addition symbol
              Multiply by 1 to force convert from string to number data type 
              */
              var converter = customamount.input * 1;
              this.addWater(converter);
              console.log('Confirm Ok');
            }
          }
        ]
      });
  
      await alert.present();
    }

    async presentToast(data:number,text:string) {
      const toast = await this.toastController.create({
        message: text+data,
        duration: 2000
      });
      toast.present();
    }
    addWater(extra : number){
      if(this.isenabled == true){
        this.isenabled = false;
      console.log("extra water added:"+extra);
      console.log("Old water:"+this.water);
      let tempwater = this.water;
        this.water = tempwater + extra;
       this.presentToast(tempwater+extra,"Total water:");
       
       
      let hideFooterTimeout = setTimeout( () => {
        this.isenabled = true;
     }, 3000);
     
    }
    else{
      
    }

  
  
  
    }
     /* set a key/value
  setValue(key: string, value: any) {
    this.storage.set(key, value).then((response) => {
      console.log('set' + key + ' ', response);
 
      //get Value Saved in key
      this.getValue(key);
 
    }).catch((error) => {
      console.log('set error for ' + key + ' ', error);
    });
  }
    // get a key/value pair
    getValue(key: string) {
      this.storage.get(key).then((val) => {
        console.log('get ' + key + ' ', val);
        this.data[key] = "";
        this.data[key] = val;
      }).catch((error) => {
        console.log('get error for ' + key + '', error);
      });
    }
    getKeyLength() {
      this.storage.length().then((keysLength: Number) => {
        console.log("Total Keys " + keysLength);
      });
      */
    }
