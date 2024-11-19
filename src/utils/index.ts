import * as XLSX from "xlsx";

// Función para aplanar objetos anidados
const flattenObject = (obj: any, prefix: string = ""): any => {
  let result: any = {};

  for (let key in obj) {
    const newKey = prefix ? `${prefix}_${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      // Si es un objeto, lo aplanamos recursivamente
      Object.assign(result, flattenObject(obj[key], newKey));
    } else {
      result[newKey] = obj[key];
    }
  }

  return result;
};

// Función para exportar a Excel
export const exportToExcel = (
  data: any[] = [],
  fileName: string = "usuarios.xlsx"
): void => {
  const flattenedData = data.map((item) => flattenObject(item));

  const ws = XLSX.utils.json_to_sheet(flattenedData);
  const wb = XLSX.utils.book_new();
  console.log(flattenedData);
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, fileName);
};


export const getNestedValue = (obj: any, path: string) => {
  return path
    .split(".")
    .reduce((acc, part) => (acc ? acc[part] : undefined), obj);
};
