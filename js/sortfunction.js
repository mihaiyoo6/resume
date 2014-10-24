var myObj =
    { "succes": true,
     "pages":[
      
		{
			"menu_index": 0,
			"page_name":"Profile"
			},
		{
			"menu_index": 3,
			"page_name":"Contact"
			},
		{
			"menu_index": 4,
			"page_name":"Education"
			},
		{
			"menu_index": 5,
			"page_name": "Carrers"
			},
		{
			"menu_index": 6,
			"page_name":"Skills"
			},
		{
			"menu_index": 2,
			"page_name":"Interests"
			},
		{
			"menu_index": 1,
			"page_name":"Free time"
		}
     ]
    };
    var keys = [],
    k, i, len;
console.log(myObj.pages);
function mySort (list) {
 
    var comparisons = 0,
        swaps = 0,
        endIndex = 0,
        len = list.length - 1,
        hasSwap = true;
 
    for (var i = 0; i < len; i++) {
 
        hasSwap = false;
 
        for (var j = 0, swapping, endIndex = len - i; j < endIndex; j++) {
            comparisons++;
 
            if (list[j].menu_index > list[j + 1].menu_index) {
         
                swapping = list[j];
 
                list[j] = list[j + 1];
                list[j + 1] = swapping;
 
                swaps++;
                hasSwap = true;
            };
        };
 
        if (!hasSwap) {
            break;
        }
    }
         
    console.log("--Bubble Sort First Pass--");
    console.log("Comparisons: " + comparisons);
    console.log("Swaps: " + swaps);
 
    return list;
};
console.log(mySort(myObj.pages));
/*for (k in myObj.pages)
{
    console.log(k);
    if (myObj.pages.menu_index.hasOwnProperty(k))
    {
        keys.push(k);
    }
}

keys.sort();

len = keys.length;

for (i = 0; i < len; i++)
{
    k = keys[i];
    alert(k + ':' + myObj[k]);
}*/