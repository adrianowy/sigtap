var fs = require("fs");
const { procedimentos, cid, rl_procedimentos_cid } = require("./layout_files");

const competencia = "202307"
const file = 'tb_procedimento2';

try {
    var data = fs.readFileSync(
      `./../competencia/${competencia}/${file}.txt`,
      "utf8"
    );
    var layouts = [...procedimentos];
    var lines = data.toString().split('\r\n');

    var result = [];
    
    lines.forEach((line, i) => {

        let obj = {};

        layouts.forEach(layout => {
            const [coluna, tamanho, inicio, fim, tipo] = layout.split(',');

            obj = {
              ...obj,
              [coluna]: line.substr(inicio-1, tamanho).trim(),
            };
        })

        result.push(obj);
    });

    fs.writeFile(`./generate/${file}.json`, JSON.stringify(result), (err) => {
      if (err) console.error(err);
      else console.log("Data written to file successfully.");
    });

} catch (e) {
  console.log("Error:", e.stack);
}
