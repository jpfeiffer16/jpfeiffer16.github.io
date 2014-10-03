//==============BF-Browser Language Engine v1.2=================
// 2014 Joe Pfeiffer
var pointer = new Array(3000);
var version = 1.2;

function runBF() {
    var editorInput;
    var inputPointer = 0;
    var outputString = "";

    var pointerPos = 0, charPos = 0, ch, a, r, l;
    var inputPointerIn = 0;
    var output = document.getElementById("display");
    var outputLabel = document.getElementById("output");
    var debug = document.getElementById("debug");
    var input = document.getElementById("input").value;
    editorInput = document.getElementById("editor").value;

    if (document.getElementById("javascriptCheck").checked == true) {
        compileJs(editorInput);
        return;
    }

    initializePoint(pointer.length);
    output.style.visibility = "visible"
    outputLabel.style.visibility = "visible"
    while(inputPointer <= editorInput.length - 1) {
        ch = editorInput.charAt(inputPointer);
        if (ch == "+") {
            pointer[pointerPos] = pointer[pointerPos] + 1;
        }
        if (ch == "-") {
            pointer[pointerPos] = pointer[pointerPos] - 1;
            if (pointer[pointerPos] < 0) {
                pointer[pointerPos] = 0;
            }
        }
        if ( ch == "<") {
            //alert(String(pointerPos));
            pointerPos = pointerPos - 1;
            if (pointerPos<0) {
                pointerPos = 0;
            }
            //alert("going left" + String(pointerPos));
        }
        if (ch == ">") {
            pointerPos = pointerPos + 1;
            if (pointerPos > 3000) {
                pointerPos = 3000;
            }
        }
        if (ch == ",") {
            if (inputPointerIn < input.length) {
                r = input.charCodeAt(inputPointerIn);
                pointer[pointerPos] = r;
                // if (pointer[pointerPos] == NaN) {
                //     pointer[pointerPos] = 0;
                // }
            } else {
                pointer[pointerPos] = 0;
            }
            inputPointerIn = inputPointerIn + 1;
        }
        if (ch == ".") {
            outputString = outputString + String.fromCharCode(pointer[pointerPos]);
        }
        if (ch == "[") {
            if (pointer[pointerPos] == 0) {
                a = "";
                while (a !== "]") {
                    inputPointer = inputPointer + 1;
                    a = editorInput.charAt(inputPointer)
                }
            }
        }
        if (ch == "]") {
            if(pointer[pointerPos] !== 0) {
                a = "";
                while(a !== "[") {
                    inputPointer = inputPointer - 1;
                    a = editorInput.charAt(inputPointer);
                }
            }
        }

        inputPointer = inputPointer + 1;
        output.innerHTML = outputString;
    }
    if(output.innerHTML == "" || output.innerHTML == null) {
        output.innerHTML = "Your program had no output to show";
    }
    if (document.getElementById("debugCheck").checked == true) {
        debug.innerHTML = pointer.toString();
    }
}

function initializePoint(plen) {
    for( var i = 0; i<plen; i = i + 1){
        pointer[i] = 0;
    }
}



function compileJs(inp) {
    alert("Compiling to Javascript");
    var initialCode = "function BFScript(input) {" + String.fromCharCode(11) + "  var pointer = new Array(3000);" + String.fromCharCode(11) +
        "  var pointerPos = 0, output = '', inputPos = 0;" + String.fromCharCode(11) + "for(i = 0; i<=3000 ; i = i +1) {" 
        + String.fromCharCode(11) + "pointer[i] = 0;" + String.fromCharCode(11) + "}", bchar, jstring = ""
        , closingCode = "return output;" + String.fromCharCode(11) + "}";
    var jtag = document.getElementById("jtag");
    // jtag.innerHTML = initialCode;
    //jstring = initialcode;
    for(k = 0; k <= inp.length; k = k + 1) {
        bchar = inp.charAt(k);
        if (bchar == "+") {
            jstring = jstring + String.fromCharCode(11) + "  pointer[pointerPos] = pointer[pointerPos] + 1;";
        }
        if (bchar == "-") {
            jstring = jstring + String.fromCharCode(11) + "  pointer[pointerPos] = pointer[pointerPos] - 1;";
        }
        if (bchar == ">") {
            jstring = jstring + String.fromCharCode(11) + "  pointerPos = pointerPos + 1;";
        }
        if (bchar == "<") {
            jstring = jstring + String.fromCharCode(11) + "  pointerPos = pointerPos - 1;";
        }
        if (bchar == "[") {
            jstring = jstring + String.fromCharCode(11) + "  while(pointer[pointerPos] !== 0){";
        }
        if (bchar == "]") {
            jstring = jstring + String.fromCharCode(11) + "}";
        }
        if (bchar == ".") {
            jstring = jstring + String.fromCharCode(11) + "output = output + String.fromCharCode(pointer[pointerPos]);";
        }
        if (bchar == ",") {
            jstring = jstring + String.fromCharCode(11) + "if(inputPos < input.length) {" + String.fromCharCode(11) +
                "pointer[pointerPos] = input.charCodeAt(inputPos); inputPos = inputPos + 1;" + String.fromCharCode(11) +
                "} else {" + String.fromCharCode(11) + "pointer[pointerPos] = 0;" + String.fromCharCode(11) + "}";
        }
    }
    jtag.innerHTML = initialCode + String.fromCharCode(11) + jstring + String.fromCharCode(11) + closingCode;
}

function loadProgs() {
    var a, b, c, d, e, f = 0, g, h;
    //alert("called");
    a = document.getElementById("progName");
    b = document.getElementById("editor");
    c = document.getElementById("progSelector");
    //alert("called 2");
    for(i = 1; i<=6; i = i + 1) {
        e = localStorage.getItem(i.toString());
        //alert("level 1, " + e);
        f = 0;
        d = "";
        while(d !== "#"){
            //alert("level 2");
            if (e !== null){
                d = e.charAt(f);
                f = f + 1;
            } else {d = "#"}
        }
        if (e !== null){
            h = e.toString().substring(f, e.length-1);
            g = e.toString().substring(0, (e.length-h.length)-2);
            //alert(g + "," + h);
            //alert(c.options[i]);
            c.options[i].text = g;
        }
    }
}

function selectProg(){
    var selector,progName,editor, title, program, megaString, parse = 0, i = 0;
    selector = document.getElementById("progSelector");
    progName = document.getElementById("progName");
    editor = document.getElementById("editor");
    megaString = localStorage.getItem(selector.value.toString());
    while (parse !== "#") {
        parse = megaString.charAt(i);
        i = i + 1;
    }
    title = megaString.substring(0, i-1);
    program = megaString.substring(i, megaString.length);
    progName.value = title;
    editor.value = program;
}

function saveProg() {
    var a, b, c;
    a = document.getElementById("progName").value.toString();
    b = document.getElementById("editor").value.toString();
    c = document.getElementById("progSelector").value.toString();
    localStorage.setItem(c, a + "#" + b);
    loadProgs();
}

function initPage(){
    document.getElementById("version").innerHTML = "v" + version.toString();
    loadProgs();
}

function BFDebugRun(input) {
    var res = BFScript(input);
    alert(res);
}

function BFScript(input) { 
 var pointer = new Array(3000); 
 var pointerPos = 0, output = '', inputPos = 0; 
for(i = 0; i<=3000 ; i = i +1) { 
pointer[i] = 0; 
} 

  pointer[pointerPos] = pointer[pointerPos] - 1; 
 pointer[pointerPos] = pointer[pointerPos] - 1; 
 pointer[pointerPos] = pointer[pointerPos] - 1; 
 pointer[pointerPos] = pointer[pointerPos] - 1; 
 pointer[pointerPos] = pointer[pointerPos] - 1; 
 pointer[pointerPos] = pointer[pointerPos] - 1; 
 pointer[pointerPos] = pointer[pointerPos] - 1; 
 pointer[pointerPos] = pointer[pointerPos] - 1; 
 pointer[pointerPos] = pointer[pointerPos] - 1; 
 pointer[pointerPos] = pointer[pointerPos] - 1; 
 pointer[pointerPos] = pointer[pointerPos] - 1; 
 pointerPos = pointerPos + 1; 
if(inputPos < input.length) { 
pointer[pointerPos] = input.charCodeAt(inputPos); inputPos = inputPos + 1; 
} else { 
pointer[pointerPos] = 0; 
} 
 while(pointer[pointerPos] !== 0){ 
 pointerPos = pointerPos + 1; 
if(inputPos < input.length) { 
pointer[pointerPos] = input.charCodeAt(inputPos); inputPos = inputPos + 1; 
} else { 
pointer[pointerPos] = 0; 
} 
} 
 pointerPos = pointerPos + 1; 
 pointerPos = pointerPos + 1; 
 pointerPos = pointerPos + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 alert("first while");
 while(pointer[pointerPos] !== 0){ 
 pointer[pointerPos] = pointer[pointerPos] - 1; 
 pointerPos = pointerPos - 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointerPos = pointerPos - 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointerPos = pointerPos + 1; 
 pointerPos = pointerPos + 1; 
} 
alert("after the first while");
 pointerPos = pointerPos - 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointerPos = pointerPos - 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointer[pointerPos] = pointer[pointerPos] + 1; 
 pointerPos = pointerPos - 1; 
 pointerPos = pointerPos - 1; 
 alert("second while");
 while(pointer[pointerPos] !== 0){ 
 pointerPos = pointerPos - 1; 
} 
 pointerPos = pointerPos + 1; 
 pointerPos = pointerPos + 1; 
 alert("3 while");
 while(pointer[pointerPos] !== 0){ 
output = output + String.fromCharCode(pointer[pointerPos]); 
 pointerPos = pointerPos + 1; 
} 
 pointerPos = pointerPos - 1; 
 alert("4 while");
 while(pointer[pointerPos] !== 0){ 
 pointerPos = pointerPos - 1; 
} 
 pointerPos = pointerPos + 1; 
output = output + String.fromCharCode(pointer[pointerPos]); 
 while(pointer[pointerPos] !== 0){ 
 pointerPos = pointerPos + 1; 
} 
 pointerPos = pointerPos + 1; 
 while(pointer[pointerPos] !== 0){ 
output = output + String.fromCharCode(pointer[pointerPos]); 
 pointerPos = pointerPos + 1; 
} 
return output; 
}