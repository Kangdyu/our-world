import { ICountryInfo } from '../api/types';

export function filterData(data: ICountryInfo[], searchTerm: string) {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return data.filter((country) => {
    if (
      country.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      country.alpha2Code.toLowerCase().includes(lowerCaseSearchTerm) ||
      country.region.toLowerCase().includes(lowerCaseSearchTerm) ||
      country.capital.toLowerCase().includes(lowerCaseSearchTerm) ||
      country.callingCodes.find((callingCode) =>
        callingCode.includes(searchTerm)
      )
    )
      return true;
  });
}

export function sortData(
  data: ICountryInfo[],
  field: keyof ICountryInfo,
  isAscendingOrder: boolean
) {
  return [...data].sort((a, b) => {
    let A, B;
    if (field === 'callingCodes') {
      A = a.callingCodes[0].split(' ').join('');
      B = b.callingCodes[0].split(' ').join('');
    } else {
      A = a[field];
      B = b[field];
    }

    return isAscendingOrder ? A.localeCompare(B) : B.localeCompare(A);
  });
}
