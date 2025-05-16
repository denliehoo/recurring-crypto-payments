import { GridRenderCellParams } from "@mui/x-data-grid";
import { formatDate } from "./transformText";

// Separate function for rendering cell content
export const renderAmount = (params: GridRenderCellParams): React.ReactNode => {
  const amount = params.value as number;
  const formattedAmount = (amount / 10 ** 6).toString();
  return <span>{formattedAmount}</span>;
};

export const renderDate = (params: GridRenderCellParams): React.ReactNode => {
  const date = new Date(params.value as string);
  const formattedDate = formatDate(date);
  return <span>{formattedDate}</span>;
};

export const renderStatus = (params: GridRenderCellParams): React.ReactNode => {
  const capitalizedValue =
    params.value.charAt(0).toUpperCase() + params.value.slice(1);
  return <span>{capitalizedValue}</span>;
};
