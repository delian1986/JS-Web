const fs = require('fs')
const path = require('path')
const storagePath = path.join(__dirname, './storage.json')

let storage = {}

function checkKeyIsString(key) {
    if (typeof key !== 'string') {
        throw new TypeError('Your key is not a string!')
    }
}

function checkIfKeyExists(key) {
    if (storage.hasOwnProperty(key)) {
        throw new Error('Your key already exists!')
    }
}

function checkIfKeyAlreadyExists(key) {
    if (!storage.hasOwnProperty(key)) {
        throw new Error('Your key doesn\'t exists')
    }
}

function checkIfStorageIsEmpty() {
    if (Object.keys(storage).length === 0) {
        throw new Error('Your storage is empty!')
    }
}

function put(key, value) {
    checkIfKeyExists(key)
    checkKeyIsString(key)

    storage[key] = value
    console.log('storage object saved im memory')
}

function update(key, value) {
    checkIfKeyAlreadyExists(key)
    let oldValue = storage[key]
    storage[key] = value
    console.log(`Key: ${key} updated from ${oldValue} to ${storage[key]}`)
}

function get(key) {
    checkKeyIsString(key)
    checkIfKeyAlreadyExists(key)

    console.log(storage[key])
}

function getAll() {
    checkIfStorageIsEmpty()
    console.log('All storage')
    for (let key in storage) {
        console.log(`Key: ${key}, value: ${storage[key]}`)
    }
}

function deleteKey(key) {
    checkIfKeyAlreadyExists(key)
    delete storage[key]
    console.log(`Key: ${key} deleted`)
}

function clear() {
    storage = {}
    console.log('Your storage was cleared')
}

function save() {
    let json = JSON.stringify(storage)

    fs.writeFile(storagePath,json,'utf-8', (err,data) => {
        if (err) {
            console.log(err);
        }
    })
    console.log('Your storage was saved to file')

}

function load() {
    if(fs.existsSync(storagePath) ===false){
        return
    }

    fs.readFile(storagePath,'utf-8',(err,data)=>{
        if(err){
            return
        }
        storage=JSON.parse(data)
    })
    console.log('File loaded in memory')
    getAll()
}

module.exports = {
    put,
    get,
    getAll,
    update,
    deleteKey,
    clear,
    save,
    load
}