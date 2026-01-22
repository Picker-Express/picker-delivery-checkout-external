export interface DeliveryFormData {
  fullName: string;
  phoneNumber: string;
  deliveryDate: string;
}

export interface FormErrors {
  fullName?: string;
  phoneNumber?: string;
  deliveryDate?: string;
}

export interface SubmitPayload {
  sessionId: string;
  shop: string;
  fullName: string;
  phoneNumber: string;
  deliveryDate: string;
  completed: boolean;
  timestamp: number;
}
