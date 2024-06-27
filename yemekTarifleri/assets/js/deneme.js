document.addEventListener("DOMContentLoaded", function() {

  let yemekAdi      = document.getElementById("yemekAdi");
  let yemekTarifi   = document.getElementById("yemekTarifi");
  let search        = document.getElementById("search");
  let urunListesi   = document.getElementById("urunListesi");
  let yemekBaslik   = document.getElementById("yemekBaslik");
  let icerikListesi = document.getElementById("icerikListesi");
  let tarifDetay    = document.getElementById("tarifDetay");
  let urunler       = JSON.parse(localStorage.getItem("urunler"));

  if (urunler == null) {
    urunler = [];
  }

  let yemek    = {
    yemekAdi   : "",
    yemekTarifi: "",
    icindekiler: [],
  };
  let icindeki = [];

  listele(urunler);
  icindekilisteleme(icindeki);

  yemekAdi.addEventListener("input", function() {
    let yemekAD = this.value;
    if (yemekAD) {
      yemekBaslik.innerHTML = yemekAD;
    } else {
      yemekBaslik.innerHTML = "Yazınız";
    }
  });

  yemekTarifi.addEventListener("input", function() {
    let yemekTarif = this.value;
    if (yemekTarif) {
      tarifDetay.innerHTML = yemekTarif;
    } else {
      tarifDetay.innerHTML = "Lezzetli yemeklerinizi eklemek içi sol taraftaki alana yazınız";
    }
  });

  search.addEventListener("input", function() {
    let searchValue        = this.value;
    let fitrelenmisurunler = urunler.filter(function(value) {
      return value.toLowerCase().includes(searchValue.toLowerCase());
    });
    listele(fitrelenmisurunler);
  });

  document.body.addEventListener("click", function(event) {
    let element  = event.target;
    let addPlus2 = element.matches(".add-product");
    let addPlus  = element.className.includes("add-product");
    if (addPlus) {
      let product = {
        id    : element.id,
        name  : urunler[element.id],
        miktar: "",
      };
      icindeki.push(product);
      console.log(yemek);
      icindekilisteleme(icindeki);
      yemek.icindekiler = icindeki;

    }
  });

  function icindekilisteleme(urunler) {
    if (urunler == null || (Array.isArray(urunler) && !urunler.length)) {
      let icerikListesi       = document.getElementById("icerikListesi");
      let liElement           = document.createElement("li");
      liElement.className     = "d-flex justify-content-between bg-danger text-white ms-3";
      liElement.textContent   = "Henüz ekleme yapılmadı";
      icerikListesi.innerHTML = "";
      icerikListesi.appendChild(liElement);
    } else {
      icerikListesi.innerHTML = "";
      urunler.forEach(function(urun, index) {
        let liElement = document.createElement("li");
        let spanElement = document.createElement("span");
        let iElement = document.createElement("i");
        let labelElement = document.createElement("label");
        let inputElement = document.createElement("input");
        liElement.className="justify-content-between";
        iElement.className = "bi bi-trash delete-product-content text-danger";
        labelElement.setAttribute("for","miktar-"+urun.id)
        labelElement.textContent = urun.name;
        inputElement.placeholder = "Miktar";
        inputElement.id = "miktar-" + urun.id;
        inputElement.className="float-end border-0 border-bottom border-black"
        icerikListesi.appendChild(liElement);
        liElement.appendChild(spanElement);
        spanElement.appendChild(iElement);
        spanElement.appendChild(labelElement);
        liElement.appendChild(inputElement);
      });
    }
  }

  function listele(urunler) {
    if (urunler == null || (Array.isArray(urunler) && !urunler.length)) {
      let urunListesi       = document.getElementById("urunListesi");
      let liElement         = document.createElement("li");
      let iElement          = document.createElement("i");
      liElement.className   = "list-group-item bg-warning text-white";
      liElement.textContent = "Henüz bir ürün eklenmedi";
      urunListesi.innerHTML = "";
      urunListesi.appendChild(liElement);
    } else {
      urunListesi.innerHTML = "";
      urunler.forEach(function(urun, index) {
        let liElement         = document.createElement("li");
        let iElement          = document.createElement("i");
        liElement.className   = "list-group-item";
        liElement.textContent = urun;
        iElement.className    = "bi bi-plus-lg add-product float-end text-danger";
        iElement.id           = index;
        urunListesi.appendChild(liElement);
        liElement.appendChild(iElement);
      });
    }
  }
});


