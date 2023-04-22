const inputslider = document.querySelector("[data-lenght-slider]");

const lenghtdispaly = document.querySelector("[data-lenght-number]");

const passwardDispaly = document.querySelector("[data-passwordDispaly]");

const cpybut = document.querySelector("[data-copyed]");

const cpyms = document.querySelector("[data-copyms]");

const uppercase = document.querySelector("#upperchase");

const lowercase = document.querySelector("#lowercase");

const number = document.querySelector("#numberletter");

const Symbols = document.querySelector("#symbolletter");

const indicator = document.querySelector("[data-indicator]");

const genratebtn = document.querySelector(".Genratebutton");

const allcheckbox = document.querySelector("input[type=checkbox");

const symbol = '!@#$%^&*()_+-=[]{}~`",.<>?/:;';

let password = "";
let passwordlenght = 10;
let checkcount = 1;

handleslider();
// set circle color grey
setindicator('#ccc');

function handleslider(){
    inputslider.value = passwordlenght;
    lenghtdispaly.innerText= passwordlenght;

    const min = inputslider.min;
    const max = inputslider.max;
    inputslider.style.backgroundSize = ((passwordlenght-min)*100/(max-min)+"% 100%")
}

// set indicator 
function setindicator (color){
    indicator.style.backgroundColor = color;
   //shadow
}

function getrndinteger (min,max){
  return Math.floor(Math.random()*(max-min)) +min;
}

function getrndnumber(){
  return getrndinteger(0,9);
}

function genrateLowercase(){
  return  String.fromCharCode(getrndinteger(97,123));
}

function genrateUppercase(){
  return  String.fromCharCode(getrndinteger(65,91));
}

function genratesymbol(){
  const randomnum = getrndinteger(0,symbol.length);
  return symbol.charAt(randomnum);
}

function calcustrength(){

  let hasupper = false;
  let haslower = false;
  let hasnum = false;
  let hassym = false;

  if(uppercase.checked) hasupper = true;
  if(lowercase.checked) haslower = true;
  if(number.checked) hasnum = true;
  if(Symbols.checked) hassym = true;

  if(hasupper && haslower && (hasnum || hassym) && passwordlenght >= 8){
    setindicator("#0f0");
  }

  else if(
    (haslower || hasupper) &&
    (hasnum || hassym) &&
    passwordlenght >= 6
  ){
    setindicator("#ff0");
  }
  
  else{
    setindicator("#f00");
  }
}

async function copycontent(){

  console.log('coyp');

  try{
  await navigator.clipboard.writeText(passwardDispaly.value);
  cpyms.innerText = "copied...";
  }catch(e){
    cpyms.innerText = "Failed";
  }
  cpyms.classList.add("active");
  // console.log(cpyms.classList.add("active"));
  

  setTimeout(() => {
    console.log('settimeout');
    cpyms.classList.remove("active");
    cpyms.innerText = "";
  } ,2000);

  
  
}

function shuffelpassward(array){
  //fisher yates method
  for(let i = array.length -1 ; i>0 ; i--){
    const j = Math.floor(Math.random()* (i+1));
    const temp = array[i];
    array[i]=array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el)=> (str += el));
  return str;

}

function handlecheckboxChange() {
  checkcount= 0;
  allcheckbox.forEach((checkbox)=>{
    if(checkbox.checked){
      checkcount++;
    }
  });

  // special condition
  if(passwordlenght<checkcount){
    passwordlenght= checkcount;
    handleslider();
  }
} 

// allcheckbox.forEach((checkbox) => {
//   checkbox.addEventListener('change',handlecheckboxChange);
// });

inputslider.addEventListener('input',(e)=> {
  passwordlenght = e.target.value;
  handleslider();
});

cpybut.addEventListener('click',()=> {
  if(passwardDispaly.value){
    copycontent();
  }
})

genratebtn.addEventListener('click',()=>{
  //no check box selected
  if(checkcount==0){
    return;
  }

  if(passwordlenght < checkcount){
    passwordlenght = checkcount;
    handleslider();
  }

  //lets start the new passward
  console.log("starting the journy");

  //remove old passward
  password ="";

  //lets put the stuff mentioned by checkbox

  // if(uppercase.checked){
  //   password += genrateUppercase();
  // }

  // if(lowercase.checked){
  //   password += genrateLowercase();
  // }

  // if(number.checked){
  //   password += getrndnumber();
  // }

  // if(Symbols.checked){
  //   password += genratesymbol();
  // }

  let funarr = [];

  if(uppercase.checked)
  funarr.push(genrateUppercase);

  if(lowercase.checked)
  funarr.push(genrateLowercase);

  if(number.checked)
  funarr.push(getrndnumber);

  if(Symbols.checked)
  funarr.push(genratesymbol);

  //compulsory
  for(let i =0 ; i<funarr.length ; i++){
    password += funarr[i]();
  }
  console.log("compulsray done");

  //remaining addition
  for(let i =0 ; i<passwordlenght-funarr.length; i++){
    let randindex = getrndinteger(0,funarr.length);
    password += funarr[randindex]();
  }
  console.log("Remaining done");

  //suffle the passward
  password= shuffelpassward(Array.from(password));
  console.log("suffling done");

  //show in ui
  passwardDispaly.value = password;
  console.log("Ui addition done");
  //calculate strenght
  calcustrength();
})
//copy function

//slider

//genrate passward


//set indicator

//get random(min,max)

//get randomupper

//get random lower

//get random number

//get random symbol
