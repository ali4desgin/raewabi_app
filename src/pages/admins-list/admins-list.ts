import { SignupPage } from './../signup/signup';
import { AdminChatPage } from './../admin-chat/admin-chat';
import { CommonProvider } from './../../providers/common/common';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the AdminsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admins-list',
  templateUrl: 'admins-list.html',
})
export class AdminsListPage {
  resposeData : any;
  isorder : boolean;
  loadingtext : any;
  admins: any[];
  userData = {"phone":"0911111111111111", "password":"mugmugmug"};


  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, private toastCtrl:ToastController,public common: CommonProvider, public navParams: NavParams) {
    this.isorder=false;
    this.loadingtext="جاري تحميل قائمة المشرفين";
  this.getadminslist();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminsListPage');
  }


  // ionViewWillEnter(){
  //   this.getadminslist();
  // }


  openchat(admin){

    this.navCtrl.push(AdminChatPage, {
      admin:admin,
     
    });


   }


  getadminslist(){
 
    this.common.presentLoading();

    let body="";

    
 
    let user_id="";
    if(localStorage.getItem("userData").length>0&&localStorage.getItem("userData")!=null){

    


      const data = JSON.parse(localStorage.getItem("userData"));

     

        user_id = data.user.id==null?"":data.user.id;
              
      
     


        body =  "admin/list?user_id=" + user_id ;
          

   

    }
    


    this.authService.getData( body).then((result) =>{
    this.resposeData = result;
    this.admins=this.resposeData.data;
      
    if(this.admins.length!=0){
        this.isorder=true
    
    } 
   if(this.admins.length==0){
        this.loadingtext="لا يوجد مستخدمين حاليا";

    }
    console.log(this.admins)
    this.common.closeLoading();






  
  

   
    


    }, (err) => {
      //Connection failed message
           console.log(err);
      this.common.closeLoading();
    });
   }
  
  



  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  openreg(){

    this.navCtrl.setRoot(SignupPage);

  }

}
