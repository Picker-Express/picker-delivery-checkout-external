import { LitElement, css, html, type CSSResult, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ShopifyPostMessageClient } from '../utils/postMessage';

interface PickerFormSubmitDetail {
  readonly formData: {
    readonly deliveryDate: string;
    readonly fullName: string;
    readonly phoneNumber: string;
  };
}

@customElement('picker-widget')
export class PickerWidget extends LitElement {
  public static override styles: CSSResult[] = [
    css`
      .container {
        display: grid;
        place-items: center;
        padding: 24px 16px;
      }
      .stack {
        display: grid;
        gap: 16px;
        width: 100%;
        justify-items: center;
      }
      .info-card {
        max-width: 520px;
        width: 100%;
      }
      .status {
        font-size: 14px;
        padding: 12px;
      }
      .status.success {
        color: var(--sl-color-success-600);
      }
    `
  ];

  private readonly postMessageClient = new ShopifyPostMessageClient();

  @state()
  private statusMessage = 'Completa el formulario para enviar los datos al checkout de Shopify.';

  @state()
  private isSubmitted = false;

  protected override render(): TemplateResult {
    return html`
      <div class="container">
        <div class="stack" @picker-form-submit=${this.handleFormSubmit}>
          <sl-card class="info-card">
            <div slot="header">
              <sl-icon name="truck"></sl-icon>
              Widget de Entrega
            </div>
            Este formulario captura los datos de entrega y los envía automáticamente a Shopify.
          </sl-card>

          <picker-form></picker-form>

          <sl-card class="status ${this.isSubmitted ? 'success' : ''}">
            <strong>Estado:</strong> ${this.statusMessage}
          </sl-card>
        </div>
      </div>
    `;
  }

  private handleFormSubmit(event: Event): void {
    if (!(event instanceof CustomEvent)) {
      return;
    }

    const customEvent = event as CustomEvent<PickerFormSubmitDetail>;
    const { formData } = customEvent.detail;

    // Enviar datos a Shopify vía postMessage
    this.postMessageClient.send({
      deliveryDate: formData.deliveryDate,
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber
    });

    // Actualizar estado
    this.isSubmitted = true;
    this.statusMessage = '✅ Datos enviados correctamente. Puedes cerrar esta ventana.';

    // Opcional: cerrar ventana automáticamente después de 2 segundos
    setTimeout(() => {
      if (window.opener) {
        window.close();
      }
    }, 2000);
  }
}