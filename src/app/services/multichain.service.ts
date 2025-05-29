import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MultiChainService {
  private apiUrl = 'http://localhost:5232/api/Multichain';

  async getBlockchainInfo(): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/getinfo`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blockchain info:', error);
      throw error;
    }
  }
}
