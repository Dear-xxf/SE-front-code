<template>
        <div class="subtitle1_bg">
          <div class="subtitle1">
            <b class="subtitle-text" >实验室管理通知</b>
            <br/><br/>
          </div>
        </div>
</template>
<style>
.subtitle1_bg{
background: white;
width: 600px;
height: 70px;
margin:0 auto;
background-size: cover; 
position: relative;
}
.subtitle1{
position: absolute;
top: -20px;
left:50%;
width: 200px;
margin-left: -100px;
margin-top: 50px; 
z-index: 1;
font-size:25px;
color:#427fc5
}
.subtitle1-text{
    padding:0px 20px; 
}
.subtitle1-text:before{
    display: inline-block;
    position: relative;
    top:20px;
    right: 20px;
    content: "";
    width: 200px;
    height: 0px;
    color: black;
    border: 2px solid black;
}
.subtitle1-text:after{
    display: inline-block;
    position: relative;
    top:-7px;
    left: 20px;
    content: "";
    width: 200px;
    height: 0px;
    border: 2px solid black;
}

</style>