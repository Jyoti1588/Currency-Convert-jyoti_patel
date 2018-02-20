var baseCurrency = "";
var fromCurrency = "";
var toCurrency = "";
var fromValue = null;
var toValue = null;
var fromSelect = null;
var toSelect = null;
var currencyJSONData = null;

function preloadCurrentCurrency() 
{
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () 
    {
        if (request.readyState != 4 || request.status != 200) 
        {
            return;
        } 
        else 
        {
            setupPrices(request.responseText);
            
        }
    };
    request.open("GET", 'http://api.fixer.io/latest', true);
    request.send();
}

function initialize() 
{
    fromValue = document.getElementById("fromValue");
    toValue = document.getElementById("toValue");
    fromSelect = document.getElementById("fromCurrency");
    toSelect = document.getElementById("toCurrency");
    fromCurrency = fromSelect.options[fromSelect.selectedIndex].value;
    toCurrency = toSelect.options[toSelect.selectedIndex].value;

    preloadCurrentCurrency();
}


function setupPrices(currencyData) {
    if(currencyData) 
    {
        try 
        {
            currencyJSONData = JSON.parse(currencyData);
            baseCurrency = currencyJSONData.base;
        } 
        catch(e) 
        {
            console.log(e);
        }
    }
}

function onChangefromCurrency(value) 
{
    if (baseCurrency == "") 
    {
        console.log("could not find it Please try again later.");
        return;
    }
    fromCurrency = value;

    calculateCurrency();
}

function onChangetoCurrency(value) 
{
    if (baseCurrency == "")
     {
        console.log("could not find it Please try again later.");
        return;
    }
    toCurrency = value;

    calculateCurrency();
}

function calculateCurrency() 
{
    var rates = currencyJSONData.rates;
    var fromCurrencyRate,toCurrencyRate;
    rates[baseCurrency] = 1.00;
    fromCurrencyRate = rates[fromCurrency];
    toCurrencyRate = rates[toCurrency];
    toValue.value = (fromValue.value*toCurrencyRate/(fromCurrencyRate)).toFixed(2);
}

initialize();
