var fs = require("fs");

// add here the competence folder name
const competencia = "202307"

// add here the list of files to be converter
const datasetList = ['tb_procedimento', 'tb_cid', 'rl_procedimento_cid'];

try {
  for (const dataset of datasetList) {
      const data = fs.readFileSync(
        `./../competencia/${competencia}/${dataset}.txt`,
        "latin1"
      );

      const layout = fs.readFileSync(
        `./../competencia/${competencia}/${dataset}_layout.txt`,
        "latin1"
      );

      const parseLayout = layout.toString().split("\r\n").slice(1, -1);

      const parseData = data.toString().split("\r\n").slice(0, -1);

      const resultJson = parseData.map((line, i) => {
        let obj = {};

        parseLayout.forEach((layout) => {
          const [coluna, tamanho, inicio, fim, tipo] = layout.split(",");

          obj = {
            ...obj,
            [coluna]: line.substr(inicio - 1, tamanho).trim(),
          };
        });

        return obj;
      });

      fs.writeFile(
        `./generate/${dataset}.json`,
        JSON.stringify(resultJson),
        (err) => {
          if (err) console.error(err);
          else console.log("Data written to file successfully.");
        }
      );
    }

} catch (e) {
  console.log("Error:", e.stack);
}
