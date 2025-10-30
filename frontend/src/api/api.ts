import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000/",
  timeout: 3000,
});

export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsIm5hbWUiOiJSYXF1ZWwgU2lsdmEiLCJzdGF0dXMiOnRydWUsImlzR2xvYmFsIjp0cnVlLCJqdGkiOiI1NzZhY2VhMS00MGI3LTRjNWQtOTFjNi1lY2U1NmFmNDM0ZWMiLCJpYXQiOjE3NjE4Mjg5NzgsImV4cCI6MTc2MTg3MjE3OH0.kpZIrhbUKrqDRozal0Tc6ZfXy_nyU2r_PjOyHEBiurk";
