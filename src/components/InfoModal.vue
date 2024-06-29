<template>
    <div v-if="visible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <p>{{ props.letra }}</p>
      </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

  const props = defineProps({
    visible: {
      type: Boolean,
      required: true
    },
    letra: {
      type: String,
      required: true
    }
  })
  
  const emitEvent = defineEmits(['update:visible'])
  
  const closeModal = () => {
    emitEvent('update:visible', false)
  }
</script>

<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: #42b983;
    padding: 15px;
    border-radius: 10%;
    max-width: 800px;
    position: relative;
    border: 5px solid #000000;
    text-align: center;
    color: #ffffff;
  }
  </style>
