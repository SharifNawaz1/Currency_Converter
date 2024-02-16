const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json";
const dropdown = document.querySelectorAll(".dropdown select");
for(let select of dropdown)
{
    for(codes in country_list)
    {
        let newOption = document.createElement("option");
        newOption.innerText=codes;
        newOption.value=country_list[codes];
        if(select.name=="from" && codes=="USD")
        {
            newOption.selected="selected";
        }
        if(select.name=="to" && codes=="INR")
        {
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>
    {
        updateFlag(evt.target);
    });
}

let updateFlag = (element)=>
{
    let curr_code = element.value;
    // console.log(curr_code);
    let cun_code = country_list[curr_code];
    let newsrc = `https://flagsapi.com/${curr_code}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newsrc;
}

document.querySelector(".btn").addEventListener("click",(e)=>
{
    e.preventDefault();
    fetchCurrency();
})

let fetchCurrency = async()=>
{
    var baseamount = document.querySelector('[type="text"]').value;
    var from = document.getElementById("from");
    var text1 = from.options[from.selectedIndex].text;
    let result1=text1.toLowerCase();
    var to = document.getElementById("to");
    var text2 = to.options[to.selectedIndex].text;
    let result2=text2.toLowerCase();
    let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${result1}/${result2}.json`;
    let response = await fetch(url);
    let finalresult = await response.json();
    let finalAmount = baseamount*(finalresult[result2]);
    let roundNumber = finalAmount.toFixed(2);
    // console.log(roundNumber);
    // console.log(finalAmount);
    // console.log(finalresult[result2])
    document.querySelector(".msg").innerHTML=`${baseamount} ${text1} = ${roundNumber}  ${text2}`
}
