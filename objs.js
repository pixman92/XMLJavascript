//file - to pull Data from file
//make an Object{}
//then add to it

class SavedPull{
  constructor(bigArray){
//     this.bigArray = [
//   "<game>",
//   "<Goal>",
//   "<title>",
//   "this is my first Goal",
//   "</title>",
//   "<record1>",
//   "hello there",
//   "</record1>",
//   "</Goal>",
//   "<game>"
// ];

  this.bigArray = bigArray;

    this.sortedArray=[];
    this.sortedInner=[];
  }
  
  printXML(){
    console.log(this.bigArray);
  }
  
  searchForTag(searchTerm){
    //takes in a <searchTerm>
    //looks for matching in (split XMLString)
    //then combines fromstart to finish of the found indexes
    
    var indexesReturnSearch=[];
    this.bigArray.forEach((elem, index)=>{
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
      tmpArray.push(this.bigArray[i]);
      // debugger;
    }
    console.log(tmpArray);
  }
}

// 0 & -1
// 1 & -2
// 2 & -3