<template>
  <b-nav-form>
    <b-form-radio-group
        id="btn-radios-1"
        v-model="dirselected"
        :options="getDirectionOptions"
        buttons
        button-variant="primary"
        name="radios-btn-default"
        @change="changedir"
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

const dirselected = ref(true);

const getDirectionOptions = computed(() => {
  return props.isOneWay
      ? [{ text: '往', value: true }]
      : [
        { text: '往', value: true },
        { text: '返', value: false }
      ];
});

function changedir(value) {
  emit('change-dir', value);
}
</script>

<style scoped>
</style>
