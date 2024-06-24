import { ApiService } from "./ApiService";

class AuthService extends ApiService {
  private authToken: string | null = null;

  constructor(baseURL: string) {
    super(baseURL);
    const token = localStorage.getItem("authToken");
    if (token) {
      this.setAuthToken(token);
    }
  }

  public setAuthToken(token: string) {
    this.authToken = token;
    this.setDefaultHeader("Authorization", `Bearer ${token}`);
  }

  public clearAuthToken() {
    this.authToken = null;
    delete this.axiosInstance.defaults.headers.common["Authorization"];
    localStorage.removeItem('authToken');
  }

  public async login(email: string, password: string): Promise<any> {
    const response = await super.post("/auth/login", { email, password });
    console.log(response);
    if (response.accessToken) {
      const token = response.accessToken;
      localStorage.setItem("authToken", token);
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
    await super.post("/auth/logout", { email, password });
    this.clearAuthToken();
  }

}

export const authService = new AuthService();
