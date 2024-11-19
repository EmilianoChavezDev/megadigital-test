import * as XLSX from "xlsx";

/**
 * Función para aplanar un objeto anidado, transformando sus propiedades en claves "planas" con prefijos.
 * @param obj - El objeto que se desea aplanar.
 * @param prefix - (Opcional) Prefijo que se agrega a las claves en el objeto resultante para reflejar la estructura original.
 * @returns Un nuevo objeto con las propiedades aplanadas.
 */
const flattenObject = (obj: any, prefix: string = ""): any => {
  let result: any = {};
  for (let key in obj) {
    const newKey = prefix ? `${prefix}_${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(result, flattenObject(obj[key], newKey));
    } else {
      result[newKey] = obj[key];
    }
  }

  return result;
};

// Función para exportar a Excel con un título
export const exportToExcel = (
  data: any[] = [],
  fileName: string = "documento.xlsx",
  title: string = "Lista de Datos"
): void => {
  const flattenedData = data.map((item) => flattenObject(item));

  const ws = XLSX.utils.json_to_sheet([]);
  XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: "A1" });
  XLSX.utils.sheet_add_json(ws, flattenedData, { origin: "A3" });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Hoja 1");
  XLSX.writeFile(wb, fileName);
};

/**
 * Función para obtener el valor de una propiedad anidada en un objeto.
 * @param obj - El objeto del cual se quiere extraer el valor.
 * @param path - La cadena que representa la ruta a la propiedad, separada por puntos (e.g., "user.address.city").
 * @returns El valor de la propiedad si existe, o `undefined` si la ruta no es válida.
 */
export const getNestedValue = (obj: any, path: string) => {
  return path
    .split(".")
    .reduce((acc, part) => (acc ? acc[part] : undefined), obj);
};

// para calcular cuantas filas van a ser descargadas
export const calculateItemsToProcess = (
  totalItems: number,
  currentPage: number,
  itemsPerPage: number
): number => {
  return Math.min(totalItems - currentPage * itemsPerPage, itemsPerPage);
};
