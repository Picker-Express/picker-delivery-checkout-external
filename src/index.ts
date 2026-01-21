import { PickerForm } from './components/PickerForm';
import { PickerWidget } from './components/PickerWidget';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

const pickerFormTagName: string = 'picker-form';
const pickerWidgetTagName: string = 'picker-widget';

setBasePath('/node_modules/@shoelace-style/shoelace/dist');

if (!customElements.get(pickerFormTagName)) {
  customElements.define(pickerFormTagName, PickerForm);
}

if (!customElements.get(pickerWidgetTagName)) {
  customElements.define(pickerWidgetTagName, PickerWidget);
}