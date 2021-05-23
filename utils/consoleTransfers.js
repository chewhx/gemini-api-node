const Table = require("cli-table3");

const table = new Table();

function consoleTransfers(data) {
  if (!arguments || !data.length || typeof data !== "object") {
    console.error(
      "ERROR: Data parameter to be displayed needs to be an array of objects"
    );
    return;
  }

  // TABLE HEADINGS: ==============================
  // extract object keys as table headings and  assign to cli-table
  const headings = Object.keys(data[0]);
  table.options.head = [...headings];
  // set column width
  table.options.colWidths = Array.from(headings.fill(15));

  // TABLE ROWS: ==============================
  // extract values from each data object and push to cli-table as rows
  for (let each of data) {
    const row = Object.values(each);

    // push row into cli-table
    table.push(row);
  }

  console.log(table.toString());
}

module.exports = consoleTransfers;
