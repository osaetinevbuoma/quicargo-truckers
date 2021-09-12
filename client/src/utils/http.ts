import axios from "axios";

const baseURL: string = process.env.REACT_APP_SERVER_BASE_URL as string;

const http = axios.create({ baseURL });

export default http;
