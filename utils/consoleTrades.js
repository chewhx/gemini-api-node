const Table = require("cli-table3");

const table = new Table();

let totalCost = 0;
let totalOwned = 0;

function consoleTrades(data) {
  if (!arguments || !data.length || typeof data !== "object") {
    console.error(
      "ERROR: Data parameter to be displayed needs to be an array of objects"
    );
    return;
  }

  // TABLE HEADINGS: ==============================
  // extract object keys as table headings
  const headings = Object.keys(data[0]);
  // push "cost" heading
  headings.push("cost");
  // assign headings to cli-table
  table.options.head = [...headings];

  // TABLE ROWS: ==============================
  // extract values from each data object and push to cli-table as rows
  for (let each of data) {
    const row = Object.values(each);

    // calculate cost for each row
    const cost = parseFloat(each.amount) * parseFloat(each.price);

    // push cost into 'row' values
    row.push(cost);

    // add each row cost to global variable totalCost
    totalCost += cost;

    // add each row quantity bought to totalOwned
    totalOwned += parseFloat(each.amount);

    // push row into cli-table
    table.push(row);
  }

  // TABLE FOOTER: ==============================
  // add new row to table to display average cost and total coin owned of each coin
  table.push(
    [
      {
        colSpan: table.options.head.length,
        hAlign: "right",
        content: `Average price: ${(totalCost / totalOwned).toFixed(2)}`,
      },
    ],
    [
      {
        colSpan: table.options.head.length,
        hAlign: "right",
        content: `Total Coins Owned: ${totalOwned.toFixed(8)}`,
      },
    ]
  );

  console.log(table.toString());
}

module.exports = consoleTrades;
