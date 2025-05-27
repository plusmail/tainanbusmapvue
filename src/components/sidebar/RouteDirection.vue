<template>
  <b-nav-form>
    <b-form-radio-group
      id="btn-radios-1"
      v-model="dirSelected"
      :options="getDirectionOptions"
      buttons
      button-variant="primary"
      name="radios-btn-default"
      @change="changeDir"
    />
  </b-nav-form>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOneWay: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['change-dir']);

const dirSelected = ref(true);

const getDirectionOptions = computed(() => {
  return props.isOneWay
      ? [{ text: '往', value: true }]
      : [
        { text: '往', value: true },
        { text: '返', value: false }
      ];
});

function changeDir(value) {
  emit('change-dir', value);
}
</script>

<style scoped>
</style>
