<script>
  let nama = '';
  let email = '';
  let pesan = '';
  let emailError = '';
  let successMessage = '';
  let errorMessage = '';
  let isLoading = false; // Untuk menunjukkan status loading

  // Ganti dengan URL Aplikasi Web Google Apps Script Anda yang sudah disalin
  //const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzGgaw2HOXs4ZTXEsXnA5wpFYDFWnOPcarLrDgAFze7yAn3z8Br0dyYfMswjtoCJMNgcQ/exec';
  const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwuqZUToSIbwlJ7XmaJ2MiK9D22vFfikla2oCWuOjt2/dev';
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  async function handleSubmit() {
    successMessage = '';
    errorMessage = '';
    emailError = '';

    // Validasi email di sisi klien
    if (!validateEmail(email)) {
      emailError = 'Email tidak valid.';
      return; // Hentikan proses pengiriman jika email tidak valid
    }

    isLoading = true; // Aktifkan loading
    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nama, email, pesan }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        successMessage = 'Pesan Anda berhasil dikirim!';
        // Reset form setelah berhasil
        nama = '';
        email = '';
        pesan = '';
      } else {
        errorMessage = `Gagal mengirim pesan: ${result.message || 'Terjadi kesalahan tidak dikenal.'}`;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      errorMessage = 'Terjadi kesalahan saat menghubungi server. Silakan coba lagi nanti.';
    } finally {
      isLoading = false; // Nonaktifkan loading
    }
  }
</script>

<style>
  form {
    max-width: 500px;
    margin: 40px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  div {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }
  input[type="text"],
  input[type="email"],
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box; /* Agar padding tidak menambah lebar */
    font-size: 16px;
  }
  textarea {
    resize: vertical; /* Izinkan textarea diubah ukurannya secara vertikal */
    min-height: 100px;
  }
  button {
    background-color: #007bff;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    width: 100%;
    transition: background-color 0.3s ease;
  }
  button:hover {
    background-color: #0056b3;
  }
  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  .error-message {
    color: red;
    font-size: 0.9em;
    margin-top: 5px;
  }
  .success-message {
    color: green;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
  }
  .alert-error {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 15px;
    text-align: center;
  }
</style>

<h1>Kirim Pesan Anda</h1>

<form on:submit|preventDefault={handleSubmit}>
  {#if errorMessage}
    <p class="alert-error">{errorMessage}</p>
  {/if}

  <div>
    <label for="nama">Nama:</label>
    <input type="text" id="nama" bind:value={nama} required />
  </div>

  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required />
    {#if emailError}
      <p class="error-message">{emailError}</p>
    {/if}
  </div>

  <div>
    <label for="pesan">Pesan:</label>
    <textarea id="pesan" bind:value={pesan} required></textarea>
  </div>

  <button type="submit" disabled={isLoading}>
    {#if isLoading}
      Mengirim...
    {:else}
      Kirim Pesan
    {/if}
  </button>

  {#if successMessage}
    <p class="success-message">{successMessage}</p>
  {/if}
</form>