class CountdownTimer {
  constructor(options) {
    this.selector = options.selector;
    this.targetDate = options.targetDate;
    this.timerId = null;

    this.init();
  }

  init() {
    const timerElement = document.querySelector(this.selector);
    this.fields = timerElement.querySelectorAll(".field");
    this.updateValues();

    this.startTimer();
  }

  startTimer() {
    this.timerId = setInterval(() => {
      const time = this.targetDate.getTime() - new Date().getTime();

      if (time <= 0) {
        clearInterval(this.timerId);
        this.fields.forEach((field) => {
          field.querySelector(".value").textContent = "00";
        });
        return;
      }

      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((time % (1000 * 60)) / 1000);

      this.updateValues(days, hours, mins, secs);
    }, 1000);
  }

  updateValues(days = 0, hours = 0, mins = 0, secs = 0) {
    this.fields[0].querySelector(".value").textContent = this.formatValue(days);
    this.fields[1].querySelector(".value").textContent =
      this.formatValue(hours);
    this.fields[2].querySelector(".value").textContent = this.formatValue(mins);
    this.fields[3].querySelector(".value").textContent = this.formatValue(secs);
  }

  formatValue(value) {
    return value.toString().padStart(2, "0");
  }
}

new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2024"),
});
