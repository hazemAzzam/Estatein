import type { TElysiaApp } from '.'
import { treaty } from '@elysiajs/eden'

// If you are not using Next.js v15^, you may want to set revalidate value to 0 due to default caching mechanics.

// export const elysia = treaty<TElysiaApp>('localhost:3000',{
//     fetch: {
//       next:{revalidate:0}
//     },
//   })

const url = process.env.URL_DOMAIN ?? "localhost:3005"
export const elysia = treaty<TElysiaApp>(url);   

fetch ("http://localhost:3005/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({
        email: "admin@gmail.com",
        password: "123123123123",
        qweqwe:"xd"
    })
})

const { data, error } = await elysia.api.v1.auth.login.post({
    email: "admin@gmail.com",
    password: "123123123123"
})

console.log(data, error)
const { data: data2, error: error2 } = await elysia.api.v1.properties.get({
    query: {
        page: 1,
        limit: 10,
        property_type: "apartment",
        status: "for_rent",
        city: "New York",
        state: "NY",
        min_price: 100000,
        max_price: 1000000,
        min_rent: 1000,
        max_rent: 10000,
    }
})
