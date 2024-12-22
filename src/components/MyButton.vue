<script lang="ts" setup>
defineOptions({
  name: 'MyButton',
})
</script>

<template>
  <el-button :="$attrs">
    <slot />
  </el-button>
</template>
