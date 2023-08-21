import React,{Component} from "react";
import {Link} from "react-router-dom";
import http from "./httpService.js"
class Person extends Component{
    state={person:{}}
    async componentDidMount(){
        let {id}=this.props.match.params;
        let response=await  http.get(`/personApp/persons/${id}`)
        console.log(response)
        let {data}=response;
        this.setState({person:data});
    }
    render(){
        const{person}=this.state
        return (<div classname="container">
                 Id:{person.id}
                <br/>
                Name:{person.name}
                <br/>
                Age:{person.age}
                <br/>
                City:{person.city}
                <br/>
                Company:{person.company}
                <br/>
                <Link to={`/persons/${person.id}/delete`}>Delete</Link><br/>
                <Link to={`/persons/${person.id}/edit`}>Edit</Link>
        </div>)
    }
}export default Person;