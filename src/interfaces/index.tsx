export interface ISignup{

        username:string,
        email:string,
        password:string,
        jwt?:string
}



export interface Ilogin{
        identifier:string,
        password:string,
        jwt?:string
        user?:{
                email:string
        }
}

export interface IProduct{
        id:number,
        title:string,
        description:string
        price:number,
        stock:number,
        thumbnail:{
                formats:{
                        medium:{
                        url:string
                }
                }
        }
        quantity?:number


}