import {
    type RouteConfig,
    route,
    index,
  } from "@react-router/dev/routes";
  
  export default [
    index("./routes/home.tsx"),
    route("survey", "./routes/survey.tsx"),
    route("login", "./routes/login.tsx"),
  ] satisfies RouteConfig;