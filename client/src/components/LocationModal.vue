<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3>Countries Available</h3>
          </div>
          <div class="modal-body">
            <slot name="countries">Sorry, nothing available</slot>
          </div>
          <button class="modal-default-button" @click="$emit('close')">
            OK
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "LocationModal",
  props: {
    show: Boolean,
    country: String,
  },
};
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 80%;
  max-height: 70vh;
  overflow: scroll;
  margin: 0 auto;
  padding: 2em 3em;
  background-color: var(--bg-secondary);
  border-radius: 0.8em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: var(--success);
  font-size: 5em;
}

.modal-body {
  margin: 2em;
  text-align: left;
  font-size: 3em;
}

.modal-default-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
