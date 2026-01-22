import { ChangeEvent, FormEvent, useState } from 'react';
import { DeliveryFormData, FormErrors } from '../types';
import { FormValidator } from '../utils/validation';

interface PickerFormProps {
  onSubmit: (data: DeliveryFormData) => Promise<void>;
  isSubmitting: boolean;
}

export function PickerForm({ onSubmit, isSubmitting }: PickerFormProps) {
  const [formData, setFormData] = useState<DeliveryFormData>({
    fullName: '',
    phoneNumber: '',
    deliveryDate: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = FormValidator.validate(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    }
  };

  const handleReset = () => {
    setFormData({ fullName: '', phoneNumber: '', deliveryDate: '' });
    setErrors({});
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-picker-primary to-picker-primary-hover px-6 py-6">
        <div className="flex items-center gap-3">
          <img
            src="https://img.notionusercontent.com/ext/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fpublic.notion-static.com%2Ff2200517-b16a-418c-a785-0d342e5317d4%2Ficon_512x512.png/size/w=120?exp=1769094537&sig=Vx_wuU7iV3R95uW1sIY2Ccw56rfNmEJVtK8PkKGOEvg&userId=cbfd78e9-e3f0-4c07-9495-3336c2ed620c"
            alt="Picker"
            className="w-10 h-10 rounded-full bg-white p-1"
          />
          <h2 className="text-xl font-bold text-white">Datos de entrega</h2>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Nombre completo */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre completo *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3.5 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Juan Pérez García"
              className={`input-field pl-11 ${errors.fullName ? 'input-field-error' : ''}`}
              disabled={isSubmitting}
            />
          </div>
          {errors.fullName && (
            <p className="mt-1.5 text-sm text-red-600">{errors.fullName}</p>
          )}
          {!errors.fullName && (
            <p className="mt-1.5 text-xs text-gray-500">Nombre del destinatario</p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
            Teléfono *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3.5 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="55 1234 5678"
              className={`input-field pl-11 ${errors.phoneNumber ? 'input-field-error' : ''}`}
              disabled={isSubmitting}
            />
          </div>
          {errors.phoneNumber && (
            <p className="mt-1.5 text-sm text-red-600">{errors.phoneNumber}</p>
          )}
          {!errors.phoneNumber && (
            <p className="mt-1.5 text-xs text-gray-500">10 dígitos mínimo</p>
          )}
        </div>

        {/* Fecha de entrega */}
        <div>
          <label htmlFor="deliveryDate" className="block text-sm font-semibold text-gray-700 mb-2">
            Fecha de entrega *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3.5 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              type="date"
              id="deliveryDate"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              className={`input-field pl-11 ${errors.deliveryDate ? 'input-field-error' : ''}`}
              disabled={isSubmitting}
            />
          </div>
          {errors.deliveryDate && (
            <p className="mt-1.5 text-sm text-red-600">{errors.deliveryDate}</p>
          )}
          {!errors.deliveryDate && (
            <p className="mt-1.5 text-xs text-gray-500">Selecciona cuándo quieres recibir tu pedido</p>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary flex-1"
            disabled={isSubmitting}
          >
            Limpiar
          </button>
          <button
            type="submit"
            className="btn-primary flex-1 flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Guardando...
              </>
            ) : (
              'Guardar datos'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
