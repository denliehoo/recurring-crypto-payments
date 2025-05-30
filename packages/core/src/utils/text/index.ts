export const splitTextByCaps = (text: string) => {
  // Split the text into words based on uppercase letters
  const words = text.split(/(?=[A-Z])/);

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  // Join the words back together with spaces
  const transformedText = capitalizedWords.join(' ');

  return transformedText;
};

export const formatDate = (dateString: Date | null | undefined) => {
  const date = new Date(dateString || new Date());

  const day = date.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
export const capitalizeFirstLetter = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
