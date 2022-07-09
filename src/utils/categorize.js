import toTitleCase from "./toTitleCase"

//function to categorize the text from the image, uses regex to find the drugName, strength, and form
export default function categorize(data) {
    //let textList = data.split(/\r?\n/)
    let foundData = {
        drugName: "",
        strength: "",
        form: "",
        morningCount: null,
        afternoonCount: null,
        nightCount: null,
        bedtimeCount: null
    }

    let formatted = data.replace(/(\r\n|\n|\r)/gm, " ")
    
    let importantRe = /([A-Z]+|[A-Z]+ HCL) (\d+ MG|\d+MG) \w+/g
    let importantFound = importantRe.exec(formatted)[0]
    let importantList = importantFound.split(' ')
    
    let listLen = importantList.length

    let drugName = toTitleCase(importantList[0])
    for(let i = 1; i < listLen - 3; i++) {
        drugName = drugName + (i < listLen - 3 ? ' ' : '') + importantList[i]
    }

    let strength = importantList[listLen - 3] + ' ' + importantList[listLen - 2]
    
    let form = toTitleCase(importantList[listLen - 1])

    foundData = {...foundData, drugName: drugName, strength: strength, form: form}

    return foundData
}