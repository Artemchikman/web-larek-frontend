export class APIClient {
    private baseUrl: string;
  
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
  
    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
      const url = new URL(`${this.baseUrl}/${endpoint}`);
      if (params) {
        Object.keys(params).forEach(key => url.searchParams.append(key, String(params[key])));
      }
      const response = await fetch(url.toString());
      return response.json();
    }
  
    async post<T>(endpoint: string, data: object): Promise<T> {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    }
  }
  