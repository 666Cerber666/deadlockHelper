<template>
  <div v-if="error" class="notification">
    {{ error }}
  </div>
</template>

<script>
export default {
props: {
    error: String
  }
}
</script>
  
  <style scoped>
  .notification {
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: #f44336;
    color: #fff;
    width:250px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  </style>