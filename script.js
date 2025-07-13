let baseurl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const dropdowns = document.querySelectorAll(".dropdown select")
let btn = document.querySelector(".btn")
let fromcurr = document.querySelector(".from select")
let tocurr = document.querySelector(".to select")
let msg = document.querySelector(".information")

for (let select of dropdowns){
    for (currCode in countryList){
        let newoption = document.createElement("option")
        newoption.innerText = currCode
        newoption.value = currCode
        if(select.name === "from" && currCode==="USD"){
            newoption.selected = "selected"
        }
        if(select.name === "to" && currCode==="PKR"){
            newoption.selected = "selected"
        }
        select.append(newoption)

        select.addEventListener("change", (evt)=>{
            updatedFlag(evt.target)
        })
}
}

const updatedFlag = (elm)=>{
    let currCode = elm.value;
    let countryCode = countryList[currCode]
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = elm.parentElement.querySelector("img")
    img.src = newsrc
}

const exchangeRate = async ()=>{
let amount = document.querySelector(".amount input")
    let amtval = amount.value
    if(amtval === "" || amtval < 1){
        amtval=1
        amount.value = "1"
    }
    console.log(amtval)
    console.log(fromcurr.value, tocurr.value)
    const fromurl = `${baseurl}/${fromcurr.value.toLowerCase()}.json`

    let response = await fetch(fromurl)
    let data = await response.json()

    const rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]
    
    const result = (amtval * rate).toFixed(2)
    console.log(result)

msg.innerText = `${amtval}${fromcurr.value.toLowerCase()} = ${result}${tocurr.value.toLowerCase()}`

}
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    exchangeRate();
})

window.addEventListener("load", ()=>{
exchangeRate()
})

