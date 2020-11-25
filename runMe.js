// run me file
// var xmlparse;
// runMe function - to make 'elements' that will encapsilate themselves
// then add to the BIG array, at 'index' position

// function runMe(){
//   xmlparse = new XMLStringMe();
  
//   var tmp = xmlparse.makeSingleXMLElement('feelings', ['tired']);
  
//   var tmp2 = xmlparse.makeSingleXMLElement('today', tmp);
  
  
//   xmlparse.addItemToArray(0, tmp2);
  
  
  
  
// }

function runMe(){
  passObjToXML({
    'name': 'sam',
    'date': 'yesterday',
    'siblings': '2'
  }, 'Today');

  passing.addItemToArray(0, passing.arrayForBuilding)

  console.log(passing.printXML());
  
  
  pullBackData('name');
  
  debugger;

}