## SIGTAP

### Arquivos com as tabelas e relacionamento do SIGTAP (Sistema de Gerenciamento da Tabela de Procedimentos, Medicamentos e OPM do SUS)
http://sigtap.datasus.gov.br

1. Baixe o zip através do link http://sigtap.datasus.gov.br/tabela-unificada/app/download.jsp e coloque o conteúdo descompactado dentro da pasta competencia
2. No arquivo `parsefiles/index.js`, altere a constante `competencia` conforme o nome da pasta, exemplo `const competencia = '202307'`
3. No arquivo `parsefiles/index.js`, altere a constante `datasetList` com um array conforme os arquivos que queira converter, exemplo `const datasetList = ['tb_cid', 'tb_detalhe']`
4. Entre na pasta `parsefiles` via cmd e execute o comando `node index.js`
