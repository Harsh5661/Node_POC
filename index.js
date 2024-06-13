const express = require("express");
const empGroupRoute = require('./routes/empGroupRoute');
const dbManagementServices = require('./DB-Manager/fileServices');
const app = express();
const PORT = 1000;
app.use(express.json());

const dataSource = process.env.DATA_SOURCE || 'json'; // Set data source from environment variable or default to 'json'
dbManagementServices.setDataSource(dataSource);

app.use("/EDPortal", empGroupRoute);

app.listen(PORT, ()=>{
    console.log(`Server is started on port: ${PORT}`);
    console.log(`Using data source: ${dataSource}`);
})

