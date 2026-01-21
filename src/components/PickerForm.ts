import { LitElement, css, html, type CSSResult, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PickerFormValidator } from '../utils/validation';

interface PickerFormData {
  readonly fullName: string;
  readonly phoneNumber: string;
  readonly deliveryDate: string;
}

type PickerFormField = 'fullName' | 'phoneNumber' | 'deliveryDate';

type PickerFormErrors = Partial<Record<PickerFormField, string>>;

interface PickerFormSubmitDetail {
  readonly formData: PickerFormData;
}

interface PickerFormInputTarget {
  readonly name: string;
  readonly value: string;
}

@customElement('picker-form')
export class PickerForm extends LitElement {
  public static override styles: CSSResult[] = [
    css`
      form {
        display: grid;
        gap: 12px;
        margin: 0;
      }
      sl-card {
        width: 100%;
        max-width: 520px;
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 6px;
      }
    `
  ];

  private readonly validator: PickerFormValidator = new PickerFormValidator();

  @state()
  private formData: PickerFormData = {
    fullName: '',
    phoneNumber: '',
    deliveryDate: ''
  };

  @state()
  private errors: PickerFormErrors = {};

  protected override render(): TemplateResult {
    return html`
      <sl-card>
        <div slot="header">Datos de entrega</div>
        <form @submit=${this.handleSubmit}>
          <sl-input
            name="fullName"
            label="Nombre completo"
            autocomplete="name"
            .value=${this.formData.fullName}
            .helpText=${this.getErrorText('fullName')}
            ?invalid=${this.isFieldInvalid('fullName')}
            required
            @sl-input=${this.handleInput}
          ></sl-input>
          
          <sl-input
            name="phoneNumber"
            label="Teléfono"
            type="tel"
            autocomplete="tel"
            inputmode="tel"
            .value=${this.formData.phoneNumber}
            .helpText=${this.getErrorText('phoneNumber')}
            ?invalid=${this.isFieldInvalid('phoneNumber')}
            required
            @sl-input=${this.handleInput}
          ></sl-input>
          
          <sl-input
            name="deliveryDate"
            label="Fecha de entrega"
            type="date"
            .value=${this.formData.deliveryDate}
            .helpText=${this.getErrorText('deliveryDate')}
            ?invalid=${this.isFieldInvalid('deliveryDate')}
            required
            @sl-input=${this.handleInput}
          ></sl-input>
          
          <div class="actions">
            <sl-button type="button" variant="default" @click=${this.handleReset}>
              Limpiar
            </sl-button>
            <sl-button type="submit" variant="primary">
              Guardar
            </sl-button>
          </div>
        </form>
      </sl-card>
    `;
  }

  private handleInput(event: Event): void {
    const targetInput = this.getInputTarget(event);
    if (!targetInput || !this.isFieldNameSupported(targetInput.name)) {
      return;
    }

    this.formData = { 
      ...this.formData, 
      [targetInput.name]: targetInput.value 
    };

    // Limpiar error del campo si existe
    if (this.errors[targetInput.name]) {
      this.errors = { 
        ...this.errors, 
        [targetInput.name]: undefined 
      };
    }
  }

  private handleReset(): void {
    this.formData = { fullName: '', phoneNumber: '', deliveryDate: '' };
    this.errors = {};
  }

  private handleSubmit(event: SubmitEvent): void {
    event.preventDefault();

    const validationResult = this.validator.validate(this.formData);

    if (!validationResult.isValid) {
      this.errors = validationResult.errors;
      return;
    }

    const detail: PickerFormSubmitDetail = {
      formData: {
        fullName: this.formData.fullName.trim(),
        phoneNumber: this.formData.phoneNumber.trim(),
        deliveryDate: this.formData.deliveryDate.trim()
      }
    };

    this.dispatchEvent(
      new CustomEvent<PickerFormSubmitDetail>('picker-form-submit', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  private getInputTarget(event: Event): PickerFormInputTarget | null {
    const target = event.target as Partial<PickerFormInputTarget>;
    
    if (typeof target.name !== 'string' || typeof target.value !== 'string') {
      return null;
    }

    return { name: target.name, value: target.value };
  }

  private getErrorText(fieldName: PickerFormField): string {
    return this.errors[fieldName] ?? '';
  }

  private isFieldInvalid(fieldName: PickerFormField): boolean {
    return this.errors[fieldName] !== undefined;
  }

  private isFieldNameSupported(fieldName: string): fieldName is PickerFormField {
    return fieldName === 'fullName' || fieldName === 'phoneNumber' || fieldName === 'deliveryDate';
  }
}