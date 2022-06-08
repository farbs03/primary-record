import toTitleCase from "./utils/toTitleCase"

export default function categorize(data) {
    //let textList = data.split(/\r?\n/)
    let foundData = {
        medicationName: '',
        strength: '',
        form: ''
    }

    let formatted = data.toLowerCase()
    formatted = formatted.replace(/(\r\n|\n|\r)/gm, " ")
    
    let importantRe = /\w+ \d+ mg \w+/g
    let importantFound = importantRe.exec(formatted)[0]
    let importantList = importantFound.split(' ')

    let medicationName = toTitleCase(importantList[0])
    let strength = importantList[1] + ' ' + importantList[2]
    let form = toTitleCase(importantList[3])

    foundData = {medicationName: medicationName, strength: strength, form: form}

    return foundData
}