<script lang="ts">
  import "../../app.css";
  import { ModeWatcher } from "mode-watcher";
  import { toggleMode } from "mode-watcher";

  let { children } = $props();
</script>

<div class="navbar bg-base-100 shadow-xs">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">SIH3 BBWS Citanduy</a>
	</div>
	<div class="flex-none">
		  <div class="block lg:hidden">
    <button id="burger-button" class="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-15z"/></svg>
    </button>
  </div>
		<ul class="menu menu-horizontal px-1 text-base max-md:hidden">
			<li>
				<details class="dropdown">
					<summary>Beranda</summary>
					<div class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
					</div>
				</details>
			</li>
			<li>
				<details>
					<summary>Pos Pengamatan</summary>
					<ul class="bg-base-100 rounded-t-none p-2">
						<li><a>Link 1</a></li>
						<li><a>Link 2</a></li>
					</ul>
				</details>
			</li>
			<li>
				<details class="dropdown">
					<summary>Data H3</summary>
					<ul class="menu dropdown-content bg-base-100 rounded-box z-1 p-2">
						<li><a>Link 1</a></li>
						<li><a>Link 2</a></li>
					</ul>
				</details>
			</li>
			<li>
				<details>
					<summary>Publikasi</summary>
					<ul class="bg-base-100 rounded-t-none p-2">
						<li><a>Link 1</a></li>
						<li><a>Link 2</a></li>
					</ul>
				</details>
			</li>
		</ul>
	</div>
	<div class="flex-none">
		<button class="btn btn-ghost text-xl" onclick={toggleMode}>
			<ModeWatcher />
		</button>
	</div>
</div>
<div class="container mx-auto p-4">
  {@render children()}
</div>
<div class="flex justify-center items-center p-4">
  <p class="text-sm text-muted-foreground">Powered by Svelte</p>
</div>
<div class="flex justify-center items-center p-4">
  <p class="text-sm text-muted-foreground">© 2023 Your Company</p>
</div>
