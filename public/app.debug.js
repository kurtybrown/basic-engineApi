/* global enigma schema Filter Hypercube def def2 include */

const def = {
  qInfo: {
    qType: 'myObject'
  },
  qListObjectDef: {
    qDef: {
      qFieldDefs: ['Country'],
      qSortCriterias: [ { qSortByState: 1, qSortByAscii: 1 } ]
    },
    qInitialDataFetch: [{
      qTop: 0,
      qLeft: 0,
      qWidth: 1,
      qHeight: 10
    }]
  }
}

const def2 = {
  qInfo: {
    qType: 'myObject'
  },
  qHyperCubeDef: {
    qDimensions: [{ 
      qDef: { 
        qFieldDefs: ['Country'], 
        qSortCriterias: [ { qSortByState: 1, qSortByAscii: 1 } ]
      } 
    }],
    qMeasures: [{ 
      qDef: { 
        qDef: 'Sum([Sales Amount])', 
        qLabel: 'Sales' 
      }, 
      qSortBy: {
        qSortByNumeric: -1
      }
    }],
    qInitialDataFetch: [{
      qTop: 0,
      qLeft: 0,
      qWidth: 2,
      qHeight: 100
    }]
  }
}


class Filter {
  constructor (elementId, options) {
    const DEFAULTS = {}
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      el.innerHTML = `<ul id='${this.elementId}_list'></ul>`
      this.options.model.on('changed', this.render.bind(this))
      this.render()
    }
    else {
      console.error(`No element found with id - ${this.elementId}`)
    }
  }
  handleClick (event) {
    console.log(event)
    if (event.target.classList.contains('list-item')) {
      const elemNumber = event.target.getAttribute('data-elem')
      this.options.model.selectListObjectValues('/qListObjectDef', [+elemNumber], true)
    }
  }
  render () {
    this.options.model.getLayout().then(layout => {
      console.log(layout)
      let html = layout.qListObject.qDataPages[0].qMatrix.map(row => `
      <li data-elem="${row[0].qElemNumber}" class='list-item state-${row[0].qState}'>${row[0].qText} - ${row[0].qState}</li>
      `).join('')
      const el = document.getElementById(`${this.elementId}_list`)
      if (el) {
        el.innerHTML = html
      }
    })
  }
}

/* global model */
class Hypercube {
  constructor (elementId, options) {
    const DEFAULTS = {}
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    this.options.model.on('changed', this.render.bind(this))
    const el = document.getElementById(this.elementId)
    el.innerHTML = `<ul id='${this.elementId}_list'></ul>`
    this.render()
  }

  render () {
    this.options.model.getLayout().then(layout => {
      let html = layout.qHyperCube.qDataPages[0].qMatrix.map(row => 
        `<li data-elem="${row[0].qElemNumber}" class='list-item state-${row[0].qState}'>${row[0].qText} - ${row[0].qState}</li>`
        // for (let i = 0; i < layout.qHyperCube.qDataPages[0].qMatrix.length; i++) {
        //   console.log('esto es el texto', layout.qHyperCube.qDataPages[0].qMatrix[i][0].qText)
        //   rows = layout.qHyperCube.qDataPages[0].qMatrix[i][0].qText
        // for (let j = 0; j < layout.qHyperCube.qDataPages[0].qMatrix[i].length; j++) {
        //   console.log('esto es el texto', layout.qHyperCube.qDataPages[0].qMatrix[i][j].qText)
        // }
        // }
      ).join('')
      console.log(this.elementId)
      const el = document.getElementById(this.elementId)
      el.innerHTML = html
    })
  }
}


const config = {
  schema: window.schema,
  url: 'wss://ec2-3-86-99-193.compute-1.amazonaws.com/app/cee97e28-59cf-411f-acb5-c3a7f40ee7ac'
}

const session = enigma.create(config)

session.open().then(global => {
  global.openDoc('cee97e28-59cf-411f-acb5-c3a7f40ee7ac').then(app => {
    app.createSessionObject(def).then(model => {
      console.log('this is model', model)

      model.getLayout().then(layout => {
        console.log('LAYOUT', layout)

        const f = new Filter('filter1', { model })
      })
    })

    app.createSessionObject(def2).then(model => {
      const h = new Hypercube('hypercube1', { model })

      // const pageDefs = [{
      //   qTop: 50,
      //   qLeft: 0,
      //   qWidth: 2,
      //   qHeight: 50
      // }]
      // model.getHyperCubeData('/qHyperCubeDef', pageDefs).then(pages => {
      //   console.log('pages', pages)
      // })
    }) 
  })
})
