import conf from "../config/config"
import {Client,Account,ID} from "appwrite";


export class AuthService{
client=new Client();
account;

constructor(){
    this.client
    
    .setEndpoint(conf. appwriteurl)
    .setProject(conf.appwriteprojectid);
    this.account=new Account(this.client)
}
async createAccount({email,password,name}){
        try{
         const useraccount=  await this.account.create(ID.unique(),email,password,name)
         if(useraccount) {
           return await this.account.createEmailPasswordSession(email,password)
         }

         else return useraccount
        }
        catch(err){ throw err}
}
async login({email,password}){
   console.log(email,password)
 try{
    return await this.account.createEmailPasswordSession(email,password)
 }
 catch(err){
    throw err
 }

}

async getCurrentUser(){
  try{ return await this.account.get()}
  catch(err){ console.log("Appwrite service::get current_user::eror:",err)}
  return null
}
async logout(){
    try{
        return await this.account.deleteSessions()
     }
     catch(err){
        console.log("Appwrite service::log out::eror:",err)}
     }
    
    

}
const authService=new AuthService()
export default authService; 