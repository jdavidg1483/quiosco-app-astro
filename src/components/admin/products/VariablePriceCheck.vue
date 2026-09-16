<script setup lang="ts">

</script>


    
<template>
  <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
    <div class="col-span-full">
      <div class="mt-6 space-y-6">
        <div class="flex gap-3">
          <div class="flex h-6 shrink-0 items-center">
            <div class="group grid size-4 grid-cols-1">
              <input 
                id="variable_price" type="checkbox" aria-describedby="comments-description"
                class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
              />
              <svg fill="none" viewBox="0 0 14 14"
                class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
                <path d="M3 8L6 11L11 3.5" stroke-width={2} stroke-linecap="round" stroke-linejoin="round"
                  class="opacity-0 group-has-checked:opacity-100"></path>
                <path d="M3 7H11" stroke-width={2} stroke-linecap="round" stroke-linejoin="round"
                  class="opacity-0 group-has-indeterminate:opacity-100"></path>
              </svg>
            </div>
          </div>
          <div class="text-sm/6">
            <label for="variable_price" class="font-medium text-gray-900">
              Habilitar Precio Variable
            </label>
            <p id="variable_price_description" class="text-gray-500">
              Habilitar si este Producto tiene precio variable por tamaño: Chico, Mediano y Grande.
            </p>
          </div>
        </div>
  
        
      </div>
    </div>
  </div>
</template>






