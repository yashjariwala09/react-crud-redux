export function convertToTableData(tasks = []) {
  const tableValue = tasks.map((value) => {
    const cells = Object.keys(value)
      .filter((key) => key !== "id")
      .map((key) => {
        return {
          cellValue: value[key],
          cellType: typeof value[key],
          displayName: key,
        };
      });
    return {
      id: value.id,
      cells,
      originalValue: value,
    };
  });
  return {
    tableValue,
    tableColumn:
      (tasks[0] && Object.keys(tasks[0])).filter((key) => key !== "id") || [],
  };
}
