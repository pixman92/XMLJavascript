// steps:
//   - make an XML string
//     - from an Array 
//   - from XML to array
//     - edit and save to XML


//========================================

var XMLMe =  '<team>77<people><name>sam</name><name>tim</name><place>home</place></people></team>';


//========================================
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
  //NEXT? - run saveToLocal(passedArray)
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

function insertArrayInToXML(arr1, arr2, pos){
    //parsing data from one Array to a second Array
    //at a given position
    //second param - number of elements to delete = 0
    if(Array.isArray(arr1)==true && Array.isArray(arr2)==true){
      arr1.splice(pos, 0, ...arr2);
      console.log('Joined!\n'+arr1+' \n\nNow increased');
    }else{
      console.log('Params not Arrays!\nExiting');
    }

    return arr1;

}
//========================================



///========================================
var pulledDataFromNamedTag=[];
function pullData(serachTerm){
  //function that pulls data from A BIG XMLString
  //-searches
  //-gets indexes
  //-runs through the 'next of kin' array elems

  //eg
  // search <name>Sam</name> - getting Sam back!

  pulledDataFromNamedTag=[];
  searchXMLTags(serachTerm);

  for(var i=0; i<foundIndexes.length; i+=2){
    console.log('i',i);
    var tmp = foundIndexes[i];

    tmp++;
    console.log('tmp', tmp);

    // foundIndexes[i];
    pulledDataFromNamedTag.push(XMLArray[tmp]);
  }

  console.log('pulledDataFromNamedTag', pulledDataFromNamedTag);

}


// var index = []; 
// function editWithinXML(searchTerm, arrayMe){
//   //TODO - make XML editable
//   //HOW??
//   index = []; var ii=0;

//   for(var i=0; i<arrayMe.length; i++){
//       if(arrayMe[i] == '<name>'){
//           index.push(i)
//           for(var ii=i; ii<arrayMe.length; ii++){
//             if(arrayMe[ii]== '</name>'){
//               index.push(ii);
//             }
//           }
//       }
//   }
// }

//========================================
function addDataToXMLArray(searchTerm, replacingData){
  searchXMLTags(searchTerm);    //takes in XMLMe & a searchTerm


  XMLArray[foundIndexes[0]+1]=replacingData;    //replaces the +1 (2nd) element of XMLArray

  console.log('XML', XMLArray);
  // bindForSaving()



}


//========================================
var foundIndexes=[];
var XMLArray=[];
function searchXMLTags(searchTerm){
  foundIndexes = [];
  XMLArray = fromXMLStringToArray(XMLMe);

    //logic that pulls all instances of an XML tag
    //pushes those indexes to an Array
    for(var i=0; i<XMLArray.length; i++){
      if(XMLArray[i] == '<'+searchTerm+'>'){
          // console.log('1 works', i);
          foundIndexes.push(i);
          // debugger;
          for(var ii=i; ii<XMLArray.length; ii++){
              if(XMLArray[ii] == '</'+searchTerm+'>'){
                  // console.log('ii', ii);
                  foundIndexes.push(ii);
                  ii=XMLArray.length+1;
              }
              // debugger;
          }
          // console.log('foundIndexes.length', foundIndexes.length );
          // i=foundIndexes[foundIndexes.length-1];
      }
  }
  console.log('foundIndexes', foundIndexes);
  return foundIndexes;
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
    insertArrayInToXML(first, second, 3);
    
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
//========================================
var holdForTmp=[];
function stateTwo(){
  //order of functioning
  fromXMLStringToArray(XMLMe);    //makes XMLstring into an array

  holdForTmp = savedXMLArray;     //holds XMLString (now an array)
  makeXMLString('duration', '10min');     // makes a new XMLString
  fromXMLStringToArray(savedXMLString);   // makes that into an Array

  console.log('NEXT? - insertArrayInToXML(holdForTmp, savedXMLArray, pos)'); // parrse one array into another

  console.log('joined (from stateTwo)');   //saved for later. currently working on editing within the array

}

function stateThree(searchTerm, addData){
  //XMLMe - XML test string
  


}