
let table = document.getElementById("table");

let shopItems = [];
let basket = JSON.parse(localStorage.getItem("data")) || [];

let fetchShopItems = async () => {
    try {
      const response = await fetch("/api/v1/product/getAll");
      if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
      }
      const data = await response.json();
      console.log("data", data.products);
      shopItems = data.products.map((item) => ({
        id: item.id,
        name: item.title,
        desc: item.desc,
        // img: item.image_url,
        price: item.price,
      })); // Map the fetched data to match your item structure
      generatetable(); // Call the function to generate the shop interface
    } catch (error) {
      console.error(error);
    }
  };
  
  fetchShopItems();


function generatetable () {
    const hello = `
        <table style="width:100%">
  <tr>
    <th>Person 1</th>
    <th>Person 2</th>
    <th>Person 3</th>
  </tr>
  <tr>
    <td>Emil</td>
    <td>Tobias</td>
    <td>Linus</td>
  </tr>
  <tr>
    <td>16</td>
    <td>14</td>
    <td>10</td>
  </tr>
</table>`
    
    return (
        table.innerHTML = hello
    )
}
  