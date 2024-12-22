<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg?: string }>()

const count = ref(0)
</script>

<template>
  <!-- <h1 color="$luna-color-primary">
    {{ msg }}
  </h1> -->
  <div class="flex flex-wrap items-center justify-center text-center">
    <my-button @click="count++">
      count is: {{ count }}
    </my-button>
    <my-button type="primary" @click="count++">
      count is: {{ count }}
    </my-button>
    <my-button type="success" @click="count++">
      count is: {{ count }}
    </my-button>
    <my-button type="warning" @click="count++">
      count is: {{ count }}
    </my-button>
    <my-button type="danger" @click="count++">
      count is: {{ count }}
    </my-button>
    <my-button type="info" @click="count++">
      count is: {{ count }}
    </my-button>
  </div>
</template>

<style lang="scss" scoped>
.luna-button {
  & + & {
    margin-left: 20px;
  }
}
</style>
