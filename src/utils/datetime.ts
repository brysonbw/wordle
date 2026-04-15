function currentYear(): string {
  const date = new Date();
  return date.getFullYear().toString();
}

export { currentYear };
