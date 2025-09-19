import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmZjMzJhOGY4MDY5ZDQ1MzFlN2UzOTI4MDUwNjgyYyIsIm5iZiI6MTc1NTM1MDIyMi4yNTMsInN1YiI6IjY4YTA4NGNlYTlmOTQwZjBmMDYzMWY5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.puKa_E2liClZZAJ0Ji4go6y-V1Ud7nxJvASCBXWUJZU`
  }
});

export default instance;
