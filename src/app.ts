import cors from 'cors';
import express from 'express';
import path from 'path';
import router from './router';
import routerAdmin from './router-admin';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { MOORGAN_FORMAT } from './libs/config';

import session from 'express-session';
import ConnectMongoDB from 'connect-mongodb-session';
import { T } from './libs/types/common';
import {Server as SocketServer} from 'socket.io';
import http from 'http';

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL), // url + urn = uri
  collection: 'sessions',
});
// session middleware -> cookies ichidagi sidni db dan qidirib agar bo'lsa solishtirib

/* 1-ENTRANCE */

const app = express();
app.use(express.static(path.join(__dirname, "public"))); // Middleware DP --> Traditional API -> publicni tashqi olamga ochiqlaydi
app.use("/uploads", express.static("./uploads"));
app.use(express.urlencoded({extended: true})); // Middleware DP --> Traditional API
app.use(express.json());  // Middleware DP --> Rest API
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());
app.use(morgan(MOORGAN_FORMAT)); // Middleware DP --> Rest API

/* 2-SESSIONS */
// Authentication [TAMG'A] vs Authorization [TAMG'A + HUQUQ]

app.use(
  session({
    secret: String(process.env.SESSION_SECRET), // must be secret
    cookie: {
      maxAge: 1000 * 3600 * 6 // 6h
    },
    store: store, // for going sessions collection
    resave: true, // 10:30 auth => 13:30 12:00 => 15:30 renew if true
    saveUninitialized: true, // just pasting session data to db if true
  })
);
//web serverga kirib kelayotgan har bir requestni ichiga sessionni joylab beradi. Cookieda sid bolganda, sidni shu middleware orqali tekshirib agar bolsa databasedagi datalarni sessionni ichiga yuklab beradi.

app.use(function(req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member; // Global
  next();
});
// sessionda ma'lumotlar bo'lmasa undefined qilib beradi, agar member ma'lumotlari bolsa locals degan storagega tenglab beradi

/* 3-VIEWS */
app.set('views', path.join(__dirname, "views"));
app.set("view engine", "ejs");

/* 4-ROUTERS */
app.use('/admin', routerAdmin);  // SSR: EJS
app.use('/', router);  // Middleware DP REACT Rest API

const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: true,
    credentials: true,
  }
});

let summaryClient = 0;  
io.on("connection", (socket) => {
  summaryClient++;
  console.log(`Client connected, total clients: ${summaryClient}`);

  socket.on("disconnect", () => {
    summaryClient--;
    console.log("Client disconnected");
  });
});

export default server;     // module.exports = app; 
// export default -> nomini o'zgartirib import qilish mumkin
// export -> nomini o'zgartirib import qilish mumkin emas
