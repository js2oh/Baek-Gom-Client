const fileTypes = [
  "image/jpeg",
  "image/png",
];

const validFileType = (file) => {
  return fileTypes.includes(file.type);
}

export default validFileType;