export interface IStore {
    state: string;
 
 }

 export interface IBaseResponse {
    result?: boolean;
    operationResult?: string;
    operationCode?: string;
    hasAlert?: boolean;
    alertMessage?: string;
 }

 export interface IBaseRequest {
    operation: string;
    parameters?: any[];
    language?: 'ARABIC' | 'ENGLISH';
    version?: string;
 }


 export interface IEmployees{
    id: number,
    name:string,
    state:string

 }
 
 export interface IEmployees_Response extends IBaseResponse {
    employees: IEmployees[]
 }