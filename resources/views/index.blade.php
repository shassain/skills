<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="{{asset('css/app.css')}}">
  <link rel="stylesheet" href="{{asset('css/fonts/css/font-awesome.min.css')}}">
  <style>
  * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  width: 100vw;
  height: 100vh;
  font-family: 'Nunito', 'sans-serif';
  font-size: 5vw;
}

.bottom-container,
.top-container {
  width: 40vw;
  height: 35vh;
  display: flex;
  font-size:25px;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 35vh;
  left: 30vw;
  padding: 1vw;
}

.bottom-container {
  color: #232323;
}

.top-container {
  background-color: red;
  color: white;
  clip-path: circle(13% at 85% 50%);
  animation: circleMove 10s linear;
}

@keyframes circleMove {
  0%, 100% {
    clip-path: circle(13% at 85% 50%);
  }
  50% {
    clip-path: circle(13% at 15% 50%);
  }
}</style>
</head>
<body>
  <div id="example">
  </div>
  <script src="{{asset('js/app.js')}}"></script>
</body>
</html>