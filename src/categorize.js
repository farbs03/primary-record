/*
Process:
- Take in data (originally a single string)
- For now, try keeping it a single string
- Try to find medication name, quantity, strength, and form
- medication name found with fda db of medication names
- Quantity found with  
*/
export default function categorize(data) {
    //let textList = data.split(/\r?\n/)
    let foundData = {
        medicationName: '',
        quantity: '',
        strength: '',
        form: ''
    }

    let formatted = data.toLowerCase()
    formatted = formatted.replace(/(\r\n|\n|\r)/gm, " ")
    
    let importantRe = /\w+ \d+ mg \w+/g
    let importantFound = importantRe.exec(formatted)[0]
    let importantList = importantFound.split(' ')

    let medicationName = importantList[0]
    let strength = importantList[1] + ' ' + importantList[2]
    let form = importantList[3]

    foundData = {...foundData, medicationName: medicationName, strength: strength, form: form}

    return foundData
}