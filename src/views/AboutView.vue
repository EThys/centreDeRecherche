<template>
  <section class="bg-white py-12">
    <div class="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8">
      
      <!-- Texte principal -->
      <div class="lg:w-1/2">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Transforming Homes with Quality Roofing Solutions
        </h1>
        <p class="text-gray-600 mb-6">
          We provide top-notch roofing services to protect your home and enhance its beauty. Trust our experienced team to deliver exceptional results.
        </p>
        <button class="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition">
          Learn More
        </button>
      </div>

      <!-- Image -->
      <div class="lg:w-1/2">
        <img src="@/assets/roofing-image.jpg" alt="Roofing Solutions" class="rounded-lg shadow-lg w-full" />
      </div>
      
    </div>

    <!-- Vision Cards -->
    <div class="container mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
        <h3 class="text-xl font-semibold mb-2">Our Mission</h3>
        <p class="text-gray-600">Deliver the best roofing solutions with integrity and professionalism.</p>
      </div>
      <div class="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
        <h3 class="text-xl font-semibold mb-2">Our Vision</h3>
        <p class="text-gray-600">To be the most trusted roofing company in the region.</p>
      </div>
      <div class="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
        <h3 class="text-xl font-semibold mb-2">Our Values</h3>
        <p class="text-gray-600">Quality, reliability, and customer satisfaction at every step.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "RoofingHeroSection",
};
</script>

<style scoped>
/* Si besoin de styles spécifiques supplémentaires */
</style>
