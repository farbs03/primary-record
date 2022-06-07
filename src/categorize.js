import toTitleCase from "./utils/toTitleCase"

export default function categorize(data) {
    //let textList = data.split(/\r?\n/)
    console.log(data)
    let foundData = {
        medicationName: '',
        strength: '',
        form: '',
        instructions: ''
    }

    let formatted = data.toLowerCase()
    formatted = formatted.replace(/(\r\n|\n|\r)/gm, " ")
    
    let importantRe = /\w+ \d+ mg \w+/g
    let importantFound = importantRe.exec(formatted)[0]
    let importantList = importantFound.split(' ')

    let medicationName = toTitleCase(importantList[0])
    let strength = importantList[1] + ' ' + importantList[2]
    let form = toTitleCase(importantList[3])

    let instructionsRe = /[t|T]ake \w+/g

    foundData = {...foundData, medicationName: medicationName, strength: strength, form: form}

    return foundData
}