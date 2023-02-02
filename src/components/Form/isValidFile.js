const fileTypes = [
  "image/jpeg",
  "image/png",
];

// Check if the file is either in jpeg or png format
const validFileType = (file) => {
  return fileTypes.includes(file.type);
}

export default validFileType;
