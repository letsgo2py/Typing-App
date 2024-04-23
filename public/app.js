const line = document.getElementById("t1").innerText

let idx = 0;
const len = line.length;

function isUpperCase(character) {
    return character === character.toUpperCase() && character !== character.toLowerCase();
}

let prevKey;
let currKey;

let start = false;
let capsPressed = false;

let startTime;

let isTyped = false;


document.addEventListener('keydown', function(event) {

    if(event.key == "Enter" && !start){ 
        start = true;
        const sDiv = document.querySelector(".start-div")
        sDiv.remove();
        console.log("Start Typing ...")
        startTime = performance.now();
    }

    else if(start){

        prevKey = currKey
        currKey = event.key;

        if(currKey == "CapsLock"){
            capsPressed = true;
        }

        if(capsPressed){
            //handle it
            capsPressed = false;
            return;
        }

        if(prevKey){
            func1(prevKey, currKey);
        }else{
            func2(currKey)
        }

        console.log(prevKey, currKey)
    }

});




let getL1 = document.getElementById("t1")

let t1_part1 = '<p id = "t1"></p>'
let t1_part2 = '<span class="highlight">'
let t1_part3 = '</span>'
let t1_part4 = '<span class="wrong-key">'

function getParts(idx){
    let s1 = line.substring(0, idx);
    let s2 = line[idx]
    let s3 = line.substring(idx+1)

    return [s1, s2, s3]
}

function moveForwardL1() {
    idx++;
    let [s1, s2, s3] = getParts(idx)
    getL1.innerHTML = t1_part1 + s1 + t1_part2 + s2 + t1_part3 + s3;
}

function wrongKeyL1() {
    let [s1, s2, s3] = getParts(idx)
    getL1.innerHTML = t1_part1 + s1 + t1_part4 + s2[0] + t1_part3 + s3;
}

function func2(curr){

    if(curr !== "Shift"){
        if(line[idx] === curr) {
            moveForwardL1();
            return;
        }else{
            wrongKeyL1();
        }
    }else{ // when it is Shift key
        return;
    }   
}


function speed(){

    const resEle = document.getElementById("rem-result");
    resEle.removeAttribute("id")
    const timeTaken = (endTime - startTime)/60000; // into minutes
    const bpm = String((numberOfWords/timeTaken).toFixed(2));  // round-off

    const showSpeed = document.getElementById("speed");
    showSpeed.innerText = "Speed: " + bpm + " wpm";

}

function func1(prev, curr){
    if(idx < len-1){
        if(isUpperCase(line[idx]) && (prev === "Shift" || curr === "Shift")){
            if(prev === "Shift" && curr === line[idx]){
                moveForwardL1();
                return;
            }else{
                wrongKeyL1();
                return;
            }
        }
        if(line[idx] === curr){
            moveForwardL1();
            return;
        }else{
            wrongKeyL1();
            return;
        }
    }

    if(idx == len-1){
        if(isUpperCase(line[idx]) && (prev === "Shift" || curr === "Shift")){
            if(prev === "Shift" && curr === line[idx]){
                prevKey = undefined;
                currKey = undefined;
                getL1.innerText = line;
                // show speed and accuracy
                endTime = performance.now();
                speed();
                accuracy();
            }
            else{
                wrongKeyL1();
                return;
            }
        }else{
            if(curr === line[idx]){
                getL1.innerText = line;
                endTime = performance.now();
                speed();
                accuracy();
            }else{
                wrongKeyL1();
                return;
            }
        }
    }
}

