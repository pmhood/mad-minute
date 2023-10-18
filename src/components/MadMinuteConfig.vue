<template>
  <div class="space-y-12">
    <div class="border-b border-gray-900/10 pb-12">
      <h2 class="text-base font-semibold leading-7 text-gray-900">Fact Settings</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600">Customize the math facts on your sheet.</p>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label for="operation" class="block text-sm font-medium leading-6 text-gray-900"
            >Operation</label
          >
          <div class="mt-2">
            <select
              v-model="operationValue"
              id="operation"
              name="operation"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option
                v-for="item in operations"
                v-bind:key="item.name"
                :value="item.name"
                :disabled="item.isDisabled"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="sm:col-span-4">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
            >Number Ranges</label
          >
          <div class="mt-2 flex items-center gap-x-3">
            <div class="flex items-center gap-x-3 bg-slate-100 p-2">
              <input
                v-model.number="xMin"
                id="xMin"
                name="xMin"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              to
              <input
                v-model.number="xMax"
                id="xMax"
                name="xMax"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <span class="text-gray-900 text-6xl">{{
              operationSymbol(operationValue as Operation)
            }}</span>
            <div class="flex items-center gap-x-3 bg-slate-100 p-2">
              <input
                v-model.number="yMin"
                id="yMin"
                name="yMin"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              to
              <input
                v-model.number="yMax"
                id="yMax"
                name="yMax"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div class="sm:col-span-4">
          <label for="numOfEquations" class="block text-sm font-medium leading-6 text-gray-900"
            >Number of Equations</label
          >
          <div class="mt-2">
            <input
              v-model.number="numOfEquations"
              id="numOfEquations"
              name="numOfEquations"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="border-b border-gray-900/10 pb-12">
      <h2 class="text-base font-semibold leading-7 text-gray-900">Page Settings</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600">
        Customize how the math facts are laid out on the sheet.
      </p>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label for="imageSet" class="block text-sm font-medium leading-6 text-gray-900"
            >Random Image Set</label
          >
          <div class="mt-2">
            <select
              v-model="imageSetValue"
              id="imageSet"
              name="imageSet"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option v-for="item in imageSets" :key="item.name" :value="item.name">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="sm:col-span-4">
          <label for="layout" class="block text-sm font-medium leading-6 text-gray-900"
            >Page Layout</label
          >
          <div class="mt-2">
            <select
              v-model="layoutValue"
              id="layout"
              name="layout"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option v-for="item in layouts" :key="item.name" :value="item.name">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="sm:col-span-4">
          <label for="numOfPages" class="block text-sm font-medium leading-6 text-gray-900"
            >Number of Pages</label
          >
          <div class="mt-2">
            <input
              v-model.number="numOfPages"
              id="numOfPages"
              name="numOfPages"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-6 flex items-center justify-end gap-x-6">
    <button
      @click="submit"
      type="submit"
      class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Generate
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PdfGenerator } from '../services/pdf-generator/pdf-generator.service';
import { Operation } from '../services/pdf-generator/operation.enum';
import { PdfGeneratorConfig } from '../services/pdf-generator/pdf-generator-config';
import { PageLayout } from '../services/pdf-generator/page-layout.enum';
import { ImageSet } from '../services/pdf-generator/image-set.enum';

const operations = ref([
  { name: Operation.Addition, value: '+', isDisabled: false },
  { name: Operation.Subtraction, value: '-', isDisabled: false },
  { name: Operation.Multiplication, value: '×', isDisabled: false },
  { name: Operation.Division, value: '÷', isDisabled: false }
]);
const operationValue = ref(Operation.Addition);

const xMin = ref(0);
const xMax = ref(10);

const yMin = ref(0);
const yMax = ref(10);

const numOfEquations = ref(20);

const imageSets = ref([{ name: 'None' }, { name: 'Pokémon' }]);
const imageSetValue = ref('None');

const layouts = ref([{ name: 'Side-by-Side' }, { name: 'Top-Bottom' }]);
const layoutValue = ref('Side-by-Side');

const numOfPages = ref(1);

function submit() {
  const config = new PdfGeneratorConfig(
    operationValue.value as Operation,
    xMin.value,
    xMax.value,
    yMin.value,
    yMax.value,
    numOfEquations.value,
    numOfPages.value,
    layoutValue.value as PageLayout,
    imageSetValue.value as ImageSet
  );

  const service = new PdfGenerator(config);
  service.generate();
  return false;
}

function operationSymbol(name: Operation) {
  return operations.value.find((item) => {
    return item.name === name;
  })?.value;
}
</script>
