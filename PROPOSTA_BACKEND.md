# Propuesta Técnica: Panel de Control y Activaciones - MiraTV

Para implementar un sistema de suscripciones y activaciones profesional (tipo CPanel), se recomienda la siguiente arquitectura:

## 1. Stack Tecnológico (Backend)
- **Firebase (Recomendado):**
  - **Firebase Auth:** Para que tú (y tus vendedores) entren al panel de administración.
  - **Cloud Firestore:** Base de datos en tiempo real para guardar:
    - `tokens`: Lista de códigos de activación generados.
    - `users`: Usuarios activos, su fecha de vencimiento y estado (Premium/Gratis).
  - **Firebase Hosting:** Para alojar el panel web de administración.

## 2. Flujo de Activación
1. **Generación:** En tu panel administrativo, generas un código (ej: `MIRA-X92J-B2L0`).
2. **Venta:** Le entregas el código al usuario tras el pago.
3. **Validación:** El usuario ingresa el código en la App. La App consulta a Firestore:
   - ¿Existe el token?
   - ¿Ya fue usado?
   - Si es válido, asocia el `Device ID` del celular al token y marca la cuenta como **Premium** con una fecha de expiración (ej: +30 días).

## 3. Seguridad de Contenido
- El backend puede actuar como un **Proxy de Listas**. La App no descarga las listas directamente de la fuente original (evitando exponer credenciales), sino que las pide a una Cloud Function de Firebase que valida si el usuario tiene una suscripción activa antes de entregar el contenido.

## 4. Ventajas
- **Control Total:** Puedes desactivar cuentas remotamente.
- **Sin Servidor Propio:** Al usar Firebase, solo pagas si tienes miles de usuarios (el nivel gratuito es muy amplio).
- **Escalabilidad:** Funciona igual para 10 que para 10,000 usuarios.
