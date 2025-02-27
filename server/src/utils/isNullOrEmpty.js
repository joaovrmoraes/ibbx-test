function isNullOrEmpty(value) {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "")
  );
}

module.exports = { isNullOrEmpty };
