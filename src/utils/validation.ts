type PickerFormField = 'fullName' | 'phoneNumber' | 'deliveryDate';

type PickerFormErrors = Partial<Record<PickerFormField, string>>;

interface PickerFormData {
  readonly fullName: string;
  readonly phoneNumber: string;
  readonly deliveryDate: string;
}

interface PickerFormValidationResult {
  readonly isValid: boolean;
  readonly errors: PickerFormErrors;
}

export class PickerFormValidator {
  /**
   * Validates user inputs for the picker form.
   */
  public validate(inputData: PickerFormData): PickerFormValidationResult {
    const errors: PickerFormErrors = {};
    const normalizedFullName: string = inputData.fullName.trim();
    const normalizedPhoneNumber: string = inputData.phoneNumber.trim();
    const normalizedDeliveryDate: string = inputData.deliveryDate.trim();
    if (normalizedFullName.length === 0) {
      errors.fullName = 'El nombre es obligatorio.';
    }
    if (normalizedPhoneNumber.length === 0) {
      errors.phoneNumber = 'El teléfono es obligatorio.';
    }
    if (!this.isPhoneNumberValid(normalizedPhoneNumber)) {
      errors.phoneNumber = 'El teléfono no es válido.';
    }
    if (normalizedDeliveryDate.length === 0) {
      errors.deliveryDate = 'La fecha es obligatoria.';
    }
    if (!this.isIsoDateValid(normalizedDeliveryDate)) {
      errors.deliveryDate = 'La fecha no es válida.';
    }
    return { isValid: Object.keys(errors).length === 0, errors };
  }

  private isPhoneNumberValid(phoneNumber: string): boolean {
    if (phoneNumber.length === 0) {
      return true;
    }
    const phonePattern: RegExp = /^[+()\d\s-]{7,}$/;
    return phonePattern.test(phoneNumber);
  }

  private isIsoDateValid(isoDate: string): boolean {
    if (isoDate.length === 0) {
      return true;
    }
    const isoDatePattern: RegExp = /^\d{4}-\d{2}-\d{2}$/;
    if (!isoDatePattern.test(isoDate)) {
      return false;
    }
    const parsedTime: number = Date.parse(isoDate);
    return Number.isFinite(parsedTime);
  }
}

