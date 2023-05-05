import { solidColors, gradientColors} from "./data.js"

let canvas = document.getElementById("canvas")
let tools = document.querySelectorAll(".tool")
let toolName = document.querySelector(".toolName")
let solidFillUtility = document.querySelector(".solidFillUtility")
let gradientFillUtility = document.querySelector(".gradientFillUtility")
let textUtility = document.querySelector(".textUtility")
let utilies = [solidFillUtility, gradientFillUtility,textUtility]
let solidColorsHolder = document.querySelector(".solidColors")
let gradientColorsHolder = document.querySelector(".gradientColors")
let quoteTextArea = document.getElementById("quoteTextArea")
let quoteText = document.getElementById("quoteText")
let fontSize = document.querySelector(".fontSize")
let fontFamily = document.querySelector(".fontFamily")
let alignmentButtons = document.querySelectorAll(".ab")
let colorPicker = document.querySelector(".colorPicker")
let hexCode = document.querySelector(".hexCode")
let boldText = document.querySelector(".boldText")
let italicizeText = document.querySelector(".italicizeText")
let underlineText = document.querySelector(".underlineText")
let customSolidColor = document.querySelector(".customSolidColor")
let downloadButton = document.querySelector(".downloadButton")

function hideAllUtilities(){
    utilies.forEach(utility=>{
        utility.classList.add("hidden")
    })
}

function solidFillActive(){
    toolName.innerText = "Choose a solid color"
    hideAllUtilities()
    solidFillUtility.classList.remove("hidden")
}

function gradientFillActive(){
    toolName.innerText = "Choose a gradient color"
    hideAllUtilities()
    gradientFillUtility.classList.remove("hidden")
}

function textInsertActive(){
    toolName.innerText ="Write your quote"
    hideAllUtilities()
    textUtility.classList.remove("hidden")
}

function setActive(toolName){
    if(tools[0] == toolName){
        solidFillActive()
    }
    else if (tools[1] == toolName){
        gradientFillActive()
    }
    else if(tools[2] == toolName){
        textInsertActive()
    }
}

tools.forEach(tool=>{
    tool.addEventListener("click", ()=>{
        tools.forEach(tool=>{
            if(tool.classList.contains("activeTool")){
                tool.classList.remove("activeTool")
            }
        })
        tool.classList.add("activeTool")
        setActive(tool)
    })
})

window.addEventListener("load", ()=>{

    solidColors.forEach(color=>{
        let colorDiv = document.createElement("div")
        colorDiv.classList.add("solidColor")
        colorDiv.style.backgroundColor = color;
        colorDiv.addEventListener("click", ()=>{
            canvas.style.backgroundImage = "";
            canvas.style.backgroundColor = color;
        })
        solidColorsHolder.appendChild(colorDiv)
    })
    
    gradientColors.forEach(gradientColor =>{
        let gradientColorDiv = document.createElement("div");
        gradientColorDiv.classList.add("gradientColor")
        gradientColorDiv.style.backgroundImage = gradientColor;
        gradientColorDiv.addEventListener("click", ()=>{
            canvas.style.backgroundColor = "";
            canvas.style.backgroundImage = gradientColor;
        })
        gradientColorsHolder.appendChild(gradientColorDiv)
    })

})

quoteText.innerText = quoteTextArea.value;
quoteText.style.fontSize = fontSize.value + "px";
quoteText.style.fontFamily = fontFamily.value;

quoteTextArea.addEventListener("input", ()=>{
    quoteText.innerText = quoteTextArea.value;
})

fontFamily.addEventListener("input", ()=>{
    quoteText.style.fontFamily = fontFamily.value;
})

fontSize.addEventListener("input", ()=>{
    quoteText.style.fontSize = fontSize.value + "px";
})

alignmentButtons[0].addEventListener("click", ()=>{
    alignmentButtons.forEach(button=>{
        button.classList.remove("activeAlignment")
    })
    alignmentButtons[0].classList.add("activeAlignment")
    quoteText.style.textAlign = "left";
})

alignmentButtons[1].addEventListener("click", ()=>{
    alignmentButtons.forEach(button=>{
        button.classList.remove("activeAlignment")
    })
    alignmentButtons[1].classList.add("activeAlignment")
    quoteText.style.textAlign = "center";
})

alignmentButtons[2].addEventListener("click", ()=>{
    alignmentButtons.forEach(button=>{
        button.classList.remove("activeAlignment")
    })
    alignmentButtons[2].classList.add("activeAlignment")
    quoteText.style.textAlign = "right";
})

colorPicker.addEventListener("input", ()=>{
    quoteText.style.color = colorPicker.value;
    hexCode.value = colorPicker.value
})

hexCode.addEventListener("input", ()=>{
    quoteText.style.color = hexCode.value;
    colorPicker.value = hexCode.value
})

boldText.addEventListener("click", ()=>{
    if(boldText.checked){
        quoteText.style.fontWeight = "bold";
    }
    else{
        quoteText.style.fontWeight = "normal";
    }
})

italicizeText.addEventListener("click", ()=>{
    if(italicizeText.checked){
        quoteText.style.fontStyle = "italic";
    }
    else{
        quoteText.style.fontStyle = "normal";
    }
})

underlineText.addEventListener("click", ()=>{
    if(underlineText.checked){
        quoteText.style.textDecoration = "underline";
    }
    else{
        quoteText.style.textDecoration = "none";
    }
})

customSolidColor.addEventListener("input", ()=>{
    canvas.style.backgroundColor = customSolidColor.value;
})

downloadButton.addEventListener("click", downloadImage)

async function downloadImage(){
    let req = await html2canvas(canvas)
    let finalImage = await req
    let link = finalImage.toDataURL("image/png")
    let a = document.createElement("a")
    a.href = link
    a.download = "quote.png"
    a.click()
}