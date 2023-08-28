let table = document.getElementById("table");

let shopItems = [];
let basket = JSON.parse(localStorage.getItem("data")) || [];
let totalAmount = ""
let amountOwed = ""
let id = JSON.parse(localStorage.getItem("Xid"));
console.log("firstid",id.orderId)

let fetchProductItems = async (id) => {
  let xid = id.orderId
  try {
    const response = await fetch(`/api/v1/order/orders/${xid}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }
    const data = await response.json();
   amountOwed = data.amountOwed;
    totalAmount = data.totalAmount;
    console.log("data1", data);

    shopItems = data.Products.map((item) => ({
      id: item.id,
      count: item.count,
      price: item.priceInRs,
      title: item.title,
      description: item.description,
    }));
    generatetable(); // Call the function to generate the shop interface
  } catch (error) {
    console.error(error);
  }
};

fetchProductItems(id);

function generatetable() {
  const tableRows = shopItems.map((item, index) => {
    return `<tr>
      <td>${index +1}</td>
      <td>${item.title}</td>
      <td>${item.description}</td>
      <td>${item.count}</td>
      <td>${item.price}</td>      
      <td>${totalAmount}</td>
      <td>${amountOwed}</td>

    </tr>`;
  });
  const tableHTML = `<table>
  <thead>
  <tr>
    <th>ID</th>
    <th>Title</th>
    <th>Description</th>
    <th>Count</th>
    <th>Price</th>
    <th>Total Amount</th>
    <th>Amount Owed</th>
  </tr>
</thead>
<tbody>
  ${tableRows}
</tbody>
</table>`;

  return (table.innerHTML = tableHTML);
}
