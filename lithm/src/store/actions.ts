import type {Action} from "redux"; 
type LogoutAction = Action<"logout">; 
type LoginAction = Action<"login"> & {     //4개의 속성을 포함하는 객체
    email: string,
};
export type LoginActions = LogoutAction | LoginAction; 

export const loginAction = (email: string) => {     
    return {         
        type: "login",         
        email: email  
    }; 
} 

export const logoutAction = () => {     return {type: "logout"}; 
}
