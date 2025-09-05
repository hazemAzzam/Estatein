import Elysia from "elysia";
import  auth from "./Auth";
import  properties  from "./Properties";
import  favorites  from "./Favorites";
import  inquiries  from "./Inquiries";
import savedSearches from "./SavedSearches";

export const appRoutes = new Elysia({prefix: "/api/v1"})
  .use(auth)
  .use(properties)
  .use(favorites)
  .use(inquiries)
  .use(savedSearches);