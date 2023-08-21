const express = require('express');


const app = express();
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
    
  const { carMasterData, carsData } = require('./carsData');
app.get('/carsMaster', (req, res) => {
    res.json(carMasterData);

})
app.get('/cars', (req, res) => {
    let filteredCars = [...carsData];

    const { type, fuel, maxprice, minprice, sort } = req.query;

    if (type) {
        filteredCars = filteredCars.filter(car => carMasterData.find(master => master.model === car.model).type === type);
    }

    if (fuel) {
        filteredCars = filteredCars.filter(car => carMasterData.find(master => master.model === car.model).fuel === fuel);
    }

    if (maxprice) {
        filteredCars = filteredCars.filter(car => car.price <= parseFloat(maxprice));
    }

    if (minprice) {
        filteredCars = filteredCars.filter(car => car.price >= parseFloat(minprice));
    }

    if (sort === 'kms') {
        filteredCars.sort((a, b) => a.kms - b.kms);
    } else if (sort === 'price') {
        filteredCars.sort((a, b) => a.price - b.price);
    }

    res.json(filteredCars);
});
app.get('/cars/:id', (req, res) => {
    const carId = req.params.id;

    const car = carsData.find(cars => cars.id === carId);

    if (!car) {
        res.status(404).json({ message: 'car not found' });
    } else {
        res.json(car);
    }
});


app.post('/cars', (req, res) => {
    const newCars = req.body;
    carsData.push(newCars);
    res.status(201).json({ message: 'Car added successfully' });
});


app.put('/cars/:id', (req, res) => {
    const carId = req.params.id;
    const updatedCar = req.body;

    const carIndex = carsData.findIndex(cars => cars.id === carId);

    if (carIndex === -1) {
        res.status(404).json({ message: 'Car not found' });
    } else {
        carsData[carIndex] = updatedCar;
        res.json({ message: 'Car updated successfully' });
    }
});


app.delete('/cars/:id', (req, res) => {
    const carId = req.params.id;

    const carIndex = carsData.findIndex(cars => cars.id === carId);

    if (carIndex === -1) {
        res.status(404).json({ message: 'Car not found' });
    } else {
        carsData.splice(carIndex, 1);
        res.json({ message: 'Car deleted successfully' });
    }
});

const PORT = 2410;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
