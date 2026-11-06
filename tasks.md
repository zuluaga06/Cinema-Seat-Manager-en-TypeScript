# Tasks

- [x] Crear matriz 8×10 de asientos.
- [x] Mostrar estado de la sala.
- [x] Reservar y consultar asientos.
- [x] Contar asientos ocupados y disponibles.
- [x] Probar la funcionalidad.

## Implementación

- **`src/cinema.ts`** — Lógica principal (matriz 2D, solo `number[][]`, sin clases ni objetos):
  - `createRoom()` → matriz 8×10 con `0` (disponible).
  - `showRoom(room)` → imprime el estado de la sala en la consola (`□` = libre, `■` = ocupado).
  - `reserveSeat(room, row, col)` → reserva un asiento (`0` → `1`) si está disponible; informa si no puede.
  - `isSeatAvailable(room, row, col)` → comprueba disponibilidad antes de reservar.
  - `countOccupied(room)` / `countAvailable(room)` → conteos; `showSummary(room)` los imprime.
- **`src/main.ts`** — Demo en consola + render visual en el navegador (parrilla de asientos y resumen).
- **`index.html`** — Página con la parrilla de la sala y el contador ocupados/disponibles.