import axios, { AxiosResponse,AxiosError } from "axios";
import { IBaseResponse, IBaseRequest } from "../interfaces/interfaces";
import { Operations } from "../constants/Operations";
import queryString from "query-string";
import { store } from "..";
//  import { isError } from "../redux/actions/Actions";

const urlParams = queryString.parse(window.location.search);
const isMock = process.env.REACT_APP_IS_MOCK;
const axiosConfigInstance = axios.create({
  baseURL:
    isMock === "true"
      ? process.env.REACT_APP_OOREDOO_APP_API_URL
      : process.env.REACT_APP_API_URL,
});
// const errorHandler = (error: AxiosError) => {
//     // error.response=={...error.response,status:500}
  
//     console.log(" error.response?.status=", error.response?.status)
//     // let status=500
//     switch ( error.response?.status/*error.response?.status*//*status*/) {
//       case 401:
//         console.log("Not athorized");
//         break;
//       case 500:
//         console.log("Internal server Error");
//         store.dispatch(isError(true));
  
//         break;
     
//       case 0:
//         console.log("Offline");
//         break;
//       default:
//         break;
//     }
//   };
  const proccessResponse = <T = IBaseResponse>(
    response: AxiosResponse
  ): Promise<T> => {
    if (response.status) {
      const _responseText = response.data;
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = BaseResponse.fromJS(resultData200);
      return result200;
    }
    return Promise.resolve<T>(<any>null);
  };
  
export const call = <T = IBaseResponse>(
    operation: Operations,
    params: any[]
  ): Promise<T> => {
    return new Promise((resolve, reject) => {
      const reqBody: IBaseRequest = {
        operation: operation,
        parameters: params,
      };
      console.log("reqBody",reqBody)
  
      //call xhr request
      axiosConfigInstance({
        method: isMock === "true" ? "GET" : "POST",
        url:
          isMock === "true"
            ? `${process.env.PUBLIC_URL}/mock/${operation}.json`
            : "",
        data:  reqBody,
      })
        .then((response: AxiosResponse) => {
          console.log(
            " %c Success and the retrieved " + operation + " data is:  ",
         
          );
          console.log(response.data);
          if (response.data.response) {
            if (typeof response.data.response === "string") {
              let actualRes = JSON.parse(response.data.response);
              response.data = { ...response.data, ...actualRes };
            } else {
              response.data = { ...response.data, ...response.data.response };
            }
            delete response.data.response;
          }
          resolve(proccessResponse<T>(response));
          
        })
        .catch((error: AxiosError) => {
          console.error(
            `Backend returned code ${error.code}, ` +
              `body was: ${JSON.stringify(error.message)}`
          );
        //   errorHandler(error);
          reject(error);
        });
    });
  };
  export class BaseResponse implements IBaseResponse {
    result?: boolean | undefined;
    operationResult?: string | undefined;
    operationCode?: string | undefined;
    hasAlert?: boolean | undefined;
    alertMessage?: string | undefined;
  constructor(data?: IBaseResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.result = _data["result"];
      this.operationResult = _data["operationResult"];
      this.operationCode = _data["operationCode"];

    }
  }

  static fromJS(data: any): BaseResponse {
    data = typeof data === "object" ? data : {};
    let result = new BaseResponse(data);
    result.init(data);
    return result;
  }
}