document.addEventListener("DOMContentLoaded", function() {
  let yemekAdi      = document.getElementById("yemekAdi");
  let yemekTarifi   = document.getElementById("yemekTarifi");
  let search        = document.getElementById("search");
  let yemekBaslik   = document.getElementById("yemekBaslik");
  let icerikListesi = document.getElementById("icerikListesi");
  let tarifDetay    = document.getElementById("tarifDetay");
  let yemek         = {
    yemekAdi   : "",
    yemekTarifi: "",
    icindekiler: [],
  };

  let icindeki = [];

  let urunler = JSON.parse(localStorage.getItem("urunler"));
  if (urunler == null) {
    urunler = [];
  }
  listele(urunler);

  yemekAdi.addEventListener("input", function() {
    let yemekAD = this.value;
    if (yemekAD) {
      yemekBaslik.innerHTML = yemekAD;
    } else {
      yemekBaslik.innerHTML = "Yemek Başlığı yazın";
    }
    yemek.yemekAdi = yemekAD;

  });
  yemekTarifi.addEventListener("input", function() {
    let yemekTarif = this.value;
    if (yemekTarif) {
      tarifDetay.innerHTML = yemekTarif;

    } else {
      tarifDetay.innerHTML = "Yemek Tarifinizi yazınız...";
    }
    yemek.yemekTarifi = yemekTarif;
  });

  search.addEventListener("input", function() {
    let searchValue      = this.value;
    let filitrelenmisler = urunler.filter(function(urun) {
      return urun.toLowerCase().includes(searchValue.toLowerCase());
    });
    listele(filitrelenmisler);
  });

  document.body.addEventListener("click", function(event) {
    let element = event.target;
    // let addPlus2 = element.matches(".add-product");
    let addPlus = element.className.includes("add-product");
    let urunAdi = false;
    if (addPlus &&
        idExistsUrunler(element.id) && // urun varsa ekleme yapıla billmesi için önce burda id kontrol ediyorum sonra bir altta urun adini cekerken olmayan bir id yollamamak için id kontrol ediyorum
        (urunAdi = urunler[element.id]) &&
        !isNameExistsIcındekiler(urunAdi))  // içindekiler arrayı içinde  bu ürün adı var mı yokmu kontrolü için  altta funcionu olusturdum baştaki ünlemle tanımlanmamışsa eklenmemişse undefined döndürücek
     {
      let product = {
        id    : element.id,
        miktar: "",
        name  : urunler[element.id],
      };
      icindeki.push(product);
      urunListele(icindeki);
      yemek.icindekiler             = icindeki;
       let parentLi = element.parentElement;
       parentLi.style.textDecoration = "line-through"; // tıklananın üstünü çizme
       parentLi.style.opacity = "0.4";
       element.pointerEvents = "none";// + işaretini  geçersiz kılma
       element.style.opacity = "0.5"; // tıkladıktan sonra  rengini şeffaflaştırma
    }
  });

  function isNameExistsIcındekiler(name) {
    // icindeki.find(function(item) { // icindeki array içinde find bul diyorum calback function ile yada arrow ile tanımlayarak yapacağım 75.satırdaki ve 84. satırdaki aynı birisi
    //
    //   if (item.name === name) {
    //     return false;
    //   }else{
    //     return true;
    //   }
    // });

    console.log(icindeki.find(item => item.name === name));
    return icindeki.find(item => item.name === name) !== undefined; // arrow ile yapılan bulamazsa yani undefined değilse tanımlanmamış değilse tanımlanmışsa dedik
  }

  function idExistsUrunler(id) {
    return urunler[id] !== undefined; //urunler arrayımız içinde bu id var mı diye sorgulatıyorum   true urun var  false urun yok
  }

  function urunListele(urunler) {
    if (urunler == null || Array.isArray(urunler) && !urunler.length) {
      let icerikListesi       = document.getElementById("icerikListesi");
      let liElement           = document.createElement("li");
      liElement.className     = "list-group-item text-bg-warning";
      liElement.innerHTML     = "Henüz bir mazeme yok ! ";
      icerikListesi.innerHTML = "";
      icerikListesi.appendChild(liElement);
    } else {
      icerikListesi.innerHTML = "";
      urunler.forEach(function(urun, index, array) {
        let liElement       = document.createElement("li");
        let spanElement     = document.createElement("span");
        let iElement        = document.createElement("i");
        let labelElement    = document.createElement("label");
        let inputElement    = document.createElement("input");
        liElement.className = "d-flex justify-content-between";
        iElement.className  = "bi bi-trash me-3 delete-product-content text-danger";
        labelElement.setAttribute("for", "miktar-" + urun.id);
        labelElement.textContent = urun.name;
        inputElement.placeholder = "miktar";
        inputElement.className   = "float-end border-0 border-bottom border-black";
        inputElement.id          = "miktar-" + urun.id;
        icerikListesi.appendChild(liElement);
        spanElement.appendChild(iElement);
        spanElement.appendChild(labelElement);
        liElement.appendChild(spanElement);
        liElement.appendChild(inputElement);
      });
    }
  }

  function listele(urunler) {

    if (urunler == null || Array.isArray(urunler) && !urunler.length) {
      let urunListesi       = document.getElementById("urunListesi");
      let liElement         = document.createElement("li");
      liElement.className   = "list-group-item text-bg-warning";
      liElement.innerHTML   = "<b>Henüz bir mazeme yok ! </b>";
      urunListesi.innerHTML = "";
      urunListesi.appendChild(liElement);
    } else {
      urunListesi.innerHTML = "";
      urunler.forEach(function(urun, index) {
        let liElement         = document.createElement("li");
        let iElement          = document.createElement("i");
        liElement.className   = "list-group-item";
        liElement.textContent = urun;
        iElement.className    = "bi bi-plus-lg add-product float-end";
        iElement.style        = "color: #e33e3e; cursor:pointer;";
        iElement.id           = index;
        urunListesi.appendChild(liElement);
        liElement.appendChild(iElement);
      });
    }
  }
});