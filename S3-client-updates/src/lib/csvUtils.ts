import Papa from 'papaparse';

type ParseResults = {
  data: string[][]
}

export const parseCsv = (file: File): Promise<string[] | null> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: function(results: ParseResults) {
        // TODO: add validation for the value types
        // Currently we just check it's a truthy value
        return resolve(results.data.flat().filter(Boolean));
      },
      error: function(error) {
        console.log('parseCsv error', error)
        return resolve(null);
      }
    });
  })
}
