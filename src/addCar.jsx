import React ,{Component} from "react";
import http from "./httpService"
class AddCar extends Component{
    state={
      cars:{id:"",price:"",year:"",kms:"",model:"",color:""},
      carMasterData: [],
      loadingCarMasterData: true,
      edit:false
    }

    async componentDidMount(){
        await this.fetchCarMasterData();
        this.fetchData();
    }
    async componentDidUpdate(prevProps,prevState){
        if(prevProps !==this.props) this.fetchData();
    }
    async fetchCarMasterData() {
        try {
            const response = await http.get("/carsMaster"); 
            const carMasterData = response.data;
            this.setState({ carMasterData, loadingCarMasterData: false });
        } catch (error) {
            console.error("Error fetching car master data:", error);
            this.setState({ loadingCarMasterData: false });
        }
    }
    async fetchData(){
        const {id}=this.props.match.params;
        if(id){
            let response=await http.get(`/cars/${id}`)
            let {data}=response;
            this.setState({cars:data,edit:true});
        }
        else {
            let cars={name:"",age:"",city:"",gender:"",payment:""};
            this.setState({cars:cars,edit:false});
        }
    }
handleChange=(e)=>{
    const {currentTarget:input}=e;
    let s1={...this.state};
    s1.cars[input.name]=input.value;
    this.setState(s1);
}
async postData(url,obj){
    let response=await http.post(url,obj)
    console.log(response);
    this.props.history.push("/cars")
}
async putData(url,obj){
    let response=await http.put(url,obj)
    console.log(response);
    this.props.history.push("/cars")
}
handleSubmit=(e)=>{
    e.preventDefault();

    let {cars,edit}=this.state;
    edit ? this.putData(`/cars/${cars.id}`,cars)&& alert("Car is Edited successfully")
    :this.postData("/cars",cars) && alert("Car is inserted");

}
render (){
    let {id,price,year,kms,model,color}=this.state.cars;
    let{carMasterData}=this.state;
    const selectedCarModel = carMasterData.find(car => car.model === model);
    const availableColors = selectedCarModel ? selectedCarModel.colors : [];


    return (
        <div className="container">
            <h4 style={{textAlign:"center"}}> Car Details</h4>
            <div className="form-group">
                <label> ID</label>
                <input 
                type="text"
                className="form-control"
                disabled={this.state.edit}
                id="id"
                name="id"
                value={id}
                onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label> Price</label>
                <input 
                type="text"
                className="form-control"
                id="price"
                name="price"
                value={price}
                onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label> Mileage in kms</label>
                <input 
                type="text"
                className="form-control"
                id="kms"
                name="kms"
                value={kms}
                onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label> Year of Manufacture</label>
                <input 
                type="text"
                className="form-control"
                id="year"
                name="year"
                value={year}
                onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label> Model</label>
                <select
                name="model"
                className="form-select"
                value={model}
                onChange={this.handleChange}
                id="model"
              >
                <option value="">Select model</option>
                 {carMasterData.map((car) => (
                <option key={car.model} value={car.model}>
                {car.model}
            </option>
              ))}
              </select>
             </div>
             <div className="form-group">
                <label> Color</label>
                <select
                    name="color"
                    className="form-select"
                    value={color}
                    onChange={this.handleChange}
                    id="color"
                >
                    <option value="">Select Color</option>
                    {availableColors.map((clr) => (
                        <option key={clr} value={clr}>
                            {clr}
                        </option>
                    ))}
                </select>
            </div>
          
<button className="btn btn-primary" onClick={this.handleSubmit}>Submit </button>           

        </div>
    )
}
}export default AddCar