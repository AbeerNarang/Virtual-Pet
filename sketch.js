//Create variables here
var dog,database,foodS;
var dogImg,happyDogImg;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.3;
  database = firebase.database();
  var foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogImg); 
  }
  drawSprites();
  //add styles here
fill("white");
text("Note: Press Up Arrow Key to Feed Bruno Milk",130,30);
text("Food Remaining:"+foodS,180,70);
textSize(30);
stroke("white");
}

function readStock(data){
foodS = data.val();
}

function writeStock(x){
if(x<=0){
x = 0;
}
else{
x = x-1;  
}
database.ref('/').update({
Food:x  
})  
}
