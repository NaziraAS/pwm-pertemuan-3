document.addEventListener("DOMContentLoaded", function() {
// Activate sidebar nav

var elems = document.querySelectorAll(".sidenav");
M.Sidenav.init(elems);
loadNav();
//pada bagian elemen script di atas yaitu mengaktifkan side bar kerika layar website di buat responsive dan akan menampilkan menu navbar di side barnya 
function loadNav() {
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
 if (this.readyState == 4) {
 if (this.status != 200) return;

	// Muat daftar tautan menu
	document.querySelectorAll(".topnav, .sidenav").forEach(function(elm)
		{
			elm.innerHTML = xhttp.responseText;
		});

			// Daftarkan event listener untuk setiap tautan menu
			 document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
			 elm.addEventListener("click", function(event) {
			 // Tutup sidenav
			 var sidenav = document.querySelector(".sidenav");
			 M.Sidenav.getInstance(sidenav).close();

			 // Muat konten halaman yang dipanggil
			 page = event.target.getAttribute("href").substr(1);
			 loadPage(page);
			});
		});
	  }
	};
	 xhttp.open("GET", "nav.html", true);
	 xhttp.send();
 }
 // element dari baris 15 yaitu mengambil semua elements dari class topnav dan sidenav, di ambil lagi class sidenav a dan topnav a kemudian 
 // dijalankan function addEventListener yang ketika di click akan menjalankan sidebar dan ketika di klik juga akan ada event close untu
 // sidebar nya, targer ketika di klik adalah atribut href yang ketika di klik akan menuju page yang ada di function loadPage

// Load  page  content
var page  = window.location.hash.substr(1);
if (page  == "") page  = "home";
loadPage(page);
function loadPage(page) {
    var xhttp  = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
         var content = document.querySelector("#body-content");
         if (this.status == 200)  {
            content.innerHTML = xhttp.responseText;
         } else  if (this.status == 404)  {
            content.innerHTML = "<p>Halaman tidak  ditemukan.</p>";
         } else  {
            content.innerHTML = "<p>Ups.. halaman tidak  dapat  diakses.</p>";
         }
       }
    };
    xhttp.open("GET", "pages/" + page  + ".html", true);
    xhttp.send();
}
// pada function loadPage di atas defaultnya atau ketika mengakses index maka akan menampilkan home.html ketika readyState==4 maka 
// akan mengambil semua elemet yang ada di dalam id body-content di index.html. ketika status==200 maka akan menampilkan pesan xhttp.responseText
// ketika status==404 maka akan menampilkan "halaman tidak di temukan", ketika tidak ada response atau jaringan internet maka akan 
// menmapilkan response "ups,,, halaman tidak dapat di akses".

});