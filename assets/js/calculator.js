$(document).ready(function(){

    function numof_elem(string,elem){
        s=0;
        for(var i=0;i<string.length;i++){
            if(string[i]===elem){
                s++;
            }   
        }
        return s;
    };

    function multi_brack(string){
        var numbers=["0","1","2","3","4","5","6","7","8","9"];
        for(var i=0;i<string.length-1;i++){ 
            if(numbers.indexOf(string[i])>=0 && string[i+1]==="("){
                string=string.substring(0,i+1)+"*("+string.substring(i+2);
            }
        };
        for(var i=0;i<string.length-1;i++){ 
            if(numbers.indexOf(string[i+1])>=0 && string[i]===")"){
                string=string.substring(0,i)+")*"+string.substring(i+1);
            }
        }

        return string;
    };

    function two_bracks(string){
        for(var i=0;i<string.length-1;i++){ 
            if((string[i])===")" && string[i+1]==="("){
                string=string.substring(0,i+1)+"*("+string.substring(i+2);
            }
        };
        return string;
    };

    function multi_perc(string){
        var numbers=["0","1","2","3","4","5","6","7","8","9"];
        for(var i=0;i<string.length-1;i++){ 
            if(numbers.indexOf(string[i+1])>=0 && string[i]==="%"){
                string=string.substring(0,i)+"%*"+string.substring(i+1);
            }
        }

        return string;
    };
    
    var operators=["+","-","×","/"];
    var operators2=["+","-","×","/","="];
    var brackets=["(",")"];
    var counter=0;
    var counter2=0;
    var $input = $('input[name=result]');
    $('button').click(function() {
        var text = $(this).html();
        var result;

        

        if(text==="AC"){
            result="";
            counter=0;
            counter2=0;
        }
        else{
            result=$input.val()+text;
        }

        if(operators.indexOf(result[result.length-2])>=0 && operators.indexOf(result[result.length-1])>=0){
            result=result.slice(0,result.length-2)+result[result.length-1];
        }

        if(operators.indexOf(result[result.length-2])>=0 && result[result.length-1]==="%"){
            result=result.slice(0,result.length-2)+result[result.length-1];
        }

        if(result[0]==="×" || result[0]==="/" || result[0]==="%"){
            result="";
        }

        if(brackets.indexOf(result[result.length-2])>=0 && result[result.length-1]==="." || brackets.indexOf(result[result.length-1])>=0 && result[result.length-2]==="."){
           result=result.slice(0,result.length-1);
        }

        if(operators2.indexOf(result[result.length-2])>=0 && result[result.length-1]===brackets[1] || operators2.indexOf(result[result.length-1])>=0 && result[result.length-2]===brackets[0]){
            result=result.slice(0,result.length-1);
        }

        if(text==="." && counter===0){
            counter=counter+1;
        }
        else if(text==="." && counter===1){
            result=result.slice(0,result.length-1);
        }

        if(result[result.length-2]==="(" && (result[result.length-1]===")" ||result[result.length-1]==="%")){
            result=result.substring(0,result.length-1);    
        }

        if(operators.indexOf(result[result.length-1])>=0 && counter===1){
            counter=counter-1;
        }

        if(result[result.length-1]==="("){
            counter2=counter2+1;
        }
        else if(result[result.length-1]===")" && counter2<numof_elem(result,")")){
            result=result.slice(0,result.length-1);
        }        

        if(text==="="){
            
            if(operators2.indexOf(result[result.length-2])>=0 && result [result.length-1]==="="){
                result=result.slice(0,result.length-1);
            }
            else{
                if(numof_elem($input.val(),")")!=numof_elem($input.val(),"(") ||result[0]==="." && result[1]==="="){
                    result="";
                }
                else{
                final0=multi_perc($input.val());
                final0=two_bracks(final0);
                final=final0.replace(/%/g,"/100");
                final=final.replace(/×/g,"*");
                final=multi_brack(final);
                result=eval(final);
                }
            }   
        }

        $input.val(result);
        
    });
});