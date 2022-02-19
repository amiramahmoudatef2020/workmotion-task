import "./States.css";
import { useState } from "react";
import { updateEmployee } from "../../services/Client";
import { applySetUserType ,getEmployees} from './../../redux/actions/Actions';
import { store } from './../../index';
import { StoreState } from './../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';


export default function States(props: any) {
  let  states =[
    "Added",
    "Incheck",
    "Approved",
    "Active",
    "Inactive",
  ]
  const { user } = props;
console.log("user",user)
  const [isActive, setActive] = useState(true);
  console.log("user.state",user.state)

 let state= states.findIndex((state)=>state===user.state)
 console.log("state",state)
  const [index, setIndex] = useState(state);
  const empolyees  = useSelector((state: StoreState) => state.employees);


  const updateUser = (state: string) => {
    console.log("userId",user)
    console.log(empolyees)
 let   foundIndex = empolyees.employees.findIndex((employee) => employee.id == user.id);
 console.log("foundIndex",foundIndex)
  empolyees.employees[foundIndex].state = state;
  console.log("empolyees from states",empolyees)
  store.dispatch(getEmployees(empolyees.employees));


    updateEmployee([user, States]);
  };
  const clicked = (index: number) => {
    if (index > 0) {
      setIndex(index);

      updateUser(states[index]);
    } else {
      setIndex(0);
      updateUser(states[index]);
    }
  };
  return (
    <div className=" d-flex justify-content-center align-items-baseline">
      <div
        className={`state col-md-2 ${index === 0 ? "active" : ""}`}
        style={{ borderLeft: "1px double gainsboro" }}
        onClick={() => clicked(0)}
      >
        <span
          className="text-center align-middle "
          style={{ marginLeft: "40%" }}
        >
          Added
        </span>
      </div>
      <div
        className={`state col-md-2 ${index === 1 ? "active" : ""}`}
        onClick={() => clicked(1)}
      >
        <div
          className={`arrowleft ${index === 0 ? "active" : "activeArrow"}`}
        ></div>
        <span className="text-center align-middle">In-check</span>
      </div>
      <div
        className={`state col-md-2 ${index === 2 ? "active" : ""}`}
        onClick={() => clicked(2)}
      >
        <div
          className={`arrowleft ${index === 1 ? "active" : "activeArrow"}`}
        ></div>
        <span className="text-center align-middle">Approved</span>
      </div>
      <div
        className={`state col-md-2 ${index === 3 ? "active" : ""}`}
        onClick={() => clicked(3)}
      >
        <div
          className={`arrowleft ${index === 2 ? "active" : "activeArrow"}`}
        ></div>
        <span className="text-center align-middle">Active</span>
      </div>
      <div
        className={`state col-md-2 ${index === 4 ? "active" : ""}`}
        style={{ borderRight: "1px double gainsboro" }}
        onClick={() => clicked(4)}
      >
        <div
          className={`arrowleft ${index === 3 ? "active" : "activeArrow"}`}
        ></div>
        <span
          className="text-center align-middle"
          style={{ marginLeft: "45%" }}
        >
          Inactive
        </span>
      </div>
    </div>
  );
}
