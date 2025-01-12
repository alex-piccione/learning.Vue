<template>
    <div v-if="loading" class="stage">
        <div class="text">{{ text || "loading"}}</div>
        <div class="dot-flashing"></div>
    </div>
</template>

<script setup lang="ts">

defineProps<{
    loading:Boolean
    text?:string
    }>()

</script>

<style scope>

.stage {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 32px 0;
    margin: 0 -5%;
    overflow: hidden;
}

.loading {
    text-align: center;
    margin-bottom: 5px;
    font-weight: 600;
}

.dot-flashing {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #999;
  color: #999;
  animation: dot-flashing 1s infinite linear alternate;
  animation-delay: 0.5s;
}
.dot-flashing::before, .dot-flashing::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
}
.dot-flashing::before {
  left: -15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #999;
  color: #999;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 0s;
}
.dot-flashing::after {
  left: 15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #999;
  color: #999;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dot-flashing {
  0% {
    background-color: #999;
  }
  50%, 100% {
    background-color: rgba(152, 128, 255, 0.2);
  }
}

















.loader {
  display: inline-block;
  width: 90px;
  height: 30px;

  background:
    radial-gradient(circle at 15px 50%, #0c9 15px, transparent 11%) no-repeat,
    radial-gradient(circle at 30px 50%, #0c9 10%, transparent 11%) no-repeat,
    radial-gradient(circle at 60px 50%, #0c9 10%, transparent 11%) no-repeat;
  background-size: 30px 30px;
  animation: dots 1s ease-in-out infinite;
}

@keyframes dots {
  0% {
    background-position: 0px 0px, 30px 0px, 60px 0px;
  }
  100% {
    background-position: 15px 0px, 45px 0px, 75px 0px;
  }
}

</style>