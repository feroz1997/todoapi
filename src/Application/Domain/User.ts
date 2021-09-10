export default class User{
    private constructor (public id:string, public email:string, public password:string, public loggedTokken:string){
    }
    static create(userData:any){
        const {id,email,password,loggedToken} = userData;
        return new User(id,email,password,loggedToken);
    }
}