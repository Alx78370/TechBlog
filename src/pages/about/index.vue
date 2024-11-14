<script setup lang="ts"></script>

<template>
  <section class="mx-auto mt-10 max-w-3xl p-5 text-white">
    <h1 class="text-center font-mono text-5xl text-cyan-800 dark:text-cyan-200">
      About
    </h1>
    <div class="mt-14 flex h-auto w-full flex-col items-center sm:block">
      <img
        style="shape-outside: circle(50%)"
        class="float-left h-80 w-80 overflow-hidden rounded-full object-cover sm:mr-12"
        src="../../assets/images/photoAlex.webp"
        alt="photoAlex"
      />
      <div class="mt-10 w-full space-y-4 text-slate-900 dark:text-white">
        <p class="text-lg">
          Hello, I'm
          <span class="font-bold text-cyan-800 dark:text-cyan-200"
            >Alexis Vachet</span
          >, 28 years old and currently on an exciting journey of professional
          reconversion.
        </p>
        <p class="text-lg">
          I aspire to become a
          <span class="font-bold text-cyan-800 dark:text-cyan-200"
            >front-end web developer</span
          >
          specializing in Vue.js.
        </p>
        <p class="text-lg">
          I'm deeply passionate about
          <span class="italic text-cyan-800 dark:text-cyan-200">sports</span>,
          <span class="italic text-cyan-800 dark:text-cyan-200"
            >video games</span
          >, and the art of
          <span class="italic text-cyan-800 dark:text-cyan-200">coding</span>.
        </p>
        <p class="text-lg">
          I'm currently honing my skills and knowledge through an intensive
          training program at
          <span class="font-bold text-cyan-800 dark:text-cyan-200"
            >DonkeySchool</span
          >.
        </p>
      </div>
    </div>
    <ul class="mt-14 flex items-center justify-center gap-10">
      <li>
        <a href="https://github.com/Alx78370" target="_blank"
          ><i
            class="pi pi-github h-full text-6xl text-gray-700 hover:text-cyan-800 dark:text-white dark:hover:text-cyan-200"
          ></i
        ></a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/alexis-vachet-9b5048b0/"
          target="_blank"
        >
          <i
            class="pi pi-linkedin h-full text-6xl text-gray-700 hover:text-cyan-800 dark:text-white dark:hover:text-cyan-200"
          ></i>
        </a>
      </li>
    </ul>
  </section>
</template>
