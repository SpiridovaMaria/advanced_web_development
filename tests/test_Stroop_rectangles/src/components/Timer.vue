
<template>
    <div>
      <h5><b>Время прохождения:</b> {{ minutes }}:{{ seconds < 10 ? '0' : '' }}{{ seconds }}</h5>
    </div>
  </template>

<script>
  export default {
    data() {
      return {
        totalTime: 0, // 5 минут в секундах
        isRunning: false,
        timer: null,
      };
    },
    beforeMount() {
      this.startTimer()
    },
    computed: {
      minutes() {
        return Math.floor(this.totalTime / 60);
      },
      seconds() {
        return this.totalTime % 60;
      },
    },
    methods: {
      startTimer() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.timer = setInterval(() => {
          this.totalTime++
        }, 1000);
      },
      stopTimer() {
        clearInterval(this.timer);
        this.isRunning = false;
      },
      resetTimer() {
        this.stopTimer();
        this.timeLeft = this.totalTime;
      },
    },
    beforeDestroy() {
      this.stopTimer();
    },
  };
</script>
    
<style scoped>
  h5{
      color: #9966CC;
  }
</style>
  