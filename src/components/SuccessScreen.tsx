export function SuccessScreen() {
  const handleClose = () => {
    window.close();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-scale-in">
      {/* Header verde de éxito */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">Datos guardados correctamente</h2>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-8 text-center">
        {/* Ícono de éxito grande */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce-in">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Mensaje */}
        <h3 className="text-2xl font-bold text-gray-800 mb-3">¡Listo!</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Tus datos de entrega han sido guardados.<br />
          Puedes cerrar esta ventana y continuar con tu compra.
        </p>

        {/* Botón */}
        <button
          onClick={handleClose}
          className="btn-primary inline-flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cerrar ventana
        </button>
      </div>
    </div>
  );
}
