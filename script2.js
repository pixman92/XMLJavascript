// second attempt for XML decoding

var globalBIGArray = [];

class XMLStringMe{
  // class - used for decoding XML (my own version)
  
  constructor(XMLString){
    this.XMLString = XMLString ="<game><Goal><title>this is my first Goal</title><record1>hello there</record1></Goal><TimeFrame><game>";
    this.footTags = [];
    this.arrayOfHeaderText = [];
    this.allDataPulledBIG = [];
  }
  
  
  regExMain(){
    //function that uses RegEx to pull the data from a string, that will soon be a File(for python)
    var strTmp = this.XMLString;
    
    this.allDataPulledBIG = strTmp.split(/(?<=>)|(?=<)/g);

    // debugger;
    
    globalBIGArray = this.allDataPulledBIG;
    
    return this.allDataPulledBIG;
    
  }
  

}

// var tmp = pullFromLocal(1)
// var obj = new XMLStringMe(tmp)

// obj.pullHeads(tmp)

//"<game><Goal><title>this is my first Goal</title><record1>hello there</record1></Goal><TimeFrame><game>"
