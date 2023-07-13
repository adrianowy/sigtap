const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Add here the competence folder name
const competencia = "202307";

// Add here the list of files to be converted
const datasetList = ["tb_procedimento", "tb_cid", "rl_procedimento_cid"];

async function convertFiles() {

  try {
    for (const dataset of datasetList) {

      const data = await readFile(
        path.join( __dirname, "..", "competencia", competencia, `${dataset}.txt` ),
        "latin1"
      );

      const layout = await readFile(
        path.join( __dirname, "..", "competencia", competencia, `${dataset}_layout.txt` ),
        "latin1"
      );

      const parsedLayout = layout
        .toString()
        .toLowerCase()
        .split("\r\n")
        .slice(1, -1);
      
      const parsedData = data
        .toString()
        .split("\r\n")
        .slice(0, -1);

      const resultJson = parsedData.map((line) =>
        parsedLayout.reduce((obj, layout) => {
          const [column, size, start, end, type] = layout.split(",");
          const value = line.substring(start - 1, end).trim();
          return { ...obj, [column]: value };
        }, {})
      );
      
      await writeFile(
        path.join(__dirname, "generated", `${dataset}.json`),
        JSON.stringify(resultJson)
      );

      console.log(`Data for ${dataset} written to file successfully.`);
    }
  } catch (err) {
    console.error("Error:", err.stack);
  }
}

convertFiles();
