document.addEventListener("DOMContentLoaded", function() {
  let foodList             = document.getElementById("foodList");
  let completedListElement = document.getElementById("completedList");

  let completedList = JSON.parse(localStorage.getItem("completed_list"));
  if (completedList == null) {
    completedList = [];
  }
  let yemekListesi = JSON.parse(localStorage.getItem("yemek_listesi"));
  if (yemekListesi == null) {
    yemekListesi = [];
  }

  listele(yemekListesi,foodList);

  listele(completedList, completedListElement);

  function listele(yemekler,listElement) {
    listElement.innerHTML = "";
    if (!yemekler.length) {
      listElement.innerHTML = "Listede Yemek Yok";
    } else {
      yemekler.forEach(function(urun, index) {
        let listElement             = document.getElementById("foodList");
        let satirElement            = document.createElement("div");
        satirElement.className      = "col-md-6 mt-4";
        let cardElement             = document.createElement("div");
        cardElement.className       = "card";
        let cardHeaderElement       = document.createElement("h5");
        cardHeaderElement.className = "card-header";
        cardHeaderElement.innerHTML = `<storng>Yemek Adı: </storng>${urun.yemekAdi}`;
        let cardBodyElement         = document.createElement("div");
        cardBodyElement.className       = "card-body";
        let contentTitle            = document.createElement("h5");
        contentTitle.textContent    = "Içindekiler";
        let ulContentListElement    = document.createElement("ul");
        urun.icindekiler.forEach(function(item) {
          let liElement         = document.createElement("li");
          liElement.className   = "d-flex justify-content-between";
          liElement.textContent = item.name + " miktar :  " + item.miktar;
          ulContentListElement.appendChild(liElement);
        });
        cardBodyElement.appendChild(contentTitle);
        cardBodyElement.appendChild(ulContentListElement);
        let recipeDivElement       = document.createElement("div");
        recipeDivElement.className = "recipe";
        let recipeTitle            = document.createElement("h6");
        recipeTitle.textContent       = "Tarif: ";
        let recipeDetail           = document.createElement("p");
        recipeDetail.textContent   = urun.yemekTarifi;
        recipeDivElement.appendChild(recipeTitle);
        recipeDivElement.appendChild(recipeDetail);
        let footerElement       = document.createElement("div");
        footerElement.className = "card-footer d-flex justify-content-between";
        let buttonSil           = document.createElement("button");
        buttonSil.className     = "btn btn-danger col me-5 delete-food";
        buttonSil.textContent   = "Sil";
        buttonSil.setAttribute("data-id", index);
        let buttonTamam         = document.createElement("button");
        buttonTamam.className   = "btn btn-success col complated";
        buttonTamam.textContent = "Tamam";
        buttonTamam.setAttribute("data-id", index);
        footerElement.appendChild(buttonSil);
        footerElement.appendChild(buttonTamam);
        cardElement.appendChild(cardHeaderElement);
        cardElement.appendChild(cardBodyElement);
        cardElement.appendChild(footerElement);
        satirElement.appendChild(cardElement);
        listElement.appendChild(satirElement);
      });
    }
  }
});