nosex = 0;
nosey = 0;
differemce = 0;
rightWristX = 0;
leftWristX = 0;
//draw_circle = "";
//draw_rect = "";

//var SpeechRecognition = window.webkitSpeechRecognition;

//var recognition = new SpeechRecognition();
function setup() {

    video = createCapture(VIDEO);
    video.size(550, 500); 
    
    canvas = createCanvas(550, 550);
    canvas.position(560, 150); 
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
//canvas = createCanvas(900, 600);
}
function modelLoaded() {
    console.log('¡PoseNet ha inicializado!');
    
}
function gotPoses(results)
{
    if(results.length > 0)
    { 
    console.log(results);
    nosex = results[0].pose.nose.x;
    nosey = results[0].pose.nose.y; 
    console.log("nosex = " + nosex + "nosey = " + nosey); 
    leftWristX = results[0].pose.leftWrist.x; 
    rightWristX = results[0].pose.rightWrist.y; 
    difference = floor(leftWristX - rightWristX); 
    console.log("leftWristX = " + leftWristX + "rightWristX = " + rightWristX + "diferencia = " + difference); 
}
}
function start()
{
    document.getElementById("status").innerHTML = "El sistema está detectando. Por favor, habla";
    recognition.start();
}

recognition.onresult = function (event) {
    console.log(event);

    var content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "La voz se reconoce como: " + content;
    if (content =="Circle") 
    {
        x = Math.floor(Math.random() * 900);
        y = Math.floor(Math.random() * 600);
        document.getElementById("status").innerHTML = "Se empezó a dibujar un círculo";
        draw_circle = "set";
    }
    if (content =="rectangle") 
    {
        x = Math.floor(Math.random() * 900);
        y = Math.floor(Math.random() * 600);
        document.getElementById("status").innerHTML = "Se empezó a dibujar un rectangulo";
        draw_rect = "set";
    }
}


function draw() {
    if (draw_circle =="set") 
    {
        radius = Math.floor(Math.random() * 100);
        circle(x, y, radius);
        document.getElementById("status").innerHTML = "Se dibujó un círculo";
        draw_circle = "";
    }
    if (draw_rect == "set") {
        recognition(x, y, 70, 50);
        document.getElementById("status").innerHTML = "Se dibujó un rectángulo";
        draw_rect = "";
    }
}