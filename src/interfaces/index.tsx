export interface ISignup{
        username:string,
        email:string,
        password:string,
        jwt?:string
}



export interface Ilogin{
        email:string,
        password:string,
        jwt?:string
        user?:{
                email:string
        }
}

export interface IProduct{
        id:number,
        documentId?: string,
        title:string,
        description:string,
        price:number,
        stock:number,
        thumbnail:string,
        quantity?:number
}