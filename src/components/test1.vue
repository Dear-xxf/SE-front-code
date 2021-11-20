<template>
<div class="onimg_bg">

    <h2 class="onimg">

        <span class="onimg_title">标题在此</span>

    </h2>

</div>
</template>

<style>
.onimg_bg{

    background: none no-repeat;

    width: 700px;

    height: 400px;

    margin:0 auto;

    background-size: cover; 

    position: relative;

    margin-bottom: 20px;

}

.onimg{

    position: absolute;

    top: 70px;

    left:50%;

    width: 600px;

    margin-left: -300px;

    text-align: center;

}

/*伪元素实现*/

.onimg_title:before{

    display: inline-block;

    position: relative;

    top:-7px;

    right: 20px;

    content: "";

    width: 200px;

    height: 0px;

    border: 2px solid rgb(161, 27, 27);

}

.onimg_title:after{

    display: inline-block;

    position: relative;

    top:-7px;

    left: 20px;

    content: "";

    width: 200px;

    height: 0px;

    border: 2px solid rgb(168, 30, 30);

}
</style>