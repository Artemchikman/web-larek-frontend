export interface APIClient {
    getData(endpoint: string): Promise<any>;
  }
  