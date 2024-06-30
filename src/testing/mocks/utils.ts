const convertFormDataToJson = (formData: FormData): Record<string, any> => {
  const json: Record<string, any> = {};

  formData.forEach((value, key) => {
    const keys = key.split(/[[\].]+/).filter(Boolean);
    keys.reduce((acc, part, index) => {
      if (index === keys.length - 1) {
        acc[part] = value;
      } else {
        if (!acc[part]) acc[part] = isNaN(Number(keys[index + 1])) ? {} : [];
        acc = acc[part];
      }
      return acc;
    }, json);
  });

  return json;
};

export { convertFormDataToJson };
