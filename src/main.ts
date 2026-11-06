/**
 * Cinema Seat Manager — Entry point
 *
 * Runs a demo of the seat manager in the console (browser or `npm run console`)
 * and renders a visual room in the browser DOM when available.
 */

import {
  createRoom,
  countAvailable,
  countOccupied,
  isSeatAvailable,
  reserveSeat,
  showRoom,
  showSummary,
  ROWS,
  COLS,
} from "./cinema";

// ---------------------------------------------------------------------------
// Demo logic (runs everywhere: browser and terminal)
// ---------------------------------------------------------------------------
function runDemo(): number[][] {
  const room = createRoom();

  console.log("=== Cinema Seat Manager ===");
  console.log(`Sala de ${ROWS} filas × ${COLS} asientos por fila.`);
  console.log("  0 = disponible | 1 = ocupado\n");

  // Show the initial state (all seats available)
  showRoom(room);
  showSummary(room);
  console.log("");

  // Reserve some seats
  reserveSeat(room, 0, 0); // F1C1 OK
  reserveSeat(room, 0, 1); // F1C2 OK
  reserveSeat(room, 3, 4); // F4C5 OK
  reserveSeat(room, 3, 4); // F4C5 already occupied → fails
  reserveSeat(room, 7, 9); // F8C10 OK
  reserveSeat(room, 8, 0); // row out of range → fails
  console.log("");

  // Check some seats
  console.log(`¿F1C1 está disponible? ${isSeatAvailable(room, 0, 0) ? "Sí" : "No (ocupado)"}`);
  console.log(`¿F2C3 está disponible? ${isSeatAvailable(room, 1, 2) ? "Sí" : "No (ocupado)"}`);
  console.log("");

  // Show the final state
  showRoom(room);
  showSummary(room);

  return room;
}

// ---------------------------------------------------------------------------
// Browser rendering (visual bonus, not part of the core spec)
// ---------------------------------------------------------------------------
function renderRoom(room: number[][]): void {
  if (typeof document === "undefined") {
    return;
  }
  const grid = document.querySelector<HTMLDivElement>("#seat-grid");
  const occupiedEl = document.querySelector<HTMLSpanElement>("#occupied-count");
  const availableEl = document.querySelector<HTMLSpanElement>("#available-count");
  if (!grid) {
    return;
  }

  grid.innerHTML = "";
  const screen = document.createElement("div");
  screen.textContent = "PANTALLA";
  screen.className =
    "col-span-full mb-2 rounded bg-slate-700 py-1 text-center text-xs font-semibold tracking-widest text-slate-200";
  grid.appendChild(screen);

  const rowLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];
  for (let row = 0; row < room.length; row++) {
    const label = document.createElement("div");
    label.textContent = rowLabels[row] ?? `F${row + 1}`;
    label.className = "flex items-center justify-center text-xs font-medium text-slate-400";
    grid.appendChild(label);

    for (let col = 0; col < room[row].length; col++) {
      const seat = document.createElement("div");
      seat.textContent = String(col + 1);
      const occupied = room[row][col] === 1;
      seat.className =
        "flex h-8 w-8 items-center justify-center rounded text-xs font-medium transition " +
        (occupied
          ? "bg-red-500 text-white"
          : "bg-emerald-400 text-emerald-950 hover:bg-emerald-300 cursor-pointer");
      seat.title = occupied ? "Ocupado" : "Disponible";
      grid.appendChild(seat);
    }
  }

  if (occupiedEl) {
    occupiedEl.textContent = String(countOccupied(room));
  }
  if (availableEl) {
    availableEl.textContent = String(countAvailable(room));
  }
}

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------
const room = runDemo();

if (typeof document !== "undefined") {
  import("./style.css").then(() => {
    const intro = document.querySelector<HTMLParagraphElement>("#app");
    if (intro) {
      intro.textContent =
        `Sala de ${ROWS} filas × ${COLS} asientos. ` +
        "Revisa la consola (F12) para ver la demo: reservas, consultas y conteos.";
    }
    renderRoom(room);
  });
}
