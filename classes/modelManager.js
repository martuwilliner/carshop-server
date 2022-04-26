const fs = require('fs')
const path = require('path')

class modelManager {

    constructor(file) {
        this.file = path.join(__dirname, '../data/' + file + '.json')
    }

    index() {
        let data = fs.readFileSync(this.file, 'utf8')
        let list = JSON.parse(data)
        return list
    }

    show(id) {
        let data = fs.readFileSync(this.file, 'utf8')
        let list = JSON.parse(data)
        let element = list.find(e => e.id === id)
        if (!element) return null
        return element
    }   

    create(newone) {
        let data = fs.readFileSync(this.file, 'utf8')
        let list = JSON.parse(data)
        let element = list[list.length - 1];
        let id = list.length > 0 ? element.id + 1 : 1;
        let newElement = Object.assign({}, newone, { id })
        list.push(newElement)
        fs.writeFileSync(this.file, JSON.stringify(list, null, 2))
        return newElement
    }

    update(id, element) {
        let data = fs.readFileSync(this.file, 'utf8')
        let list = JSON.parse(data);
        let product = Object.assign({}, element, { id })
        let update = list.map(prod => prod.id === product.id ? product : prod)
        fs.writeFileSync(this.file, JSON.stringify(update, null, 2))
        return product
    }

    destroy(id) {
        let data = fs.readFileSync(this.file, 'utf8')
        let list = JSON.parse(data);
        list = list.filter(e => e.id !== id);
        fs.writeFileSync(this.file, JSON.stringify(list, null, 2))
        return list
    }
    writeData(data) {
        fs.writeFileSync(this.file, JSON.stringify(data, null, 2))
    }
    
}

module.exports = modelManager;