import logger, { HttpErrorLogger } from "@/lib/logger";
import { HttpError } from "elysia-http-error";
import { Cookie } from "elysia";
import type { SignUpDTO } from "./auth.dtos";
import { SignInDTO } from "./auth.dtos";
import { AuthRepository } from "./auth.repository";

const secret = Buffer.from(process.env.PASSWORD || "");
export const signIn = async (
    body: SignInDTO,
    jwt: any,
    auth: Cookie<string | undefined>,
) => {
    if ('email' in body) {
        logger.info(`🦊 ${body.email} is trying to sign in by email`);

        const user = await AuthRepository.findOneByEmail(body);
        if (!user) throw HttpErrorLogger(HttpError.NotFound("User does not exist")) 
        const verifypass = await Bun.password.verify(user.password_hash, body.password);
        if (!verifypass) throw HttpErrorLogger(HttpError.Unauthorized("Invalid username or password"));
        const jwtToken = await jwt.sign({
            id: user.id,
            email: user.email,
        });
        auth.set({
            value: jwtToken,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 400), // 400 days From now
            // httpOnly: true,
            path: "/",
            sameSite: "lax",
            // secure: false,
            // domain: "127.0.0.1",
        });
        logger.info(`🦊 ${body.email} has Signed in`);
        return {
            content: {
                id: user.id,
                email: user.email,
            },
        };
    }else if ('username' in body) {
        logger.info(`🦊 ${body.username} is trying to sign in by username`);
        const user = await AuthRepository.findOneByUsername(body);
        if (!user) throw HttpErrorLogger(HttpError.NotFound("User does not exist")) 
        const verifypass = await Bun.password.verify(user.password_hash, body.password);
        if (!verifypass) throw HttpErrorLogger(HttpError.Unauthorized("Invalid username or password"));
        const jwtToken = await jwt.sign({
            id: user.id,
            email: user.email,
        });
        auth.set({
            value: jwtToken,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 400), // 400 days From now
            // httpOnly: true,
            path: "/",
            sameSite: "lax",
            // secure: false,
            // domain: "127.0.0.1",
        });
        logger.info(`🦊 ${body.username} has Signed in`);
        return {
            content: {
                id: user.id,
                email: user.email,
            },
        };
    }
};
export const signUp = async (
    body: SignUpDTO,
    jwt: any,
    auth: Cookie<string | undefined>,
) => {
    logger.info(`🦊 ${body.email} is trying to sign up`);
    const user = await AuthRepository.findOneByEmail(body);
    if (user) throw HttpError.Conflict("User already exists");
    const password_hash = await Bun.password.hash(body.password);
    const new_user = await AuthRepository.create({ ...body, password_hash });
    const jwtToken = await jwt.sign({
        id: new_user.id,
        email: new_user.email,
    });
    auth.set({
        value: jwtToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 400), // 400 days From now
        // httpOnly: true,
        path: "/",
        sameSite: "lax",
        // secure: false,
        // domain: "127.0.0.1",
    });
    logger.info(`🦊 ${new_user.email} has Signed up`);

    return {
        content: {
            id: new_user.id,
        },
    };
};