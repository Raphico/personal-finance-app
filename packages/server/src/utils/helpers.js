export function getCurrentDate() {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1; // The month index starts from 0
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}
