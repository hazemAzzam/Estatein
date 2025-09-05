import { Static, t } from "elysia";

export const SignInRequestDTO = t.Union([
  t.Object({
    username: t.String(),
    password: t.String(),
  }),
  t.Object({
    email: t.String(),
    password: t.String(),
  }),
]);
export type SignInDTO = Static<typeof SignInRequestDTO>;

export const SignUpRequestDTO = t.Object({
    username: t.String({required: true}),
    email: t.String({required: true}),
    password: t.String({required: true})
})

export type SignUpDTO = Static<typeof SignUpRequestDTO>;