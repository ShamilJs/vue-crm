export default (value, format = "date") => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return format === "date"
    ? value.toLocaleDateString("ru-RU", options)
    : value.toLocaleTimeString();
};
