// steps:
//   - make an XML string
//     - from an Array 
//   - from XML to array
//     - edit and save to XML

var savedXMLString="";
function makeXMLString(tag, inner){
    //function that makes an XML string from a passed;
    //tag (outer) & inner (the tag)

    var tmpArray = []; //used to join all 'items' of array
    tmpArray.push('<'+tag+'>');
    tmpArray.push(inner);
    tmpArray.push('</'+tag+'>')

    savedXMLString = tmpArray.join("");

    console.log('current String (savedXMLString)', savedXMLString);
}

//===========================
function makeXMLFromArray(arrayMe){
 var tmp = [];
 tmp.push('<'+arrayMe[0]+'>');
 tmp.push(arrayMe[1]);
 tmp.push('</'+arrayMe[0]+'>');
 return tmp;
}

//===========================

var savedXMLArray = [];
function fromXMLStringToArray(stringMe){
    //function that makes an Array from the XML String

    //(after pulling from LocalStorage - run fromXMLStringToArray())

    savedXMLArray = stringMe.split(/(?<=>)|(?=<)/g);
    console.log('savedXMLArray', savedXMLArray);
    
    return savedXMLArray;
    
}

var joinMe = "";
function bindForSaving(passed){
  //function to join Array elements
  //then save them as String
  //NEX? - run saveToLocal(passedArray)
  joinMe = passed.join('');
  console.log('variable - joinMe', joinMe);
  return joinMe;
}



var hold;
function holdMe(passed, toBeJoined){
    //background data to be held, to compare old XML String
    hold = passed;
    console.log('data held! (hold)', hold);

    if(toBeJoined){
      hold.splice(0,0, ...savedXMLArray);
    }
}


//=========================================

function insertInToXML(arr1, arr2, pos){
    //parsing data from one Array to a second Array
    //at a given position
    //second param - number of elements to delete = 0
    if(Array.isArray(arr1)==true && Array.isArray(arr2)==true){
      arr1.splice(pos, 0, ...arr2);
      console.log('Joined!\n'+arr1+' \n\nNow increased');
    }else{
      console.log('Params not Arrays!\nExiting');
    }

}
var index = []; 
function editWithinXML(searchTermp, arrayMe){
  //TODO - make XML editable
  //HOW??
  index = []; var ii=0;

  for(var i=0; i<arrayMe.length; i++){
      if(arrayMe[i] == '<name>'){
          index.push(i)
          for(var ii=i; ii<arrayMe.length; ii++){
            if(arrayMe[ii]== '</name>'){
              index.push(ii);
            }
          }
      }
  }
}



//=========================================
function saveToLocal(passed){
    // stores data to localStorage()
    //make sure to only save XML as a String!
    if(!passed){
        console.log("nothing to save!")
    }else if(typeof passed != 'string'){
      console.log('Param needs to be String'); 
    }else{
        localStorage.setItem('XMLMe', passed);
    }
  }
  
  function pullFromLocal(){
    // pulls data from localStorage()
    var pulled = localStorage.getItem('XMLMe');
    savedXMLString = pulled;
    savedXMLArray = fromXMLStringToArray(savedXMLString);
    return savedXMLString;
  }

    
//========================================
function makeIntoArray(){
    //function that takes in the working obj
    //even NECESSARY??

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
        };
    var result = Object.keys(workingArray).map(function(key) {
        return [(key), workingArray[key]];
      });
      
      console.log(result);
      
}

var globalPass = "";
function state(nameOfTask, tags){
    //function to get off the groun/d
    // makeXMLString(tag, inner);  //take in - spit out savedXMLString
    // fromXMLStringToArray(savedXMLString) // spits out savedXMLArray/

    //Chunk 1
    //makes a <taskName> node
    //saves to first[]
    makeXMLString('taskName', nameOfTask);
    fromXMLStringToArray(savedXMLString);
    var first = savedXMLArray;


    //Chuck 2
    //makes <tags> node - to be dumped into first[]
    makeXMLString('tags', tags);
    fromXMLStringToArray(savedXMLString);
    var second = savedXMLArray;

    //concat the 2 arrays
    insertInToXML(first, second, 3);
    
    //Chunk 3
    // take whole pile and inner it - to <task>
    makeXMLString('task', first);
    fromXMLStringToArray(savedXMLString);


    bindForSaving(savedXMLArray);

    globalPass = joinMe;

    // holdMe(savedXMLArray, join);   
}

function saveMe(){
    saveToLocal(globalPass)
}