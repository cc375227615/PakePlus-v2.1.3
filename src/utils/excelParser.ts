import { read, utils } from 'xlsx';
import { Student } from '../types';

export const parseExcelFile = async (file: File): Promise<Student[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        
        // Parse data as array of arrays
        const jsonData = utils.sheet_to_json(sheet, { header: 1 }) as any[][];
        
        // Flatten and extract names (assuming first column or just a list of names)
        const students: Student[] = [];
        
        jsonData.forEach((row) => {
          if (row[0] && typeof row[0] === 'string') {
            students.push({
              id: crypto.randomUUID(),
              name: row[0].trim(),
              active: true
            });
          }
        });

        resolve(students);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};