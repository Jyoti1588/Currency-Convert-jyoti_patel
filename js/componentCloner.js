function includeCurrencyConverterComponent() 
{
    var htmlImport = document.querySelector('link[rel="import"]');
    var htmlDoc = htmlImport.import;
    var htmlMessage = htmlDoc.querySelector('.convertComponent');

    try 
	{
        document.body.appendChild(htmlMessage.cloneNode(true));
    } 
	catch(e) 
	{
        console.log(e);
    }
}