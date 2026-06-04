import dotenv from 'dotenv'; // external package and object config metodi borligi u/n
dotenv.config(); // environment variablesni ishga tushurib yuklab beradi

import mongoose from 'mongoose'; // external package object beradi connect metodi borligi u/n

import server from "./app";

mongoose
.connect(process.env.MONGO_URL as string, {}) // connect metodi mongoDB ga ulanishni amalga oshiradi. TCP hosil qiladi Transmission Control Protocol
.then((data) => {
  console.log("MongoDB connection succeed");
  const PORT = process.env.PORT ?? 3003;
  server.listen(PORT, function () {
    console.info(`The server is running successfully on port: ${PORT}`);
    console.info(`Admin project on http://localhost:${PORT}/admin \n`);
  })
})
.catch((err) => console.log('ERROR on connection MongoDB', err));



