# 📦 Picker Express - Formulario de Entrega

Página externa standalone para capturar datos de entrega con React + Vite + TypeScript + Tailwind CSS.

## ✨ Características

- ⚡ **Vite** - Build ultrarrápido y HMR instantáneo
- ⚛️ **React 18** - Última versión con TypeScript
- 🎨 **Tailwind CSS** - Estilos utilitarios con diseño Picker
- 📱 **Responsive** - Funciona en mobile, tablet y desktop
- ✅ **Validación** - Validación en tiempo real de formularios
- 🎯 **TypeScript** - Type safety completo
- 🚀 **Optimizado** - Bundle pequeño y carga rápida

## 🎨 Diseño

- Color principal: `#00B2E3` (Picker blue)
- Gradientes y sombras profesionales
- Animaciones suaves
- Iconos SVG inline
- Estados de hover, focus y error bien definidos

## 📂 Estructura del proyecto

```
picker-delivery-external/
├── src/
│   ├── components/
│   │   ├── PickerForm.tsx          # Formulario principal
│   │   └── SuccessScreen.tsx       # Pantalla de éxito
│   ├── types/
│   │   └── index.ts                # Tipos TypeScript
│   ├── utils/
│   │   ├── api.ts                  # Servicio de API
│   │   └── validation.ts           # Validación de formularios
│   ├── App.tsx                     # Componente raíz
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Estilos globales
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🚀 Instalación y desarrollo

### 1. Instalar dependencias

```bash
npm install
```

### 2. Desarrollo local

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

### 3. Build para producción

```bash
npm run build
```

Los archivos optimizados estarán en `/dist`

### 4. Preview del build

```bash
npm run preview
```

## 🌐 Deploy a GitHub Pages

### Configuración

1. **Actualizar `vite.config.ts`** con tu repo:

```typescript
export default defineConfig({
  base: '/tu-repo-name/', // ⬅️ Cambiar esto
})
```

2. **Deploy:**

```bash
npm run deploy
```

Esto hace build y sube automáticamente a GitHub Pages.

### URL del formulario

```
https://tu-usuario.github.io/tu-repo-name/?session=SESSION_ID&shop=SHOP_DOMAIN
```

## 🔗 Integración con Shopify Checkout

### En tu Checkout UI Extension:

```typescript
const sessionId = await sessionToken?.get();
const formUrl = `https://picker-express.github.io/picker-delivery-checkout-external/?session=${sessionId}&shop=${shop.myshopifyDomain}`;

<Button to={formUrl}>
  Completar con Picker Express
</Button>
```

### Flujo completo:

1. Usuario hace click en botón de Picker en checkout
2. Se abre ventana con formulario externo (esta página)
3. Usuario completa datos
4. Datos se envían a backend: `POST /api/save-delivery`
5. Checkout hace polling: `GET /api/check-delivery/{sessionId}`
6. Checkout detecta datos y muestra confirmación

## 🛠️ Personalización

### Cambiar colores

En `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      picker: {
        primary: '#00B2E3',        // Tu color
        'primary-hover': '#0099CC',
        'primary-light': '#E0F2FE',
      }
    }
  }
}
```

### Cambiar logo

Reemplaza las URLs del logo en:
- `index.html` (favicon)
- `src/App.tsx` (logo principal)
- `src/components/PickerForm.tsx` (logo en card)

### Cambiar backend URL

En `src/utils/api.ts`:

```typescript
const BACKEND_URL = 'https://tu-backend.com';
```

## 📋 Validación

El formulario valida:

- ✅ **Nombre**: Mínimo 3 caracteres
- ✅ **Teléfono**: Mínimo 10 dígitos
- ✅ **Fecha**: Debe ser hoy o posterior

Puedes modificar las reglas en `src/utils/validation.ts`.

## 🎯 Endpoints requeridos en el backend

### 1. Guardar datos

```typescript
POST /api/save-delivery
Body: {
  sessionId: string,
  shop: string,
  fullName: string,
  phoneNumber: string,
  deliveryDate: string,
  completed: boolean,
  timestamp: number
}
Response: { success: boolean }
```

### 2. Verificar datos (para polling en checkout)

```typescript
GET /api/check-delivery/:sessionId?shop=SHOP_DOMAIN
Response: {
  fullName: string,
  phoneNumber: string,
  deliveryDate: string,
  completed: boolean
} | 404
```

## 🐛 Troubleshooting

### El build falla

```bash
# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### CORS errors

Asegúrate que tu backend retorne:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### GitHub Pages 404

1. Verifica que `base` en `vite.config.ts` coincida con tu repo
2. Asegúrate de hacer `npm run deploy` (no `npm run build`)
3. Habilita GitHub Pages en Settings → Pages

## 📱 Testing

Prueba con diferentes parámetros:

```bash
# Desarrollo local
http://localhost:3000/?session=test123&shop=mystore.myshopify.com

# Producción
https://picker-express.github.io/picker-delivery-checkout-external/?session=test123&shop=mystore.myshopify.com
```

## 📄 Licencia

Propiedad de Picker Express

---

**Versión**: 1.0.0  
**Stack**: React 18 + Vite 5 + TypeScript + Tailwind CSS  
**Última actualización**: Enero 2026
