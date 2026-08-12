import express from 'express';
import "dotenv/config" //call the config module (for real i need to ask what the config is tho!)
// const express = require ('express');
const app = express();
const PORT = process.env.PORT;  

console.log(process.env.DB_URL);

//note one of the best practices is to put the pot nu in the .env and import it here
app.listen(PORT, () => console.log("server is up and  running on this PORT:", PORT ));

