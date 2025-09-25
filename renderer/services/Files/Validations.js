import Rules from './Rules.json';
/**
 * TODO: validate the uploaded file
 * @params {file} - The file data
 */
export function validateForm(data) {
  const errors = [];
  const rule = Rules.file;

  if (rule.required && (!data || data.length === 0)) {
    return [{ file: rule.message.required }];
  }

  for (let index = 0; index < data.length; index++) {
    const file = data[index];

    const extension = file.name.split(".").pop().toLowerCase();
    if (!rule.type.includes(extension)) {
      errors.push({ file: `${file.name}: ${rule.message.type}` });
      continue;
    }

    const sizeNum = parseFloat(file.size);
    const sizeMB = sizeNum / 1024;
    if (sizeMB > rule.size) {
      errors.push({ file: `${file.name}: ${rule.message.size}` });
      continue;
    }
  }

  return errors;
}