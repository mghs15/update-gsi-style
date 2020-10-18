const fs = require('fs');

const style = require('./style/pale.json');
let test = {};

const fixExp = (filter) => {
  
  if(
    filter[0] == "==" ||
    filter[0] == "!=" ||
    filter[0] == ">" ||
    filter[0] == "<" ||
    filter[0] == ">=" ||
    filter[0] == "<=" ||
    filter[0] == "in"
  ){
    
    //Arrayならば無視
    if(Array.isArray(filter[1])){
      console.log("maybe OK");
    
    //geometry typeを参照している場合
    }else if(filter[1].match(/\$type/)){
      switch(filter[2]){
        case "LineString":
          filter = ["any", 
                     [ "==", ["geometry-type"], "LineString"],
                     [ "==", ["geometry-type"], "MultiLineString"]
                   ];
          break;
        case "Polygon":
          filter = ["any", 
                     [ "==", ["geometry-type"], "Polygon"],
                     [ "==", ["geometry-type"], "MultiPolygon"]
                   ];
          break;
        default:
          filter = ["any", 
                     [ "==", ["geometry-type"], "Point"],
                     [ "==", ["geometry-type"], "MultiPoint"]
                   ];
      }//switch
    
    //その他の場合
    }else{
      filter[1] = ["get", filter[1]];
    }
    
    //inの場合だけ、残りを配列化
    if(filter[0] == "in"){
      let end = filter.length;
      filter = [filter[0], filter[1], ["literal", filter.slice(2, end)]];
    }
    
    
  }else if(filter[0] == "!has" ){
  
    filter[0] = "has";
    filter = ["!", filter];
  
  }else{
  
    if(
      filter[0] == "all" || filter[0] == "any"
    ){
      
      for(let i=1; i < filter.length; i++){
        //再帰
        filter[i] = fixExp(filter[i]);
      }
      
    }else{
       console.log(filter);
    }
  
  }
  
  return filter;
  
}

let count = 0;

style.layers.forEach( l => {
  
  count++;
  l.metadata.count = count;
  
  let path = l.metadata.path;
  let minz = l.minzoom;
  let maxz = l.maxzoom;
  
  let ltag = path + "_" + minz + "-" + maxz;
  
  l.filter = fixExp(l.filter);
  
  if(test[ltag]){
    console.log(`"${path}"は重複しています。`)
  }else{
    console.log(`"${path}"を新規登録。`)
    test[ltag] = l.filter;
  }
  
});



//console.log(test);

const resstring = JSON.stringify(test, null, 4);
fs.writeFileSync("filter.json", resstring);

const resstring1 = JSON.stringify(style, null, 4);
fs.writeFileSync("outstyle.json", resstring1);
