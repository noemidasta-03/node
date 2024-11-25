import fs from "fs";

const path = "message.txt";
const data = `Questo è un file di esempio creato con Node.js`;

fs.writeFile(path, data, (error) => {
  if (error) {
    console.log("errore scrittura file", error);
  }
  console.log("file scritto con successo");
});
