import React, { useEffect, lazy, Suspense, Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RouterLinks } from "./constants/RouterLinks";
import { createBrowserHistory } from "history";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "./redux/reducers/Reducers";
const LandingPage = lazy(() => import("./pages/EmployeesList/EmployeesList"));
function App() {
  const dispatch = useDispatch();
  let history = createBrowserHistory();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      console.log = function () {};
    }
  }, []);
  return (
      //   <Routes>
      //         <Route path={RouterLinks.EmployeesList} element={LandingPage}>
      //           {/* <Route path={RouterLinks.Employee} element={LandingPage} /> */}
      //         </Route>
      //   </Routes>
      // </Router>
         <Router basename={process.env.PUBLIC_URL}>
           <Suspense fallback={<span></span>}>

<Routes>

      <Route path="/" element={<LandingPage />}/>

    </Routes>
    </Suspense>

  </Router>
  );
}

export default App;
