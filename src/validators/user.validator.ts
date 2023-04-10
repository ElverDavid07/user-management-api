import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../errors/errorValidator";

const userValidator = [
  check("name")
    //validador personalizado para que el nombre no tenga mucho espacios ejemplo juan    carlos
    .custom((value: string) => {
      const trimmedValue = value.replace(/\s+/g, " ").trim();
      if (trimmedValue !== value) {
        throw new Error("El nombre no debe contener espacios adicionales.");
      }
      return true;
    })
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre tiene que ser igual o mayor a 3 caracteres")
    .exists()
    .not()
    .isEmpty()
    .isString(),
  check("email")
    .trim()
    .isEmail()
    .withMessage('El correo electrónico no es válido.')
    .not()
    .isEmpty()
    .normalizeEmail()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage("El correo electrónico debe tener un formato válido."),
  check("password")
    .trim()
    .isString()
    .isLength({ min: 4 })
    .withMessage("la contraseña tiene que ser mayor a 4 digitos"),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export { userValidator };
