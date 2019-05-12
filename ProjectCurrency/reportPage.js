let dataPoints1 = [];
let dataPoints2 = [];
let dataPoints3 = [];
let dataPoints4 = [];
let dataPoints5 = [];
let nameCoinsArry = []
let timeArry = []
let interval;
var chartAA; 

// let arryForPrice = [];
// let arryForCoinName = [];

// ask gil :1. first ta in arryForPrice is empty , 2. how to clear canvas

function creatCanvas(){
    chartAA = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
            title:{
                text: "Coins"
            },
            axisY :{
                includeZero: false,
                title: "Price",
            },
            toolTip: {
                shared: "true"
            },
            legend:{
                cursor:"pointer",
               itemclick : toggleDataSeries
            },
            data:[ {
                type: "line",
                visible: true,
                showInLegend: true,
                 name: selectedCoins[0] , 
                 dataPoints: dataPoints1
                }, 
             {
                type: "line",
                visible: true,
                showInLegend: true,
                 name: selectedCoins[1],
                 dataPoints: dataPoints2
                },
             {
                type: "line",
                visible: true,
                showInLegend: true,
                 name: selectedCoins[2],
                 dataPoints: dataPoints3
             },
             {
                type: "line",
                visible: true,
                showInLegend: true,
                 name: selectedCoins[3],
                 dataPoints: dataPoints4
             },
             {
                type: "line",
                visible: true,
                showInLegend: true,
                 name: selectedCoins[4],
                 dataPoints: dataPoints5
             }]
    });

    
}



function reportPage(){
	if(selectedCoins.length < 1 )
	{
		return;
    }
    creatCanvas();
    nameCoinsArry.push(4)


    $("#searchArea").hide()
	$("#content").hide()
	$("#aboutPage").hide()
    $("#chartContainer").show() 

    // if no coin sellected -- alert balbal
    // from coins selcted creta url 


    updateChart();

    interval =  setInterval(function(){updateChart()}, 2000);
}

function updateChart(){    
    xVal = getTime();

    
    //make function to create url
    url = getUrlFromSelectedCoins()
    
    $.get(url, function(response){

         //push to arry
         currentPriceArry = checkPriceAndPush(response)

        if(selectedCoins.length >= 1 && currentPriceArry[0] !=0 )
        {
          dataPoints1.push({   
            x: xVal[0],
            y: currentPriceArry[0]
            });
        }   

        if(selectedCoins.length >1 && currentPriceArry[1] !=0)
        {
            dataPoints2.push({   
                x: xVal[0],
                y: currentPriceArry[1]
            });
        }
        else
        {
            dataPoints2 = "";
        }

        
        if(selectedCoins.length > 2 && currentPriceArry[2] !=0)
        {
            dataPoints3.push({   
                x: xVal[0],
                y: currentPriceArry[2]
            });
        }
        else
        {
            dataPoints3 = "";
        }

        if(selectedCoins.length > 3 && currentPriceArry[3] !=0)
        {
            dataPoints4.push({   
                x: xVal[0],
                y: currentPriceArry[3]
            });
        }
        else
        {
            dataPoints4 = "";
        }
        if(selectedCoins.length > 4 && currentPriceArry[4] !=0)
        {
            dataPoints5.push({   
                x: xVal[0],
                y: currentPriceArry[4]
            });
        }
        else
        {
            dataPoints5 = "";
        }
        

            chartAA.render();


            
        });

}

function checkPriceAndPush(response)
{
    let currentPriceArry =[];

    var setUpperCaseToSymbole = selectedCoins.map(item=> item.toUpperCase());
  
    if(response.Message === `There is no data for any of the toSymbols ${setUpperCaseToSymbole} .`)
    {
        alert('No data for your chosen coins' )
                clearInterval(interval) ; 
                selectedCoins =[];
                return homePage()  ;     
    }

    selectedCoins.forEach(sy => {
        let mySy = sy.toUpperCase()
                //If choose undifuned coin

        if( response[mySy] === undefined)
        {
            currentPriceArry.push(0);
        }

        else
        {
        currentPrice= response[mySy].USD
        currentPriceArry.push(currentPrice);
        }

    });
    return currentPriceArry;
}

 function getTime()
 {
     timeArry = [ ];
    currentTime = new Date()
    currentTime.getTime();
    timeArry.push(currentTime)
    return timeArry;    
 }

 

 
function getUrlFromSelectedCoins()
{
    url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=` 
	
	lastItem = selectedCoins.splice(-1)[0]
	selectedCoins.forEach( i => 
		{
			url += `${i.toUpperCase()}` + ','
        })
        
		selectedCoins.push(lastItem)
        url += `${ lastItem.toUpperCase() }&tsyms=USD`

        return url;
}


function clearData(){
    chartAA = "";
    dataPoints1 = [];
    dataPoints2 = [];
    dataPoints3 = [];
    dataPoints4 = [];
    dataPoints5 = [];
    selectedCoins = []
    currentPriceArry=[]
    clearInterval(interval) ; 

}

function toggleDataSeries(e) {
    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
}

