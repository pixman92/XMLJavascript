// second attempt for XML decoding

var globalBIGArray = [];  //array for all data to be pulled
var indexFound = -1;    //if no search index is returned
var indexesReturnSearch=[]; //array of indexes returned after search

var str = "";

//create:
//var tmp =  new XMLStringMe
// tmp.regExMain() - pulls apart strings
// tmp.searchForTag('something') -> returns an

//===============================
class XMLStringMe{
  // class - used for decoding XML (my own version)
  
  constructor(XMLString){
    this.XMLString = XMLString;
    // this.XMLString = XMLString ="<game><Goal><title>this is my first Goal</title><record1>hello there</record1></Goal><TimeFrame><game>";


    this.allDataPulledBIG = [];   //returned variable for parsed RegEx
    
    
    // this.bigArray = this.XMLString;   //used to compare the elements in RegEx, and return the 'chunk' of saved data

    this.sortedArray=[];
    this.sortedInner=[];
    
    
    this.arrayForBuilding = [];
  }
  
  // ========================
  
  
  makeSingleXMLElement(elem, text/*text HAS to be an Array!*/){
    //makes single elements
    //can be recursive -> re-enter the old elem into new elem
    
    if(typeof text === 'array'){

      // console.log('its an array!');
      var tmpArray=[];  //reset tmpArray  
      var tmpStr = "";
  
      tmpArray.push('<'+elem+'>');
      text.forEach((elm)=>{     //critical to making Recursive calls work!
        tmpArray.push(elm);
      });
      // tmpArray.push(text);   //old school way of thinking
      tmpArray.push('</'+elem+'>')
      
      tmpStr = tmpArray.join("");
      
      // debugger;
      
      this.arrayForBuilding = tmpStr.split(/(?<=>)|(?=<)/g);
      
      // debugger;
      
      
      console.log("arrayForBuilding", this.arrayForBuilding);
      
      console.log("=====\nStep2? - addItemToArray( arrayForBuilding)")
      
      debugger;

      //return this, push the ARRAY into <addItemToArray>
      return this.arrayForBuilding;
    }else{
      console.log('text(2nd) parameter MUST be an array to procceed!');
    }
  }
  
  // ========================
  
  regExMain(stringToSplit){
    //function that uses RegEx to pull the data from a string, that will soon be a File(for python)
    
    //? is there an XML string already present?
    if(stringToSplit==""||!stringToSplit){
      var strTmp = this.XMLString; 
    }else{
      var strTmp = stringToSplit;
    }
    
    this.allDataPulledBIG = strTmp.split(/(?<=>)|(?=<)/g);
 
    debugger;
    
    globalBIGArray = this.allDataPulledBIG; //used for other functions, to act on divided Array[]
    
    return this.allDataPulledBIG;
    
  }
  

  
  printXML(){
    if(globalBIGArray==""){
      console.log("globalBIGArray empty");
    }else{
      console.log(globalBIGArray);
    }
    
  }
  
  // ==========================
  
  searchForTag(searchTerm){
    //takes in a <searchTerm>
    //looks for matching in (split XMLString)
    //then combines fromstart to finish of the found indexes
    
    indexesReturnSearch = []; //crucial for Repeat calls this function
    
    globalBIGArray.forEach((elem, index)=>{
    if(searchTerm == elem.substring(1, elem.length-1)){
    
        indexesReturnSearch.push(index);
        console.log('Found!: ', index);
        
    }
    if(searchTerm == elem.substring(2, elem.length-1)){
      console.log('Found end!:', index);
      indexesReturnSearch.push(index);
    }
      
    });
    var tmpArray=[];
    // debugger;
    for(var i=indexesReturnSearch[0]; i<=indexesReturnSearch[1]; i++){
      //for loop -> pushing through elements
      tmpArray.push(globalBIGArray[i]);
      debugger;
    }
    
    console.log('found matching Tag, at: ', indexesReturnSearch[0]);
    
    debugger;
    // indexFound = indexesReturnSearch[0]; //pumps the first found index to a global variable. to be called when 'splice'-ing the globalBIGArray
    console.log(tmpArray);
    return tmpArray;
  }
  
  // ==============================
  
  addItemToArray(index, item /* item should be, an ARRAY, passed from <makeSingleXMLElement>*/, aheadBehind){
    
    
    
    // ======
    var tmp = new XMLStringMe();
    
    if(indexesReturnSearch==""){
      console.log('Searched, but Nothing Found');
      
    }else{
      //indexWithin = counting
      //elem = the elements of the array
      if(aheadBehind=='ahead'){
        index = indexesReturnSearch[0];
        
        item.forEach((elem, indexWithin)=>{
          globalBIGArray.splice(index, null, item[indexWithin]);
          index++;
        });
        debugger;
      }
      else if(aheadBehind=='behind'){
        index = indexesReturnSearch[1];
        item.forEach((elem, indexWithin)=>{
          globalBIGArray.splice(index, null, item[indexWithin]);
          index++;
        });
        debugger;
        
      }
      
    }
      
      
      if(aheadBehind == undefined||aheadBehind==""){
        // index = indexesReturnSearch[1];
        item.forEach((elem, indexWithin)=>{
          globalBIGArray.push(elem);
        });
        console.log("Data added to BIG Array");
      }
      // debugger;
    }
    makeIntoStrint(){
    
    }

}

// var tmp = pullFromLocal(1)
// var obj = new XMLStringMe(tmp)

// obj.pullHeads(tmp)

//"<game><Goal><title>this is my first Goal</title><record1>hello there</record1></Goal><TimeFrame><game>"
