import { IEmployees } from "../interfaces/interfaces";
import {
  getEmployees
  } from "../redux/actions/Actions";

  import {
    IEmployees_Response
  } from "../interfaces/interfaces";
  import { store } from "..";
  import {
    GetEmpolyees,
  } from "./Client";
import queryString from "query-string";
export const isXsSize = () => {
    return window.outerWidth < 375 ? true : false;
  };
  export const isSmSize = () => {
    return window.outerWidth > 768 ? false : true;
  };
  export const isMdSize = () => {
    let width = window.outerWidth;
    if (width > 768 && width < 1025) {
      return true;
    }
  };
  export const truncate = (str: string, length: number) => {
    return str.length > length ? str.substring(0, length) + "..." : str;
  };
  export const GetEmpolyeesList = () => {
    // GetEmpolyees().then((res: IEmployees_Response) => {
    //   if (res.result) {
    //     store.dispatch(getEmployees(res.employees));
    //   }
    // });
  };
