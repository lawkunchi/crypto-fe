import { ApiService } from "./ApiService";

class AuthService extends ApiService {

  constructor(baseURL: string) {
    super(baseURL);

    const token = localStorage.getItem("authToken");
    if (token) {
      this.setAuthToken(token);
    }
  }

  public setAuthToken(token: string) {
    localStorage.setItem("authToken", token);
    this.setDefaultHeader("Authorization", `Bearer ${token}`);
  }

  public clearAuthToken() {
    // delete this.axiosInstance.defaults.headers.common["Authorization"];
    // localStorage.removeItem('authToken');
  }

  public async login(email: string, password: string): Promise<any> {
    const response = await super.post("/auth/login", { email, password });
    if (response?.accessToken) {
      const token = response?.accessToken;
      this.setAuthToken(token);
    }
    return response;
  }

  public async me(): Promise<any> {
    return await super.get("/auth/user", {});
  }

  public register(name: string, email: string, password: string): Promise<any> {
    return super.post("/auth/register", { name, email, password });
  }

  public async logout(): Promise<any> {
    await super.get("/auth/logout");
    this.clearAuthToken();
  }

}

export const authService = new AuthService();
