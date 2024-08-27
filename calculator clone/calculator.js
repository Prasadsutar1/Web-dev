var x='';
    
/* this function just takes the values from button and pastes it into id input */
function num(v){
    x+=v;
    document.getElementById("input").innerHTML=x; 
}

/*below two functions are used to clear the values of input and output id's*/
function clear()
{
    x="";
   document.getElementById("input").innerHTML="";
   f="";
   document.getElementById("output").innerHTML="";
}
function reset()
{
    clear();
}

/* below function is takes values of id input and evaluates it and pastes it into id output */
function cal(){
    let f=eval(x);
    document.getElementById("output").innerHTML=f;
}

/* below function is used to remove last one letter from the id input*/
function back(){
    const p=document.getElementById("input");
    p.innerHTML = p.innerHTML.slice(0, -1);
}
