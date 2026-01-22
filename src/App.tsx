import { useState } from 'react';
import { PickerForm } from './components/PickerForm';
import { SuccessScreen } from './components/SuccessScreen';
import { DeliveryFormData } from './types';
import { ApiService } from './utils/api';

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Obtener parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session') || `session_${Date.now()}`;
  const shop = urlParams.get('shop') || '';

  const handleSubmit = async (formData: DeliveryFormData) => {
    setIsSubmitting(true);

    try {
      console.log('📦 Enviando datos:', formData);
      console.log('🔑 SessionId:', sessionId);
      console.log('🏪 Shop:', shop);

      await ApiService.saveDeliveryData({
        sessionId,
        shop,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        deliveryDate: formData.deliveryDate,
        completed: true,
        timestamp: Date.now(),
      });

      console.log('✅ Datos guardados exitosamente');
      setIsSuccess(true);

    } catch (error) {
      console.error('❌ Error al guardar:', error);
      alert('Error al guardar los datos. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <img
            src="https://img.notionusercontent.com/ext/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fpublic.notion-static.com%2Ff2200517-b16a-418c-a785-0d342e5317d4%2Ficon_512x512.png/size/w=120?exp=1769094537&sig=Vx_wuU7iV3R95uW1sIY2Ccw56rfNmEJVtK8PkKGOEvg&userId=cbfd78e9-e3f0-4c07-9495-3336c2ed620c"
            alt="Picker Express"
            className="w-20 h-20 mx-auto mb-4 drop-shadow-lg"
          />
          <h1 className="text-3xl font-bold text-picker-primary mb-2">
            Picker Express
          </h1>
          <p className="text-gray-600">Completa tus datos de entrega</p>
        </div>

        {/* Banner informativo */}
        <div className="mb-6 bg-white rounded-lg p-4 border-l-4 border-picker-primary shadow-sm animate-slide-in">
          <p className="text-sm text-gray-600 flex items-start gap-2">
            <svg className="w-5 h-5 text-picker-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <span>Este formulario captura los datos de entrega y los envía automáticamente a Shopify.</span>
          </p>
        </div>

        {/* Formulario o pantalla de éxito */}
        <div className="animate-slide-up">
          {isSuccess ? (
            <SuccessScreen />
          ) : (
            <PickerForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
