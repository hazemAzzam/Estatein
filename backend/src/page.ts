import { elysia } from "./client";
const { data, error } = await elysia.api.v1.auth.login.post({
  // username: "admin",
  email: "admin@gmail.com",
  password: "123123123123",
})
