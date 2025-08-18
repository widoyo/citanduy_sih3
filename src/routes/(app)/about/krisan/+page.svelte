<script lang="ts">
  import { Button, Input, Label, Textarea } from 'flowbite-svelte';
  import { ArrowUpRightFromSquareOutline } from 'flowbite-svelte-icons';

  let name = '';
  let email = '';
  let comment = '';

  function handleSubmit() {
    // Handle form submission logic here
    console.log('Form submitted:', { name, email, comment });
  }

</script>

<section id="hero">
  <div class="flex flex-col md:flex-row gap-4 items-center p-5">
    <div class="w-full md:basis-1/3">
      <h1 class="mb-5 font-extrabold text-4xl font-light">Kritik &amp; Saran</h1>
      <form method="POST">
        <div class="mb-4">
          <Label for="name">Nama</Label>
          <Input id="name" bind:value={name} type="text" />
        </div>
        <div class="mb-4">
          <label for="email">Email</label>
          <Input id="email" bind:value={email} type="email" />
        </div>
        <div class="mb-4">
          <label for="comment">Pesan</label>
          <Textarea id="comment" bind:value={comment} class="w-full" />
        </div>
        <Button onclick={handleSubmit} class="mt-4">Kirim</Button>
      </form>  
    </div>
    <div class="w-full md:basis-2/3 ms-5">
      <p class="text-2xl text-gray-500 mt-5 font-light">
        Untuk kritik, saran, atau pertanyaan, silakan isi formulir di samping atau hubungi kami melalui email.
      </p>
      <p class="text-xl text-gray-500 my-4 font-light">
        Email: <a href="mailto:widoyo@gmail.com">kami</a></p>
    </div>
  </div>
</section>