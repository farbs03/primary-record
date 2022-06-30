import toTitleCase from "./toTitleCase"

//function to categorize the text from the image, uses regex to find the drugName, strength, and form
export default function categorize(data) {
    //let textList = data.split(/\r?\n/)
    let foundData = {
        drugName: "",
        strength: "",
        form: "",
        morningCount: 1,
        afternoonCount: null,
        nightCount: null,
        bedtimeCount: null
    }

    let formatted = data.toLowerCase()
    formatted = formatted.replace(/(\r\n|\n|\r)/gm, " ")
    
    let importantRe = /(\w+|\w+ hcl) \d+ mg \w+/g
    let importantFound = importantRe.exec(formatted)[0]
    let importantList = importantFound.split(' ')
    
    let drugName = toTitleCase(importantList[0])
    let strength = importantList[1] + ' ' + importantList[2]
    let form = toTitleCase(importantList[3])

    foundData = {...foundData, drugName: drugName, strength: strength, form: form}

    return foundData
}