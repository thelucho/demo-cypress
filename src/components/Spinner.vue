<template>
  <div>
    <span class="loading"></span>
  </div>
</template>

<script>
export default {
  name: 'Spinner'
}
</script>

<style scoped>
.loading {
  display: inline-block;
  margin-left: 15px;
  width: 14px;
  height: 14px;
  border: 3px solid rgba(255,255,255,.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
</style>
