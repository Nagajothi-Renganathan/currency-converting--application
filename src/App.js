import './App.css';
import axios from 'axios' 
import {useEffect, useState} from 'react';
function App() {
  const [amount,setAmount]=useState(1);
  const [fromCurrency,setFromCurrency]=useState("USD");
  const [toCurrency,setToCurrency]=useState("INR");
  const [convertedAmount,setConvertedAmount]=useState();//used to store the exchangerate as per the amount
  const[exchangeRate,setExchangeRate]=useState(null);//used to store current exchangerate for 1 dollar
  useEffect(() =>{
    const exchangeRate = async () => { //(why async : it going to take a external data)
      try{
        let url=`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response=await axios.get(url) //asyn function so we use await, through get method from axios pass the URL in it. It will fetch the data and store in response variable.
                                            //why axios instead of fetch : axios automatically convert the data into JSON .In fetch we need to convert data into json
        // console.log(response)
        setExchangeRate(response.data.rates[toCurrency])//why [toCurrency]:bcz it is as object so we took that in array[],
      }
      catch(error){
        alert("enter a valid amount")
      }
    }
    exchangeRate();
  },[fromCurrency,toCurrency]);
  useEffect(()=>{
    if(exchangeRate !== null){
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }

  },[amount,exchangeRate])
  const amountChange=(e) => {
    const amountValue =parseFloat(e.target.value);
    setAmount(isNaN(amountValue)? 0 : amountValue)
  }
  const fromCurrencyChange = (e)=>{
    setFromCurrency(e.target.value)
  }
  const toCurrencyChange = (e) =>{
    setToCurrency(e.target.value)
  }
  return (
    <div className="App">
      <div className="box"></div>
      <div className="containers">
        <h1>Currency Converter</h1>
        <div className="input-container">
          <label htmlfor="amt">Amount</label>
          <input type="number" id="amt" value={amount} onChange={amountChange}/>
        </div>
        <div className="input-container">
          <label htmlFor="fromCurrency">From Currency</label>
          <select value={fromCurrency} onChange={fromCurrencyChange}>
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="UAE">UAE - Emirates Dirham</option>
            <option value="THAI"> -Thai baht</option>
          </select>
        </div>
        <div className="input-container">
        <label htmlFor="toCurrency">To Currency</label>
          <select value={toCurrency} onChange={toCurrencyChange}>
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="UAE">UAE - Emirates Dirham</option>
            <option value="THAI"> Thai-Thai baht</option>
          </select>
        </div>
        <div className="result">
          <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
