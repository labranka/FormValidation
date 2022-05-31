"use strict";
const container = document.querySelector(".container");
const overlay = document.querySelector(".overlay");
const btnSubmit = document.querySelector(".btn");
const form = document.getElementById("form");
const ime = document.getElementById("ime");
const prezime = document.getElementById("prezime");
const adresa = document.getElementById("adresa");
const grad = document.getElementById("grad");
const pol = document.getElementById("pol");
const godina = document.getElementById("godina");
const provera = document.getElementById("provera");
const napomena = document.getElementById("napomena");

const closeForm = function () {
  container.classList.add("hidden");
  overlay.classList.add("hidden");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  const imeValue = ime.value.trim();
  const prezimeValue = prezime.value.trim();
  const adresaValue = adresa.value.trim();
  const gradValue = grad.value.trim();

  if (imeValue === "") {
    setErrorFor(ime, "Ime ne moze biti prazno!");
    return false;
  } else {
    setSuccessFor(ime);
  }

  if (prezimeValue === "") {
    setErrorFor(prezime, "Prezime ne moze biti prazno!");
    return false;
  } else {
    setSuccessFor(prezime);
  }

  if (adresaValue === "") {
    setErrorFor(adresa, "Unesite adresu!");
    return false;
  } else {
    setSuccessFor(adresa);
  }

  if (gradValue === "") {
    setErrorFor(grad, "Unesite adresu!");
    return false;
  } else {
    setSuccessFor(grad);
  }

  if (pol.selectedIndex === 0) {
    alert("Niste izabrali pol!");
    return false;
  }
  const polValue = pol.value.trim();

  if (godina.selectedIndex === 0) {
    alert("Izaberite godinu!");
    return false;
  }
  const godinaValue = godina.value.trim();
  const napomenaValue = napomena.value.trim();

  //ajax call
  $.post(
    "https://62957c0763b5d108c19e95ef.mockapi.io/users",
    {
      ime: imeValue,
      prezime: prezimeValue,
      adresa: adresaValue,
      grad: gradValue,
      pol: polValue,
      godina: godinaValue,
      napomena: napomenaValue,
    },
    function (response) {
      overlay.innerHTML = `Uneti korisnik je: ${response.ime} ${response.prezime}`;
      overlay.classList.remove("hidden");
    }
  );
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = "";
}
