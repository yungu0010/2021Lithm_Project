import type {AppState} from "./AppState"; 
import type {LoginActions} from "./actions";
const initialState: AppState = {  //초기화
    loggedIn: false,   
    email: ""
  }; 
export const rootReducer = (state: AppState = initialState, action: LoginActions) => {
  switch(action.type){ //login인지 logout인지에 따라 state변환
    case "login":
      return {
        ...state, //state의 속성이 더 많을 때 뒤에 오는 것만 바꾸고 싶다
        loggedIn:true,
        email: action.email,
      }
    case "logout":
      return initialState
  }
  return state //login도 logout도 아닐 수 있음(맨 처음 실행할 때(default)인 경우의 반환)
}