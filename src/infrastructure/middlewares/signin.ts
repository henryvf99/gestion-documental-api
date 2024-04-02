import { Injectable } from "@decorators/di";
import { Middleware } from "@decorators/express";
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken"
import config from "@infrastructure/config"

@Injectable()
export class SignInMiddleware implements Middleware {
  use(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate("login", async (err, user, info) => {
      try {
        if (err || !user) {
          throw new Error(err);
        }
        req.login(user, { session: false }, async (err) => {
          if (err) return next(err);
          const body = { id: user.id, email: user.email, nombres: user.nombres, apellidos: user.apellidos, rol: user.rol };

          const token = jwt.sign({ user: body }, config.JWT_SECRET, {
            expiresIn: "3h",
          });
          return res.json({ success: true, message: info.message, user: body, token });
        });
      } catch (e) {
        return next(e);
      }
    })(req, res, next);
  }
}