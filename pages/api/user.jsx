import axios from "axios";

// declaring the services url (if using microservices)
// const example_service_url = "https://example.com/api/";
const service_random_user = "https://randomuser.me/api";

// declaring the endpoint , (for handling if 1 services has multiple endpoints)
// export const EXAMPLE_URL = `${example_service_url}/user`;
// export const EXAMPLE_URL2 = `${example_service_url}/role`;
export const USER_URL = `${service_random_user}`;

// declaring the fetching function
export function getUserByFilter(params = "") {
  return axios.get(`${USER_URL}/${params}`);
}
