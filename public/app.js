"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/* global enigma schema Filter Hypercube def def2 include */
var def = {
  qInfo: {
    qType: 'myObject'
  },
  qListObjectDef: {
    qDef: {
      qFieldDefs: ['Country'],
      qSortCriterias: [{
        qSortByState: 1,
        qSortByAscii: 1
      }]
    },
    qInitialDataFetch: [{
      qTop: 0,
      qLeft: 0,
      qWidth: 1,
      qHeight: 10
    }]
  }
};
var def2 = {
  qInfo: {
    qType: 'myObject'
  },
  qHyperCubeDef: {
    qDimensions: [{
      qDef: {
        qFieldDefs: ['Country'],
        qSortCriterias: [{
          qSortByState: 1,
          qSortByAscii: 1
        }]
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
};

var Filter = /*#__PURE__*/function () {
  function Filter(elementId, options) {
    _classCallCheck(this, Filter);

    var DEFAULTS = {};
    this.elementId = elementId;
    this.options = _extends({}, DEFAULTS, options);
    var el = document.getElementById(this.elementId);

    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
      el.innerHTML = "<ul id='".concat(this.elementId, "_list'></ul>");
      this.options.model.on('changed', this.render.bind(this));
      this.render();
    } else {
      console.error("No element found with id - ".concat(this.elementId));
    }
  }

  _createClass(Filter, [{
    key: "handleClick",
    value: function handleClick(event) {
      console.log(event);

      if (event.target.classList.contains('list-item')) {
        var elemNumber = event.target.getAttribute('data-elem');
        this.options.model.selectListObjectValues('/qListObjectDef', [+elemNumber], true);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      this.options.model.getLayout().then(function (layout) {
        console.log(layout);
        var html = layout.qListObject.qDataPages[0].qMatrix.map(function (row) {
          return "\n      <li data-elem=\"".concat(row[0].qElemNumber, "\" class='list-item state-").concat(row[0].qState, "'>").concat(row[0].qText, " - ").concat(row[0].qState, "</li>\n      ");
        }).join('');
        var el = document.getElementById("".concat(_this.elementId, "_list"));

        if (el) {
          el.innerHTML = html;
        }
      });
    }
  }]);

  return Filter;
}();
/* global model */


var Hypercube = /*#__PURE__*/function () {
  function Hypercube(elementId, options) {
    _classCallCheck(this, Hypercube);

    var DEFAULTS = {};
    this.elementId = elementId;
    this.options = _extends({}, DEFAULTS, options);
    this.options.model.on('changed', this.render.bind(this));
    var el = document.getElementById(this.elementId);
    el.innerHTML = "<ul id='".concat(this.elementId, "_list'></ul>");
    this.render();
  }

  _createClass(Hypercube, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      this.options.model.getLayout().then(function (layout) {
        var html = layout.qHyperCube.qDataPages[0].qMatrix.map(function (row) {
          return "<li data-elem=\"".concat(row[0].qElemNumber, "\" class='list-item state-").concat(row[0].qState, "'>").concat(row[0].qText, " - ").concat(row[0].qState, "</li>");
        } // for (let i = 0; i < layout.qHyperCube.qDataPages[0].qMatrix.length; i++) {
        //   console.log('esto es el texto', layout.qHyperCube.qDataPages[0].qMatrix[i][0].qText)
        //   rows = layout.qHyperCube.qDataPages[0].qMatrix[i][0].qText
        // for (let j = 0; j < layout.qHyperCube.qDataPages[0].qMatrix[i].length; j++) {
        //   console.log('esto es el texto', layout.qHyperCube.qDataPages[0].qMatrix[i][j].qText)
        // }
        // }
        ).join('');
        console.log(_this2.elementId);
        var el = document.getElementById(_this2.elementId);
        el.innerHTML = html;
      });
    }
  }]);

  return Hypercube;
}();

var config = {
  schema: window.schema,
  url: 'wss://ec2-3-86-99-193.compute-1.amazonaws.com/app/cee97e28-59cf-411f-acb5-c3a7f40ee7ac'
};
var session = enigma.create(config);
session.open().then(function (global) {
  global.openDoc('cee97e28-59cf-411f-acb5-c3a7f40ee7ac').then(function (app) {
    app.createSessionObject(def).then(function (model) {
      console.log('this is model', model);
      model.getLayout().then(function (layout) {
        console.log('LAYOUT', layout);
        var f = new Filter('filter1', {
          model: model
        });
      });
    });
    app.createSessionObject(def2).then(function (model) {
      var h = new Hypercube('hypercube1', {
        model: model
      }); // const pageDefs = [{
      //   qTop: 50,
      //   qLeft: 0,
      //   qWidth: 2,
      //   qHeight: 50
      // }]
      // model.getHyperCubeData('/qHyperCubeDef', pageDefs).then(pages => {
      //   console.log('pages', pages)
      // })
    });
  });
});
