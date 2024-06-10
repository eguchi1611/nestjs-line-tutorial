import {
  ArticlesApi,
  AuthApi,
  Configuration,
  UsersApi,
} from "@nestjs-line-tutorial/api-client";
import axios from "axios";

const apiConfig = new Configuration({
  basePath: process.env.NEXT_PUBLIC_API_URL || "",
});

export const instance = axios.create({});

export const usersApi = new UsersApi(apiConfig, "", instance);
export const articlesApi = new ArticlesApi(apiConfig, "", instance);
export const authApi = new AuthApi(apiConfig, "", instance);
