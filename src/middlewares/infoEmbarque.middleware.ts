import { RequestHandler } from "express";

const middlewareInfo: RequestHandler = async ({ body }, res, next) => {
 const { cajasEnviadas, cajasRechazadas, precioEnDolar, precioEnPesos } = body;
 const cajasResividas = cajasEnviadas - cajasRechazadas;
 const dineroTotalEnDolars = cajasResividas * precioEnDolar;
 const dineroTotalEnPesos = cajasResividas * precioEnPesos;
 body.cajasResividas = cajasResividas;
 body.dineroTotalEnDolar = dineroTotalEnDolars;
 body.dineroTotalEnPesos = dineroTotalEnPesos;

 next();
};

export { middlewareInfo };
