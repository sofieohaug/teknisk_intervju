import { InputValues, TravelEntry } from "../interfaces"


export async function calculateDeduction(data: InputValues): Promise<any> {
    console.log('calculateDeduction called with data:', JSON.stringify(data, null, 2));
    try {
      const cleanData: InputValues = {
        arbeidsreiser: data.arbeidsreiser.filter(entry => entry.km !== null && entry.antall !== null),
        besoeksreiser: data.besoeksreiser.filter(entry => entry.km !== null && entry.antall !== null),
        utgifterBomFergeEtc: data.utgifterBomFergeEtc
      };
  
      const response = await fetch('https://9f22opit6e.execute-api.us-east-2.amazonaws.com/default/reisefradrag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanData),
      });
  
      console.log('Status:', response.status);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('API Response:', JSON.stringify(result, null, 2));
      return result;
    } catch (error) {
      console.error('Error in calculateDeduction:', error);
      throw error;
    }
  }
  
  export function isValidInput(data: InputValues): boolean {
    console.log('Validating input:', JSON.stringify(data, null, 2));
    const isValidEntry = (entry: TravelEntry) => entry.km !== null && entry.antall !== null;
    
    const isValid = data.arbeidsreiser.every(isValidEntry) &&
      data.besoeksreiser.every(isValidEntry) &&
      data.utgifterBomFergeEtc !== null;
  
    console.log('Input validation result:', isValid);
    return isValid;
  }



