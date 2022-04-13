const stageTable = {
  'n.0 route' :     [ '1.0', '2.0', '3.0', '4.0', '5.0', '6.0', '7.0' ],
  'n.1 route' :     [ '1.0', '2.0', '3.0', '4.0', '5.0', '6.1', '7.1' ],
  'n.2 route' :     [ '1.0', '2.0', '3.0', '4.0', '5.0', '6.2', '7.2' ],
  'DLC X route' :   [ 'X1.0', 'X2.0', 'X3.0', 'X4.0', 'X5.0', 'X6.0', 'X7.0' ],
  'DLC Y route' :   [ 'Y1.0', 'Y2.0', 'Y3.0', 'Y4.0', 'Y5.0', 'Y6.0', 'Y7.0' ]
};

const rSetTable = {
  'Pure set': [
    [ 'R-9A / Arrow Head', 'R-9A2 / Delta' ],
    [ 'R-9C / War Head', 'R-9K / Sunday Strike' ],
    [ 'R-9/0 / Ragnarok', 'R-9/02 / Ragnarok II' ],
    [ 'R-9Leo / Leo' ],
    [ 'RX-10 / Albatross', 'R-13A / Cerberos' ],
    [ 'R-9D / Shooting Star', 'R-9F / Andromalius' ],
    [ 'R-99 / Last Dancer', 'R-100 / Curtain Call',
      'R-101 / Grand Finale', 'R-9uso801 / April Fools II' ]
  ],

  'Xtend set': [
    [ 'R-9WZ / Disaster Report' ],
    [ 'R-9B3 / Sleipnir', 'TX-T / Eclipse' ],
    [ 'R-11B / Peace Maker' ],
    [ 'OF-1 / Daedalus', 'OFX-2 / Valkyrie',
      'OF-3 / Garuda', 'OFX-4 / Songokuu',
      'OF-5 / Kaguya', 'OFX-X / Mariko' ],
    [ 'TP-3 / Mr. Heli' ],
    [ 'RX-12 / Cross the Rubicon' ],
    [ 'BX-4 / Arvanche' ]
  ],

  'Bydo set': [
    [ 'BX-T / Dantalion' ],
    [ 'B-1C3 / Amphibian III' ],
    [ 'B-1D3 / Bydo System γ' ],
    [ 'BX-2 / Platonic Love' ],
    [ 'B-3B2 / Metalic Dawn II' ],
    [ 'B-5A / Craw Craw' ],
    [ 'B-5C / Platinum Heart' ]
  ],

  'Elementary set': [
    [ 'R-9A / Arrow Head' ],
    [ 'R-9B / Strider' ],
    [ 'R-9C / War Head' ],
    [ 'R-9D / Shooting Star' ],
    [ 'R-9E / Midnight Eye' ],
    [ 'R-9F / Andromalius' ],
    []
  ],

  're/Corps set': [
    [ 'R-9AF / Morning Glory' ],
    [ 'R-9S / Strike Bomber' ],
    [ 'R-9Leo2 / Leo II' ],
    [ 'R-9WB / Happy Days' ],
    [ 'R-9B3 / Sleipnir' ],
    [ 'TX-T / Eclipse' ],
    [ 'R-13B / Charon' ]
  ],

  're/Ace set': [
    [ 'R-9K / Sunday Strike' ],
    [ 'R-9Sk / Dominions' ],
    [ 'R-9W / Wise Man' ],
    [ 'R-9DP / Kenrokuen' ],
    [ 'TW-1 / Kiwi Berry' ],
    [ 'TL-2B2 / Hyllos' ],
    [ 'R-13T / Echidna' ]
  ],

  'Nightmare set': [
    [ 'R-9ER2 / Unchained Silence' ],
    [ 'OF-3 / Garuda' ],
    [ 'TP-2M / Frogman' ],
    [ 'TL-2A2 / Neoptolemos' ],
    [ 'B-1B3 / Mad Forest III' ],
    [ 'B-3A2 / Misty Lady II' ],
    [ 'B-5D / Diamond Wedding' ]
  ]
};

class rSet {

  constructor( rSetName, wild = '' ) {
    this.name = rSet;
    this.table = Array.from(rSetTable[rSetName]);

    if ( wild != '' && this.name == 'Elementart set' ) {
      var lastGroup = this.table.length - 1;
      this.table[lastGroup][0] = wild;
    }
  }

  setTable( rSetName, wild = '' ) {
    this.name = rSetName;
    this.table = Array.from(rSetTable[rSetName]);

    if ( wild != '' ) {
      this.setWild( wild );
    }

    return this.table;
  }

  getGroupDict() {
    var dict = {};

    this.table.forEach( function( group, index ) {
      group.forEach( function( rCraft ) {
        dict[rCraft] = index;
      } );
    } );

    return dict;
  }

  setWild( wild ) {
    if ( this.name == 'Elementary set' ) {
      var lastGroup = this.table.length - 1;
      this.table[lastGroup][0] = wild;
    }

    return this.table;
  }
}

class formation {
  constructor( rSetName, wild = '' ) {
    this.rSet = new rSet( rSetName, wild = '');
    this.formation = new Array(7);

    var groupDict = this.rSet.getGroupDict();

    for ( var index = 0; index < this.rSet.table.length; index++ ) {
      var rCraft = this.rSet.table[index][0];

      this.formation[index] = {
        'rCraft': rCraft,
        'group': groupDict[rCraft]
      };
    }
  }

  setFormationByRSet( rSetName, wild = '') {
    var rSet = this.rSet.setTable( rSetName, wild );
    var groupDict = this.rSet.getGroupDict();

    this.formation.forEach( function( dict, index ) {
      var rCraft = rSet[index][0];
      dict.rCraft = rCraft;
      dict.group = groupDict[rCraft];
    } );

    return this.formation;
  }

  setFormation( index, rCraft ) {
    var groupDict = this.rSet.getGroupDict();

    this.formation[index].rCraft = rCraft;
    this.formation[index].group = groupDict[rCraft];

    return this.formation;
  }

  setWild( wild ) {
    if ( this.rSet.name == 'Elementary set' ) {
      this.formation[this.formation.length - 1].rCraft = wild;
    }

    return this.formation;
  }

  getFormation() {
    var array = new Array(0);

    for ( var formation of this.formation ) {
      array.push(formation.rCraft);
    }

    return array;
  }

  getGroup() {
    var array = new Array(0);

    for ( var formation of this.formation ) {
      array.push(formation.group);
    }

    return array;
  }

}

class selectors {
  constructor() {
    this.reporter = document.getElementById('reporter');

    this.reporter.onchange = function() {
      this.showSummary();
    }.bind(this)

    this.difficulty = document.getElementById('difficulty');

    this.difficulty.onchange = function() {
      this.checkLimiter();
      this.showSummary();
    }.bind(this)

    this.route = document.getElementById('route');

    this.route.onchange = function() {
      this.setRoute();
      this.checkLimiter();
      this.showSummary();
    }.bind(this)

    this.rSetName = document.getElementById('rSetName');

    this.rSetName.onchange = function() {
      this.setFormation();
      this.getWild();
      this.checkLimiter();
      this.showSummary();
    }.bind(this)

    this.limiter = document.getElementById('limiter');

    this.wildcard = document.getElementById('wildcard');

    this.wildcard.onchange = function() {
      this.getWild();
      this.showSummary();
    }.bind(this)

    this.stage = new Array(7);

    for ( var index = 0; index < this.stage.length; index++ ) {
      this.stage[index] = document.getElementById( 'stage' + String( index + 1 ) );
      this.stage[index].innerHTML = stageTable[this.route.value][index];
    };

    this.rSelector = new Array(7);

    for ( var index = 0; index < this.rSelector.length; index++ ) {
      this.rSelector[index] = document.getElementById( 'rCraft' + String( index + 1 ) );

      this.rSelector[index].onchange = function() {
        var index = event.target.id.replace( /[^\d]/g, '' ) - 1;
        this.setFormation( index , event.target.value );
        this.showSummary();
      }.bind(this)

    }

    this.rFormation = new formation( this.rSetName.value, this.wildcard.value );

    this.summary = document.getElementById('summary');

  }

  init() {
    this.setRoute();
    this.setFormation();
    this.getWild(this.wildcard.value);
    this.checkLimiter();
    this.showSummary();
  }

  checkLimiter() {
    var flag = false;

    if ( this.difficulty.value == 'NORMAL' && this.route.value.slice(0, 1) == 'n' && this.rSetName.value != 'Nightmare set' ) {
      this.limiter.innerHTML = 'On.';
      this.limiter.style.color = 'revert';
    } else {
      this.limiter.innerHTML = 'Check your limiter state.';
      this.limiter.style.color = '#dd2222';
      flag = true;
    }

    return flag;
  }

  setRoute() {
    var route = this.route.value;

    this.stage.forEach( function( stage, index ) {
      stage.innerHTML = stageTable[route][index]+':';
    } );

    return 0;
  }

  getWild() {
    var wild = this.wildcard.value;
    if ( this.rSetName.value == 'Elementary set' ) {
      wildcard.parentElement.style.display = 'inline';
      this.rFormation.setWild( wild );

      for ( var selector of this.rSelector ) {
        selector.lastChild.text = wild;
        selector.lastChild.value = wild;
      }

    } else {
      wildcard.parentElement.style.display = 'none';
    }

    return wild;
  }

  setFormation( index = '', rCraft = '' ) {

    if ( index == '' && rCraft == '' ) {
      var formation = this.rFormation.setFormationByRSet( rSetName.value, wildcard.value );
      var rSelectorList = this.rSelector
      var optionTable = this.getOptions();

      rSelectorList.forEach( function( selector, index ) {

        while ( selector.firstChild ) {
          selector.removeChild( selector.firstChild );
        }

        optionTable[index].forEach( function( option ) {
          selector.appendChild( option );
        } );

      } );
    } else {
      var formation = this.rFormation.setFormation( index, rCraft )
    }

    this.setOptionClass();

    return rSet;

  }

  getOptions() {
    var optionTable = new Array(0);
    var rSet = this.rFormation.rSet.table;

    for ( var sIndex = 0; sIndex < this.rSelector.length; sIndex++ ) {
      var optionList = new Array(0);

      rSet.forEach( function( group, index ) {
        var selectFlag = true;

        for ( var rCraft of group ) {
          var option = document.createElement('option');

          option.text = rCraft;
          option.value = rCraft;

          if ( selectFlag && sIndex == index ) {
            option.selected = true;
            selectFlag = false;
          }

          optionList.push(option);
        }

      } );

      optionTable.push(optionList);
    }

    return optionTable;
  }

  setOptionClass() {
    var rSelector = this.rSelector;
    var group = this.rFormation.getGroup();
    var rSet = this.rFormation.rSet.table;

    rSelector.forEach( function( selector, sIndex ) {

      var reserved = new Set();

      group.forEach( function( group, fIndex ) {
        if ( sIndex != fIndex ) {
          for ( var rCraft of rSet[group] ) {
            reserved.add( rCraft );
          }
        }
      } );

      for ( var option of selector.children ) {
        if ( reserved.has( option.value ) ) {
          option.className = 'reserved';
        } else {
          option.className = '';
        }

      }

    } );

  }

  showSummary() {
    var check = new Set();

    for ( var group of this.rFormation.getGroup() ) {
      check.add( group );
    }

    var summary = document.getElementById('summary')

    while ( summary.firstChild ) {
      summary.removeChild( summary.firstChild );
    }

    summary.className = '';

    var playInfo = document.createElement('p');
    playInfo.className = 'play';

    var stageInfo = document.createElement('p');
    stageInfo.className = 'stage';

    var reporter = '';

    if ( this.reporter.value == '' ) {
      reporter = '<span class="alert">Enter reporter name.</span>'
    } else {
      reporter = this.reporter.value;
    }

    playInfo.innerHTML =`
      Reporter name: ${reporter}<br>
      R-Craft set: ${this.rSetName.value}<br>
      Route: ${this.route.value}<br>
      Difficulty: ${this.difficulty.value}
    `
    summary.appendChild(playInfo);

    if ( check.size == 7 ) {
      var stage = stageTable[this.route.value];
      var formation = this.rFormation.getFormation();
      var br = '<br>';

      stage.forEach( function ( stage, index, array ) {
        if ( index == array.length - 1 ) {
          br = ''
        }

        stageInfo.innerHTML += `Stage ${stage}: ${formation[index]}${br}`
      } );

    } else {
      stageInfo.innerHTML = 'Stage: Unauthorized.';
      stageInfo.className = 'alert';
    }

    summary.appendChild(stageInfo);

    return 0;
  }
}

var generator = new selectors();
generator.init()
// vim: set expandtab tabstop=2 foldmethod=syntax :
