import conf from "../config/config"
import {Client,Account,ID,Databases,Query,Storage} from "appwrite";
export class Service{
client=new  Client();
databases;
bucket;

constructor(){
    this.client
    .setEndpoint(conf. appwriteurl)
    .setProject(conf.appwriteprojectid);
    this.databases =new Databases(this.client);
    this.bucket=new Storage(this.client)
}
async createpost({title,slug,content,featuredimage,status,userid}){
    try{
     return   await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
            title,
            slug,   
            content,
            featuredimage,
            status,
            userid,

 })

    } catch(err){
                  console.log("Appwrite service::createpost::eror:",err)
    }

}

async updatepost(slug,{title,content,featuredimage,status}){
    try{
     return   await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
            title,
            slug,   
            content,
            featuredimage, 
            status,
       
 })

    } catch(err){
                  console.log("Appwrite service::createpost::eror:",err)
    }

}
async deletepost(slug){
   try{
   await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
   return true;
   }
   catch(err){
    console.log("Appwrite service::deletepost::eror:",err)
    return false; 
   }
}
async getpost(slug){
    try{
        return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
    }
    catch(err){
        console.log("Appwrite service::getpost::eror:",err)
        return false;
    }
}

async getposts(Queries=[Query.equal("status","active")]){ 
    try{
        return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,Queries)
    }
    catch(err){
        console.log("Appwrite service::getposts::eror:",err)
        return false;
    }
}
////file upload
 async uploadfile(file){
     try{
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
     }
     catch(err){
        console.log("Appwrite service::uploadfile::eror:",err)
        return false;
     }
 }
 async deletefile(fileid){
    try{
       return await this.bucket.deleteFile(
           conf.appwriteBucketId,
         fileid
         
       )
       return true;
    }
    catch(err){
       console.log("Appwrite service::deletefile::eror:",err)
       return false;
    }
 }

  getfilepreview(fileid){
    try{
       return  this.bucket.getFileView(
           conf.appwriteBucketId,
         fileid

       )
   
    }
    catch(err){
       console.log("Appwrite service::getfilepreview::eror:",err)
       return false;    
    }
}

}
const service=new Service()
export default service;
