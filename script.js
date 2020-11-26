// function makeSingleXMLElement(elem, text){
//   //makes single elements
//   //can be recursive -> re-enter the old elem into new elem
//   var str = '<'+elem+'>'+text+'</'+elem+'>';
  
//   // debugger;
//   return str;
// }

function saveToLocal(whatToSave, num){
  // stores data to localStorage()s
  localStorage.setItem('elemSaved'+num, whatToSave);
}

function pullFromLocal(numToPull){
  // pulls data from localStorage()
  var pulled = localStorage.getItem('elemSaved'+numToPull);
  return pulled;
}

//========================


//==========================

var passing;
var madeOfObj=[];var objString="";
function passObjToXML(obj, objHead){
  // XMLString ="<game><Goal><title>this is my first Goal</title><record1>hello there</record1></Goal><TimeFrame><game>";
  var XMLStringNowObj={}

  // var tmpObj = {
  //   'name': 'sam',
  //   'date': 'yesterday', 
  //   'siblings': '2'
  // };
  
  passing = new XMLStringMe();
  for(prop in obj){
    console.log(prop+'  '+obj[prop]);
    madeOfObj.push(passing.makeSingleXMLElement(prop, [obj[prop]]));
    // console.log(madeOfObj);
  }
  debugger;
  
  madeOfObj.forEach((elem)=>{
    elem.forEach((elem2)=>{
        console.log(elem2);
        objString+=elem2;
    });
  });
  debugger;
  

  passing.makeSingleXMLElement(objHead, [objString])
  
  // madeOfObj = madeOfObj.join('');

  console.log("String (with head added)", passing.arrayForBuilding);
  
  // passing.addItemToArray(0, [passing.arrayForBuilding]);
  
  
  // debugger;
  //Goal
  //score
  //10
  //score
  //Goal
  
  // passing.regExMain(objString);
}

//=========================

var returnObj = {};var persistIndex=0;
function pullBackData(searchTerm){
  //function that pulls out of '[]' data variable and pushes back into an Obj
  
  //TODO? - flow of logic and control
  
  var pullBackArray=[];
  
  console.log(pullBackArray);
  var returningSearch = [];
  
  // passing.searchForTag(searchTerm);
  
  returningSearch.push(passing.searchForTag(searchTerm));
  
  console.log(returningSearch);
  
  returningSearch.forEach((elem)=>{
  returnObj[persistIndex] = elem;
  });
  
  persistIndex++;
  
  console.log("returnObj", returnObj);
  
  debugger;
}

var workingArray={};
function load(){
  
  workingArray={
    "name": "sam",
    "date": "yesterday",
    "family": {
      "sisters": 1,
      "brothers": 2,
      "parents": 2,
      "grandFolk": {
        "tom": {
          "age": 89,
          "home": "left street",
        },
        "jane":{
          "age": 80,
          "home": "state street",
        },
       },
       "nieces": 1,
      }
    }
}
  
var arr = [];
var keepingIndexesOfObjs = [];
var tmpWorkingArray = {};
function objToNthLevel(){
  //function to take any Nth amount of children and push them to an array
  
  
  var tally=0;
  function me(obj){
      for(var o in obj){
        // console.log(obj[o]);
        tally++;
          if(typeof obj[o] == "object"){
              arr.push(o);
              me(obj[o]);
              console.log(o + '  **is an object**');
              keepingIndexesOfObjs.push(tally);
              console.log("?? - "+ tally);
          }
          else{
            console.log(o+'  '+obj[o]);
            arr.push([o, obj[o]])
          }
     
      }
  }
  me(workingArray);
  
  debugger;
  
  
}

var arrayOfDepths=[];
function toXML(){
  //seems to be the spot where XMLStringMe() is called
  //and assigned a variable

  
  passing = new XMLStringMe();
  for(var elem in arr){
    if(arr[elem].length==2){
      passing.makeSingleXMLElementd(arr[elem][0], [arr[elem][1]]);
      arrayOfDepths.push(passing.arrayForBuilding);
      
    }else{
      // passing.makeSingleXMLElement(arr[elem]);
      arrayOfDepths.push('<'+arr[elem]+'>');
    }

  }
  console.log(arrayOfDepths);
  debugger;
}

//================================


var savedArray=[]; var savedIndexesArray = [];
var tally = 0; var objLength = 0;
function runMakeToArray(obj){
  //function that takes in an OBJ
  //parses, and find
  
  for(var i in obj){//run through obj (round 1)
    if(typeof obj[i] == "object"){
      console.log(i);
      console.log("\n+++++object,", obj[i]);

      savedArray.push(i);
      savedArray.push([obj[i], '...']);
      for(var ii in obj){ //run through recursive obj, (round 2)
         objLength++;
      }
       savedIndexesArray.push([i, objLength]); //save an Array for pushing to it, previous name and the length for which the 'key' bookends the array
  
      console.log('tally', tally);
      tally++;
      runMakeToArray(obj[i]);
    }else{
        savedArray.push([i, obj[i]]);
    }
    debugger;
  }

}

runMakeToArray(tmpWorkingArray);
  
