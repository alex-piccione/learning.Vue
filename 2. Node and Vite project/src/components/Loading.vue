<template>
  <!-- v-show="loading" -->
   <div v-show="loading" :class="loading ? 'visible_':'hidden_'" style="position:a absolute; height: 100%">
    <div class="stage">
        <div class="text">{{ text || "loading"}}</div>
        <div>
            <div class="dot-flashing"></div>
        </div>
    </div>
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 32px 0;
    margin: 0 -5%;
    overflow: hidden;
    transform: var(--transition);
}

.text {
    flex: 1;
    text-align: center;
    margin-bottom: 15px;
    font-weight: 500;
}

.dot-flashing {
  flex: 1;
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
