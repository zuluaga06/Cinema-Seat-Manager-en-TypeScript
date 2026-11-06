/**
 * Cinema Seat Manager — Core logic
 *
 * A cinema room with 8 rows × 10 columns, represented ONLY as a 2D array:
 *   - 0 → seat available
 *   - 1 → seat occupied
 *
 * Per the spec: no classes, no objects to represent seats — just numbers
 * inside a bidirectional array, using functions with parameters/returns.
 */

export const ROWS = 8;
export const COLS = 10;

/** Creates a new room matrix (ROWS × COLS) with every seat available (`0`). */
export function createRoom(): number[][] {
  const room: number[][] = [];
  for (let row = 0; row < ROWS; row++) {
    const seats: number[] = [];
    for (let col = 0; col < COLS; col++) {
      seats.push(0);
    }
    room.push(seats);
  }
  return room;
}

/** Returns true when the (row, col) position is inside the room bounds. */
function isValidSeat(row: number, col: number): boolean {
  return row >= 0 && row < ROWS && col >= 0 && col < COLS;
}

/** Returns true if the seat exists and is available (`0`). */
export function isSeatAvailable(room: number[][], row: number, col: number): boolean {
  if (!isValidSeat(row, col)) {
    return false;
  }
  return room[row][col] === 0;
}

/**
 * Reserves a seat, changing its value from `0` to `1` when available.
 * Returns true on success; otherwise logs a message and returns false.
 */
export function reserveSeat(room: number[][], row: number, col: number): boolean {
  if (!isSeatAvailable(room, row, col)) {
    console.log(
      `El asiento F${row + 1}C${col + 1} no puede reservarse (ya está ocupado o fuera de rango).`
    );
    return false;
  }
  room[row][col] = 1;
  console.log(`Asiento F${row + 1}C${col + 1} reservado correctamente.`);
  return true;
}

/** Counts the occupied seats (`1`) in the room. */
export function countOccupied(room: number[][]): number {
  let occupied = 0;
  for (const row of room) {
    for (const seat of row) {
      if (seat === 1) {
        occupied++;
      }
    }
  }
  return occupied;
}

/** Counts the available seats (`0`) in the room. */
export function countAvailable(room: number[][]): number {
  let available = 0;
  for (const row of room) {
    for (const seat of row) {
      if (seat === 0) {
        available++;
      }
    }
  }
  return available;
}

/** Prints the current room status to the console. */
export function showRoom(room: number[][]): void {
  console.log("Estado de la sala:");
  const header = Array.from({ length: COLS }, (_, col) => `C${col + 1}`).join(" ");
  console.log(`     ${header}`);
  for (let row = 0; row < room.length; row++) {
    const line = room[row]
      .map((seat) => (seat === 0 ? "□" : "■"))
      .join("  ");
    console.log(`F${row + 1}   ${line}`);
  }
}

/** Prints the occupied/available summary to the console. */
export function showSummary(room: number[][]): void {
  const occupied = countOccupied(room);
  const available = countAvailable(room);
  console.log(
    `Resumen: ${occupied} ocupados, ${available} disponibles (total ${ROWS * COLS}).`
  );
}