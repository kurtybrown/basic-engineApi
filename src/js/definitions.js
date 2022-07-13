
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
