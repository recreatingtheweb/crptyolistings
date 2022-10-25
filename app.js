var apiKey = "coinrankingef782bb78d6e6f94f8bbcfd8d6cfd581c5e3cdad46dbc2f7";
var proxyUrl = "http://localhost:3002/coins";
const coinList = document.getElementById("data");
const filterInput = document.getElementById("filter");


function fnBrowserDetect(){         
      alert("This app is currently still in development. Safari is currently not supported for this web app. Support will be coming soon.")
    
}



  let coinsData = []
let filteredCoins = []

var formatCash = n => {
  if (n < 1e3) return n;
  if (n >= 1e4) return + (n / 1e9).toFixed(2) + "billion ETC"
}

filterInput.addEventListener('keyup', (e) => {
    // const inputValue = e.target.value
  
    filteredCoins = coinsData.filter(coin => {
      return coin.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    displayCoins(filteredCoins)
  })


// Load coins from the API endpoint
 const loadCoins = async () => {
    try {
      const res = await fetch(proxyUrl,{
        'Content-Type': 'application/json'
      })
      const dataResponse = await res.json()
      coinsData = dataResponse.data.coins
      console.log(dataResponse)
      console.log(res.status)

      displayCoins(dataResponse.data.coins)
    } catch (error) {
      console.log(error)
      console.log(proxyUrl)
    }
  }

// Insert the coin data into the table
  const displayCoins = (coins) => {
    const htmlString = coins.map((coin) => {
      return `
      <tr>
        <td>${coin.name}</td>
        <td>${coin.rank}</td>
        <td>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(coin.price)}</td>
        <td>${formatCash(coin.marketCap)}</td>
        <td>${coin.symbol}</td>
        <td><img src="${coin.iconUrl}" height="25" width="25" /></td>
       
      </tr>
      `
    })
      .join('');
    coinList.innerHTML = htmlString
     }

  try{
    loadCoins()
  } 
  catch(error){
    console.log(error)
    //Throw an alrt if the user is using unsopported browser.
    fnBrowserDetect()
  }