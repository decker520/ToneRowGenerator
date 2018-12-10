let tone_rng = document.getElementById("tone_rng").value;
let tone_dvsn = document.getElementById("tone_dvsn").value;
let ToneRow = [];
let Inversion = [];
let Retrograde = [];
let RetroInversion = [];
let selectedBox = 'a';

function boxaselect() {
  document.getElementById("box a").style.border = "thick solid black";
  document.getElementById("box b").style.border = "thick solid #00ff00ff";
  document.getElementById("box c").style.border = "thick solid cyan";
  document.getElementById("box d").style.border = "thick solid yellow";
  selectedBox = 'a';
}

function boxbselect() {
  document.getElementById("box b").style.border = "thick solid black";
  document.getElementById("box a").style.border = "thick solid magenta";
  document.getElementById("box c").style.border = "thick solid cyan";
  document.getElementById("box d").style.border = "thick solid yellow";
  selectedBox = 'b';
}

function boxcselect() {
  document.getElementById("box c").style.border = "thick solid black";
  document.getElementById("box a").style.border = "thick solid magenta";
  document.getElementById("box b").style.border = "thick solid #00ff00ff";
  document.getElementById("box d").style.border = "thick solid yellow";
  selectedBox = 'c';
}

function boxdselect() {
  document.getElementById("box d").style.border = "thick solid black";
  document.getElementById("box a").style.border = "thick solid magenta";
  document.getElementById("box b").style.border = "thick solid #00ff00ff";
  document.getElementById("box c").style.border = "thick solid cyan";
  selectedBox = 'd';
}

function ChangeRange() {
  
  if (document.getElementById("tone_rng").value > 99) {
    alert('Range cannot be more than 99');
    document.getElementById("tone_rng").value = tone_rng;
  }
  if (document.getElementById("tone_rng").value % 1 != 0) {
    alert('Range must be an integer');
    document.getElementById("tone_rng").value = tone_rng;
  }
  if (document.getElementById("tone_rng").value < 0) {
    alert('Range must be positive');
    document.getElementById("tone_rng").value = tone_rng;
  }
  
  tone_rng = document.getElementById("tone_rng").value;
  
}

function ChangeDivision() {
  
  if (document.getElementById("tone_dvsn").value > 8) {
    alert('Division cannot be more than 8');
    document.getElementById("tone_dvsn").value = tone_dvsn;
  }
  if (document.getElementById("tone_dvsn").value == 0) {
    alert('Division cannot be 0');
    document.getElementById("tone_dvsn").value = tone_dvsn;
  }
  if (document.getElementById("tone_dvsn").value % 1 != 0) {
    alert('Division must be an integer');
    document.getElementById("tone_dvsn").value = tone_dvsn;
  }
  if (document.getElementById("tone_dvsn").value < 0) {
    alert('Division must be positive');
    document.getElementById("tone_dvsn").value = tone_dvsn;
  }
  
  tone_dvsn = document.getElementById("tone_dvsn").value;
  
}

function ClickGen() {
  
  if (tone_rng % tone_dvsn != 0) {
    alert('Range must be multiple of division');
    return;
  }
  
  ToneRow = GenerateToneRow();
  GenerateSecondary();
  
}

function ClickTransFwd() {
  
  ToneRow = TransFwd(ToneRow);
  GenerateSecondary();
  
}

function ClickTransBkwd() {
  
  ToneRow = TransBkwd(ToneRow);
  GenerateSecondary();
  
}

function ClickCntr() {

  switch(selectedBox) {
    case 'a':
        while (ToneRow[0] != 1) {
          TransFwd(ToneRow);
          GenerateSecondary();
        }
      break;
    case 'b':
        while (Inversion[0] != 1) {
          TransFwd(ToneRow);
          GenerateSecondary();
        }
      break;
    case 'c':
        while (Retrograde[0] != 1) {
          TransFwd(ToneRow);
          GenerateSecondary();
        }
      break;
    case 'd':
        while (RetroInversion[0] != 1) {
          TransFwd(ToneRow);
          GenerateSecondary();
        }
      break;
  }
  
}

function shuffle(array) {
  
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
  
}

function GenerateToneRow() {
  
  let tone_lst = [];
  
  for (i = 1; i <= tone_rng; i++) {
    tone_lst.push(i);
  }
  
  return shuffle(tone_lst);
  
}

function GenerateSecondary() {
  
  Inversion = GenerateInversion(ToneRow);
  Retrograde = GenerateRetrograde(ToneRow);
  RetroInversion = GenerateRetrograde(GenerateInversion(ToneRow));
  document.getElementById("output a").innerHTML = PrintRow(ToneRow);
  document.getElementById("output b").innerHTML = PrintRow(Inversion);
  document.getElementById("output c").innerHTML = PrintRow(Retrograde);
  document.getElementById("output d").innerHTML = PrintRow(RetroInversion);
  
}

function GenerateInversion(tone_lst) {  
  
  let tmp_lst = [];
  
  for (i in tone_lst) {
    tmp_lst.push(1 + parseInt(tone_rng) - tone_lst[i]);
  }
  
  return tmp_lst;
  
}

function GenerateRetrograde(tone_lst) {  
  
  let tmp_lst =[];
  
  tone_lst.reverse();
  
  for (i in tone_lst) {
    tmp_lst.push(tone_lst[i]);
  }
  
  tone_lst.reverse();

  return tmp_lst;
  
}

function TransFwd(tone_lst) {
   
  tone_lst.push(tone_lst.shift()); 
  
  return tone_lst;
}

function TransBkwd(tone_lst){
  
  tone_lst.unshift(tone_lst.pop()); 
  
  return tone_lst;
}

function PrintRow(tone_lst) {  
  
  let tmp_lst = [];
  let tmp_txt = "";
  let tone_txt = "";
  
  for (i = 0; i <= tone_rng/tone_dvsn-1; i++) {
    
    for (j = (i)*tone_dvsn; j <= (i+1)*tone_dvsn-1; j++) {
      tmp_lst.push(tone_lst[j]);
    }
    
    for (k in tmp_lst) {
      
      if (tmp_lst[k] < 10) {

        if (k == 0) {
          tmp_txt = "\xa0" + tmp_lst[k];
        } else {
          tmp_txt = tmp_txt + "\xa0\xa0" + tmp_lst[k];
        }
        
      } else {
        
        if (k == 0) {
          tmp_txt = tmp_lst[k];
        } else {
          tmp_txt = tmp_txt + "\xa0" + tmp_lst[k];
        }
        
      }
      
    }
    
    if (i == 0) {
      tone_txt = tmp_txt;
    } else {
      tone_txt = tone_txt + '<br><br>' + tmp_txt;
    }
    
    tmp_lst = [];
    tmp_txt = "";
    
  }
  
  return tone_txt;
  
}
