// steps:
//   - make an XML string
//     - from an Array 
//   - from XML to array
//     - edit and save to XML


//========================================

var XMLMe =  '<team><id>77</id><people><name>sam</name><name>tim</name><place>home</place></people></team><team><id>103</id><people><name>Leo</name></people></team>';


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
  //small helper function -> to make XMLString from a .length == 3 array
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

  //pull Data => array of positions

  //NEXT?
  //goUp one child, by XMLMe[] <index> - 1

}
//========================================
function addDataToXMLArray(searchTerm, replacingData){
  //function that takes in XMLMe & a searchTerm
  //pushes replacingData into position of Idex [0] + 1
  //eg
  //[1, 4, 5, 6]
  //[0]+1 = <index at 0> + 1 => 2

  //this function is CRITICAL for identifying and changing XML data

  searchXMLTags(searchTerm);    
  XMLArray[foundIndexes[0]+1]=replacingData;    //replaces the +1 (2nd) element of XMLArray

  console.log('XML', XMLArray);
  // bindForSaving()
}


//========================================
var foundIndexes=[];
var XMLArray=[];
function searchXMLTags(searchTerm){
  //function that pulls matched indexes of search term (opening & ending, for each instance)
  //the idea or "hoping" for - 1 open & close tag under the same name

  //eg
  //searching through 
  //1pass for open, 2pass for closed
  //pushed 2pass (ii) to nth pass (i)
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


//========================================
var indexSaved = [];
function withinRange(uid){
  //TODO - is this a place to look for given 'search term'

  indexSaved = [];
  var j=0; var l=1;
  searchXMLTags('id');
  pullWholeTag('id');
  pulledDataFromNamedTag.forEach((elem, index)=>{
    if(elem==uid){
      console.log('correct! ', elem, ' index of: ', index);
      indexSaved.push(foundIndexes[index]);
    }
  });

  console.log('indexSaved', indexSaved);
  
  // while(j<foundIndexes.length){
  //   var front = foundIndexes[j];
  //   var rear = foundIndexes[l];
  //   console.log('front', front);
  //   console.log('rear', rear);
  //   for(var i=front; i<=rear; i++){
  //     // console.log(savedXMLArray[i]);s
  //     // console.log('i');
  //     // debugger;
  //   }
  //   j=l;
  //   l++;
  // }


  // searchXMLTags(searchTerm);



}


//=======================================
function pullWholeTag(searchTerm){
  pullData(searchTerm);

  var front = foundIndexes[0];
  var rear = foundIndexes[1];
  for(var i=front; i<=rear; i++){
    console.log(savedXMLArray[i]);
  }

  // tmp = savedXMLArray[foundIndexes[0]-1];
  // console.log('UpOneTag', tmp);

}

//========================================

function diggingDirt(i){
  var tmpArray = fromXMLStringToArray(XMLMe);

  var word = tmpArray[i].substring(1, tmpArray[i].length-1);

  console.log('word!: ', word);

  searchXMLTags(word);


}


//========================================

function creatingIndexTree(){
  //OLD?
  // was intneded to be for creating a tree branching system
  var tmpArray = fromXMLStringToArray(XMLMe);
  var arrayOfNodesIndexes = [];


  var word1; var word2;
  for(var i=0; i<tmpArray.length; i++){
    // tmpArray.forEach((elem, index)=>{
    //   if(elem.substring(0, 1)=='<')
    // });
    word1 = tmpArray[i].substring(1, tmpArray[i].length);
    for(var j=0; j<tmpArray.length; j++){
      word2 = tmpArray[j].substring(2, tmpArray[j].length);
      if(word1==word2){
        console.log('matched! ', j);
        arrayOfNodesIndexes.push([i, j]);
        debugger
      }
    }
  }
  console.log('XMLMe', XMLMe);
  console.log('arrayOfNodesIndexes', arrayOfNodesIndexes);
}










//========================================
// USE INSTEAD
// addDataToXMLArray()
//========================================
// function makeNewInner(newInner){
//   //run pull whole tag,
//   //then change the inner!

//   // var tagName = foundIndexes[0];
//   savedXMLArray[foundIndexes[0]+1] = newInner;
//   console.log('New savdXMLArry\n', savedXMLArray);
// }


//=========================================
//STATE RUN Functions
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
    //function to get off the ground
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