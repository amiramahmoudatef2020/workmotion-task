import {Operations} from '../constants/Operations'
import {IEmployees, IEmployees_Response } from '../interfaces/interfaces'

    import {call} from './Xhr'
    export const GetEmpolyees= (): Promise<IEmployees_Response>=> {
        return new Promise((resolve, reject) => { 
            call<IEmployees_Response>(Operations.EmployeeList,[]).then((data:IEmployees_Response)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }

    export const updateEmployee= ( params: any[]): Promise<IEmployees_Response>=> {
        return new Promise((resolve, reject) => { 
            console.log("params",params)
            // call<IEmployees_Response>(Operations.UpdateEmployee,params).then((data:IEmployees_Response)=>{

            //     resolve(data)
            // }).catch((err)=>{
            //     reject(err)
            // })
        })
    }
 

