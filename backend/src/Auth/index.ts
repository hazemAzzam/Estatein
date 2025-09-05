import { Elysia, file,t } from 'elysia'
import { HttpErrorLogger } from "../lib/logger";
import { SignInRequestDTO, SignUpRequestDTO } from "./auth.dtos";

import { signIn , signUp} from "./auth.service";
import { jwt } from '@elysiajs/jwt'

const auth = new Elysia({ prefix: '/auth'})
    .use(jwt({name: "jwt",secret: "Mohamed1234!@#$A" ,typ: "JWT"})) // no expire
    .post("/login", ({ body,jwt,cookie:{ auth } }) => signIn(body,jwt,auth), {
        body: SignInRequestDTO,
        // response: UserTokenDTO,
        detail: {
          description: "Sign in with email and password",
          tags: ["Auth"],
        },
      })
    .post('/register', ({ body,jwt,cookie:{ auth } }) => signUp(body,jwt,auth), {
      body: SignUpRequestDTO,
      // response: UserTokenDTO,
      detail: {
        description: "Sign up with username and password",
        tags: ["Auth"],
      },
    })
export default auth;
