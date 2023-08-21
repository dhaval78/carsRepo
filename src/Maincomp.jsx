import React,{Component} from "react";
import { Route,Switch,Redirect } from "react-router-dom";
import Cars from "./cars"
import Navbar from "./Navbar"
import DeleteCar from "./deleteCar"

import AddCar from "./addCar";
class MainC extends Component{
    render ()
    {
        return(
            <div className="container">
                <Navbar/>
                <Switch>
                    <Route path="/cars/add" component={AddCar}/>
                    <Route path="/cars/:id/delete" component={DeleteCar}/>
                    <Route path="/cars/:id/edit" component={AddCar}/>
                    <Route path="/cars" component={Cars}/>
                    <Redirect from="/" to="/cars"/>
                </Switch>
            </div>
        );
    }
}export default MainC 