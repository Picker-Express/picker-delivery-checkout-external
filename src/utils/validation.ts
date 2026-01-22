import { DeliveryFormData, FormErrors } from '../types';

export class FormValidator {
  static validate(data: DeliveryFormData): { isValid: boolean; errors: FormErrors } {
    const errors: FormErrors = {};

    // Validar nombre completo
    if (!data.fullName.trim()) {
      errors.fullName = 'El nombre es requerido';
    } else if (data.fullName.trim().length < 3) {
      errors.fullName = 'El nombre debe tener al menos 3 caracteres';
    }

    // Validar teléfono
    if (!data.phoneNumber.trim()) {
      errors.phoneNumber = 'El teléfono es requerido';
    } else {
      const phoneRegex = /^[0-9]{10,}$/;
      const cleanPhone = data.phoneNumber.replace(/\s+/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        errors.phoneNumber = 'El teléfono debe tener al menos 10 dígitos';
      }
    }

    // Validar fecha
    if (!data.deliveryDate) {
      errors.deliveryDate = 'La fecha de entrega es requerida';
    } else {
      const selectedDate = new Date(data.deliveryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        errors.deliveryDate = 'La fecha debe ser hoy o posterior';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}
