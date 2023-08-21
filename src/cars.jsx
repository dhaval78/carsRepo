import React,{Component} from "react";
import {Link} from "react-router-dom";
import queryString from "query-string";
import http from "./httpService.js";
class Cars extends Component{
    state={data:[],
        Fuel:["Diesel","Petrol"],
        Type:["Hatchback","Sedan"],
        Sort:["kms","price","car"],
        MaxPrice: "",
        MinPrice: "",
    }
    async fetchData()
    {
        let queryParams=queryString.parse(this.props.location.search)
        let searchStr=queryString.stringify(queryParams)
        let response=await  http.get(`/cars?${searchStr}`)
        console.log(response)
        let {data}=response;
        this.setState({data:data});
    }
    componentDidMount(){
        this.fetchData();
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps!==this.props)
        this.fetchData();
    }
 

    callURL = (url, options) => {
        let searchString = this.makeSearchString(options);
        this.props.history.push({
            pathname: url,
            search: searchString,
        });
    };

    handleOptionChange = (name, value) => {
        let queryParams = queryString.parse(this.props.location.search);
        queryParams[name] = value;
        this.callURL("/cars", queryParams);
    };

    makeSearchString = (options) => {
        return queryString.stringify(options);
    };
    handleSort = (field) => {
        this.setState({ Sort: field }, () => {
            this.callURL("/cars", {
                ...queryString.parse(this.props.location.search),
                Sort: this.state.Sort,
            });
        });
    };
    handlePriceChange = (event, name) => {
        const value = event.target.value;
        this.setState({ [name]: value }, () => {
            let queryParams = queryString.parse(this.props.location.search);
            queryParams.maxprice = this.state.MaxPrice;
            queryParams.minprice = this.state.MinPrice;
            this.callURL("/cars", queryParams);
        });
    };

    render(){
        
   
        let queryParams=queryString.parse(this.props.location.search)
        return (<div classname="container">
            
            <div className="d-flex">
            <div style={{width:"20%"}}>
                        <div className="border" style={{marginTop:"50px"}}>
                            <h4 style={{marginLeft:"5px"}}>Fuel</h4>
                            {this.state.Fuel.map((fuel) => (
                                <div className="border" style={{padding: "5px 0 5px 10px "}} key={fuel}>
                                    <input
                                        type="radio"
                                        id={`fuel_${fuel}`}
                                        name="fuel"
                                        value={fuel}
                                        checked={queryParams.fuel === fuel}
                                        onChange={() =>
                                            this.handleOptionChange("fuel", fuel)
                                        }
                                    />
                                    <label htmlFor={`fuel_${fuel}`}>{fuel}</label>
                                </div>
                            ))}
                        </div>
                        <div className="border" style={{marginTop:"10px"}}>
                            <h4 style={{marginLeft:"5px"}}>Type</h4>
                            {this.state.Type.map((type) => (
                                <div className="border" style={{padding: "5px 0 5px 10px "}} key={type}>
                                    <input
                                        type="radio"
                                        id={`type_${type}`}
                                        name="type"
                                        value={type}
                                        checked={queryParams.type === type}
                                        onChange={() =>
                                            this.handleOptionChange("type", type)
                                        }
                                    />
                                    <label htmlFor={`type_${type}`}>{type}</label>
                                </div>
                            ))}
                        </div>

                        <div className="border" style={{marginTop:"10px"}}>
                            <h4 style={{marginLeft:"5px"}}>Sort</h4>
                            {this.state.Sort.map((sort) => (
                                <div className="border" style={{padding: "5px 0 5px 10px "}} key={sort}>
                                    <input
                                        type="radio"
                                        id={`sort_${sort}`}
                                        name="sort"
                                        value={sort}
                                        checked={queryParams.sort === sort}
                                        onChange={() =>
                                            this.handleOptionChange("sort", sort)
                                        }
                                    />
                                    <label htmlFor={`sort_${sort}`}>{sort}</label>
                                </div>
                            ))}
                        </div>
                   
                        </div>
             <div style={{width:"100%"}}>         
             <h4 style={{marginLeft:"300px",fontWeight:"bold"}}>All Cars</h4>                      
             <div >

               <label> Price Range:</label> 
               <span style={{marginLeft:"20px"}}>
                            <input
                                type="text"
                                placeholder="Maxprice"
                                className="form-control"
                                style={{width:"20%",display:"inline"}}
                                id="maxPrice"
                                name="maxPrice"
                                value={this.state.MaxPrice}
                                onChange={(e) => this.handlePriceChange(e, "MaxPrice")}
                            />
                            </span>
                            <span style={{marginLeft:"20px"}}>
                       
                            <input
                                type="text"
                                placeholder="Minprice"
                                className="form-control"
                                style={{width:"20%",display:"inline"}}
                                id="minPrice"
                                name="minPrice"
                                value={this.state.MinPrice}
                                onChange={(e) => this.handlePriceChange(e, "MinPrice")}
                            />
                            </span>
                        </div>             
             <div className="d-flex flex-row flex-wrap"  style={{maxWidth:"80%",marginTop:"10px"}}>
          {this.state.data.length===0?<h3>No data found</h3>:
          this.state.data.map((n, index) => (
            <div className="col-3" style={{ backgroundColor:"gold",marginBottom:"5px",marginRight:"5px",textAlign:"center"}} key={index}>
              <p>
                 <b>{n.model}</b> 
              </p>
              <p>Price:{n.price}<br/>Color:{n.color}<br/>Mileage:{n.kms} kms<br/>Manufactured in {n.year}</p>
              <p><span><Link className="btn btn-warning btn-sm" to={`/cars/${n.id}/edit`}><i className="fas fa-edit "/></Link></span>  <span style={{marginLeft:"60px"}}><Link className="btn btn-danger btn-sm" to={`/cars/${n.id}/delete`}><i className="fa fa-trash" aria-hidden="true"/></Link></span></p>
          
            </div>
          ))}
           </div>  
            </div>
            </div>
  
            
      
        </div>)
    }
}export default Cars;