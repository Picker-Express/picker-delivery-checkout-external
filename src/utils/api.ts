import { SubmitPayload } from '../types';

const BACKEND_URL = 'https://dev-apps.pickerexpress.com/booking-service';

export class ApiService {
  static async saveDeliveryData(payload: SubmitPayload): Promise<any> {
    const response = await fetch(`${BACKEND_URL}/api/save-delivery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }
}
