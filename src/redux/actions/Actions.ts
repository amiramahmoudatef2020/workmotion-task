import * as actions from '../../constants/ActionTypes'
import {IEmployees} from '../../interfaces/interfaces'

export const getEmployees = (employees:IEmployees[]) => {
   console.log("employessssssssssssssssss",employees)
   return({
    type: actions.GET_EMPLOYEES_LIST,
    payload: { employees }
 })};
 export interface ISetEmployees {
    employees:IEmployees[]
 }
 export const applySetUserType = (userType:string) =>{
   return  ({
    type:actions.USER_TYPE
    ,payload: {userType}
 })};