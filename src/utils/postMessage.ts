interface ShopifyPostMessagePayload {
  readonly deliveryDate: string;
  readonly fullName: string;
  readonly phoneNumber: string;
}

interface ShopifyPostMessageEnvelope {
  readonly source: 'picker-widget-hosted';
  readonly type: 'PICKER_WIDGET_SUBMIT';
  readonly payload: ShopifyPostMessagePayload;
}

type ShopifyMessageHandler = (envelope: ShopifyPostMessageEnvelope) => void;

export class ShopifyPostMessageClient {
  /**
   * Sends the widget payload to the parent window (e.g. Shopify Checkout).
   */
  public send(inputPayload: ShopifyPostMessagePayload, targetOrigin: string = '*'): void {
    const envelope: ShopifyPostMessageEnvelope = {
      source: 'picker-widget-hosted',
      type: 'PICKER_WIDGET_SUBMIT',
      payload: inputPayload
    };
    window.parent.postMessage(envelope, targetOrigin);
  }

  /**
   * Subscribes to messages from the parent window and filters them by source/type.
   */
  public subscribe(handler: ShopifyMessageHandler): () => void {
    const messageListener: (event: MessageEvent<unknown>) => void = (event: MessageEvent<unknown>) => {
      const envelope: ShopifyPostMessageEnvelope | null = this.parseEnvelope(event.data);
      if (envelope === null) {
        return;
      }
      handler(envelope);
    };
    window.addEventListener('message', messageListener);
    return (): void => {
      window.removeEventListener('message', messageListener);
    };
  }

  private parseEnvelope(inputData: unknown): ShopifyPostMessageEnvelope | null {
    if (typeof inputData !== 'object' || inputData === null) {
      return null;
    }
    const recordData: Record<string, unknown> = inputData as Record<string, unknown>;
    if (recordData.source !== 'picker-widget-hosted') {
      return null;
    }
    if (recordData.type !== 'PICKER_WIDGET_SUBMIT') {
      return null;
    }
    const payloadData: unknown = recordData.payload;
    if (typeof payloadData !== 'object' || payloadData === null) {
      return null;
    }
    const payloadRecord: Record<string, unknown> = payloadData as Record<string, unknown>;
    if (typeof payloadRecord.deliveryDate !== 'string') {
      return null;
    }
    if (typeof payloadRecord.fullName !== 'string') {
      return null;
    }
    if (typeof payloadRecord.phoneNumber !== 'string') {
      return null;
    }
    return {
      source: 'picker-widget-hosted',
      type: 'PICKER_WIDGET_SUBMIT',
      payload: {
        deliveryDate: payloadRecord.deliveryDate,
        fullName: payloadRecord.fullName,
        phoneNumber: payloadRecord.phoneNumber
      }
    };
  }
}

