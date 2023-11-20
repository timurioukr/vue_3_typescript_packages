export const useAlphaNumericValue = (value: string): boolean => {
  const regex = /^[^а-яА-ЯґҐєЄіІїЇ]+$/;
  return regex.test(value);
};

export const useLocalStorageSaver = (name: string, value: any): void => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const useCurrentDate = (value: string): string => {
  const dateObject = new Date(value);

  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObject.getFullYear();

  return `${day}.${month}.${year}`;
};
