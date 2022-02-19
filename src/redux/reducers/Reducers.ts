import * as actions from "../../constants/ActionTypes";
import {
  ISetEmployees,
  applySetUserType
} from "../actions/Actions";
import {
  IEmployees,
  IEmployees_Response
} from "../../interfaces/interfaces";
export interface StoreState {
    lang: "en" | "ar";
    employees: IEmployees_Response;
    hasError:boolean,
    employee:IEmployees,
    authType: string

   
  }
  export interface ReduxAction<T = { [key: string]: any }> {
    type: string;
    payload?: T;
  }



  const initialState: StoreState = {
    lang: "en",
    employees: {employees:[]} ,
    hasError:false,
    employee: {
      id: 0,
      name: "",
      state:'added' ,
    },
    authType: "init"

  
  };
  export default function reducers(state = initialState, action: ReduxAction) {
    console.log("action",action)
    switch (action.type) {
      case actions.GET_EMPLOYEES_LIST:
        return (state = {
          ...state,
          employees: (action.payload as IEmployees_Response),
        });
    
        case actions.HAS_ERROR:
          return (state = {
            ...state,
            hasError: (action.payload as { hasError: boolean }).hasError,
          });
     
            case actions.USER_TYPE: {
              return (state = {
                ...state,
                authType: (action.payload as { userType: string }).userType,
              });
            }

           
      default:
        return state;
    }
  }