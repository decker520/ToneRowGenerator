let tone_rng = document.getElementById("tone_rng").value;
let tone_dvsn = document.getElementById("tone_dvsn").value;

function ChangeRange() {
  tone_rng = document.getElementById("tone_rng").value;
}

function ChangeDivision() {
  tone_dvsn = document.getElementById("tone_dvsn").value;
}

function GenerateToneRow() {
  
  let tmp_lst = [];
  let tmp_txt = "";
  let tone_lst = [];
  let tone_txt = "";
  
  for (i = 1; i <= tone_rng; i++) {
    tone_lst.push(i);
  }
  
  for (i = 0; i <= tone_rng/tone_dvsn-1; i++) {
    
    for (j = (i)*tone_dvsn; j <= (i+1)*tone_dvsn-1; j++) {
      tmp_lst.push(tone_lst[j]);
    }
    
    for (k in tmp_lst) {
      if (k == 0) {
        tmp_txt = tmp_lst[k];
      } else {
        tmp_txt = tmp_txt + " " + tmp_lst[k];
      }
    }
    
    if (i == 0) {
      tone_txt = tmp_txt;
    } else {
      tone_txt = tone_txt + '<br>' + tmp_txt;
    }
    
    tmp_lst = [];
    tmp_txt = "";
    
  }
  
  document.getElementById("box a").innerHTML = tone_txt;
  
}
