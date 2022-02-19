import React, { useCallback, useEffect, useState } from "react";
import { IEmployees_Response, IEmployees } from "../../interfaces/interfaces";
import { StoreState } from "../../redux/reducers/Reducers";
import { useSelector } from "react-redux";

import { GetEmpolyees } from "../../services/Client";
import Loader from "../../components/Loader/Loader";
import States from "../../components/States/States";
import { GetEmpolyeesList } from './../../services/Utilities';
import { getEmployees } from './../../redux/actions/Actions';
import { store } from "../../index";
export default function EmployeesList() {
  const [employessData, setEmployees] = useState<IEmployees_Response>();
  const userType  = useSelector((state: StoreState) => state.authType);
  const empolyees  = useSelector((state: StoreState) => state.employees);
  const [loader, isLoader] = useState(true);

  const getEmployessList = useCallback(() => {
    console.log("getEmployessList getEmployessList")
    GetEmpolyees().then((res) => {
      if (res.result) {
        setEmployees(res);
        store.dispatch(getEmployees(res.employees));

        isLoader(false);

      }
    });
    
  }, [employessData]);
  useEffect(() => {
    console.log("empolyees.length",empolyees)
    if(empolyees.employees.length){
      isLoader(false)
    }else{
   getEmployessList();
    }

  }, []);

  let updatedEmployess=empolyees.employees.length>0?empolyees.employees:employessData?.employees
  return loader ? (
    <Loader />
  ) : (
    <table className="table   responsive ">
      <thead>
        <tr>
          <th className="col-md-3 text-center">Employees Name</th>
          <th className="col-md-21 text-center">State</th>
        </tr>
      </thead>
      <tbody>
        {
        
        updatedEmployess?.map((user, index) => {
          return (
            <tr key={index}>
              <td className="col-md-3 text-center align-middle">{user.name}</td>
              <td className="col-md-21 text-center align-middle"
              
              >
                <States user={user} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
