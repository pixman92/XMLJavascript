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

var savedXMLArray = [];
function fromXMLStringToArray(stringMe){
    //function that makes an Array from the XML String

    //(after pulling from LocalStorage - run fromXMLStringToArray())

    savedXMLArray = stringMe.split(/(?<=>)|(?=<)/g);
    console.log('savedXMLArray', savedXMLArray);
    
    return savedXMLArray;
    
}
var hold;
function holdMe(passed){
    //background data to be held, to compare old XML String
    hold = passed;
    console.log('data held! (hold)', hold);
}


//=========================================

function insertInToXML(arr1, arr2, pos){
    //parsing data from one Array to a second Array
    arr1.splice(pos, 0, ...arr2);
}

//=========================================
function saveToLocal(){
    // stores data to localStorage()s
    if(!savedXMLString){
        console.log("nothing to save!")
    }else{
        localStorage.setItem('XMLMe', savedXMLString);
    }
  }
  
  function pullFromLocal(){
    // pulls data from localStorage()
    var pulled = localStorage.getItem('XMLMe');
    savedXMLString = pulled;
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
function state(tag, inner){
    //function to get off the ground
    makeXMLString(tag, inner);  //take in - spit out savedXMLString
    fromXMLStringToArray(savedXMLString) // spits out savedXMLArray

    

    holdMe(savedXMLArray);

    
}