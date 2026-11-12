// All visible copy lives here so other languages (en, ru) can be added as sibling files later.
export const company = {
  name: "Beo San D.D.D",
  city: "Beograd",
  phones: ["064/947-6677", "064/5151-532"] as const,
  email: "office.beosan@gmail.com",
  address: "Adresa — dopuniti", // TODO
  hours: "Radno vreme — dopuniti", // TODO
};

export const tel = (p: string) => "tel:+381" + p.replace(/\D/g, "").replace(/^0/, "");

export const sr = {
  nav: [
    { id: "pocetna", label: "Početna" },
    { id: "o-nama", label: "O nama" },
    { id: "usluge", label: "Usluge" },
    { id: "kome-pruzamo-usluge", label: "Kome pružamo usluge" },
    { id: "kontakt", label: "Kontakt" },
  ],
  hero: {
    eyebrow: "DDD usluge · Beograd",
    title: "Profesionalna deratizacija, dezinsekcija i dezinfekcija",
    text: "Pouzdano rešavamo probleme sa glodarima, insektima i mikroorganizmima u domovima, poslovnim prostorima i industrijskim objektima — temeljno, diskretno i uz pažljivo odabrane tretmane.",
    call: "Pozovite nas",
    offer: "Zatražite ponudu",
    trust: "Dolazimo na teren sa opremljenim vozilom i zaštitnom opremom, uz jasan dogovor pre svakog tretmana.",
  },
  about: {
    eyebrow: "O nama",
    title: "Higijena i bezbednost prostora su naš posao",
    text: [
      "Beo San D.D.D je beogradska ekipa posvećena zaštiti prostora od štetočina i uzročnika bolesti. Svakom zadatku pristupamo stručno i odgovorno — od prve procene do završnog tretmana.",
      "Ne verujemo u šablonska rešenja. Svaki objekat je drugačiji, pa i plan rada prilagođavamo njegovoj nameni, veličini i specifičnim potrebama klijenta.",
    ],
    points: ["Profesionalan i odgovoran pristup", "Pažnja prema higijeni i bezbednosti", "Individualan plan za svakog klijenta", "Kvalitet i efikasnost u svakom koraku"],
  },
  services: {
    eyebrow: "Naše usluge",
    title: "Kompletne DDD usluge na jednom mestu",
    more: "Saznajte više",
    items: [
      { key: "deratizacija", title: "Deratizacija", text: "Profesionalna kontrola i prevencija pojave miševa i pacova u stambenim i poslovnim objektima, uz postavljanje zaštićenih mamaka i redovan nadzor." },
      { key: "dezinsekcija", title: "Dezinsekcija", text: "Eliminacija bubašvaba, mrava, komaraca, muva, stenica i svih ostalih insekata — tretmanima prilagođenim vrsti insekta i prostoru." },
      { key: "dezinfekcija", title: "Dezinfekcija", text: "Potpuna dezinfekcija prostora stambene, poslovne i industrijske namene radi uklanjanja bakterija, virusa i gljivica." },
      { key: "fumigacija", title: "Fumigacija", text: "Fumigacija objekata, magacina i robe radi potpunog uništenja štetočina u skladišnim i proizvodnim prostorima." },
    ],
  },
  preparati: {
    eyebrow: "Preparati i dozvole",
    title: "Provereni preparati, sva potrebna rešenja",
    text: "Preparati koje primenjujemo proizvedeni su od strane najpoznatijih domaćih i svetskih proizvođača. Bezbedni su i ekološki, prilagođeni svakoj situaciji — vaše zdravlje i higijena su naš prioritet.",
    brandsTitle: "Proizvođači čije preparate koristimo",
    brands: ["Bayer", "BASF", "Pest Experts", "Syngenta", "Duochem"],
    points: [
      "Svi preparati poseduju rešenja Ministarstva poljoprivrede i zaštite životne sredine",
      "Važeći MSDS (bezbednosni listovi) za svaki preparat",
      "Rešenje Ministarstva zdravlja za obavljanje delatnosti",
      "Rešenje Ministarstva poljoprivrede — Uprave za veterinu",
    ],
  },
  gallery: {
    eyebrow: "Galerija",
    title: "Naš rad na terenu",
    text: "Pogledajte kako izgleda naš rad — od intervencija u stambenim i poslovnim objektima do pripreme preparata u laboratoriji.",
    prev: "Prethodna fotografija",
    next: "Sledeća fotografija",
    slides: [
      { src: "/images/beosan.jpg", alt: "Ekipa Beo San D.D.D u zaštitnim odelima ispred stambene zgrade", caption: "Intervencija u stambenom naselju" },
      { src: "/images/beosan1.jpg", alt: "Saradnik u zaštitnom odelu ispred reprezentativnog objekta", caption: "Dezinfekcija reprezentativnih objekata" },
      { src: "/images/ddd.jpg", alt: "Dezinfekcija televizijskog studija", caption: "Dezinfekcija TV studija" },
      { src: "/images/preparati.jpg", alt: "Priprema preparata u laboratoriji", caption: "Pažljiv odabir preparata" },
      { src: "/images/preparati2.jpg", alt: "Rad sa preparatima u laboratoriji", caption: "Kontrolisana priprema sredstava" },
      { src: "/images/preparati3.jpg", alt: "Laboratorijska priprema tretmana", caption: "Laboratorijska priprema tretmana" },
    ],
  },
  why: {
    eyebrow: "Zašto mi",
    title: "Na šta možete da računate",
    items: [
      { title: "Profesionalan pristup", text: "Jasna komunikacija, dogovor o terminu i uredan rad na terenu." },
      { title: "Stručno osoblje", text: "Ekipa koja poznaje sredstva, opremu i procedure rada." },
      { title: "Savremene metode rada", text: "Koristimo savremenu opremu i proverene tehnike primene." },
      { title: "Pažljiv odabir tretmana", text: "Tretman biramo prema vrsti problema i nameni prostora." },
      { title: "Individualan pristup", text: "Plan rada prilagođen vašem objektu i rasporedu." },
      { title: "Pouzdana i pravovremena usluga", text: "Dolazimo kada je dogovoreno i završavamo ono što započnemo." },
    ],
  },
  industries: {
    eyebrow: "Kome pružamo usluge",
    title: "Za domove, firme i ustanove",
    text: "Radimo u objektima različite namene — od stanova do proizvodnih pogona.",
    items: ["Stambeni objekti i kuće", "Restorani i hoteli", "Prehrambena industrija", "Magacini i proizvodni pogoni", "Poslovni prostori", "Zdravstvene i obrazovne ustanove"],
  },
  cta: {
    title: "Potrebno vam je pouzdano DDD rešenje?",
    text: "Opišite nam problem i prostor — predložićemo odgovarajući tretman i poslati ponudu.",
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Javite nam se",
    text: "Pozovite nas direktno ili pošaljite upit putem forme.",
    labels: { phone: "Telefon", email: "Email", address: "Adresa", hours: "Radno vreme" },
    form: {
      name: "Ime i prezime", phone: "Broj telefona", email: "Email adresa", service: "Vrsta usluge", message: "Poruka",
      servicePlaceholder: "Izaberite uslugu", serviceOther: "Kombinovano / nisam siguran",
      submit: "Pošalji upit",
      errors: { name: "Unesite ime i prezime.", phone: "Unesite ispravan broj telefona.", email: "Unesite ispravnu email adresu.", service: "Izaberite vrstu usluge.", message: "Napišite kratku poruku (najmanje 10 karaktera)." },
      successTitle: "Upit je spreman",
      successText: "Hvala! Slanje upita putem forme još nije povezano — za brz odgovor pozovite nas na broj ispod.",
      again: "Novi upit",
    },
  },
  footer: {
    text: "Deratizacija, dezinsekcija i dezinfekcija stambenih, poslovnih i industrijskih prostora u Beogradu.",
    nav: "Navigacija", services: "Usluge", contact: "Kontakt", social: "Pratite nas",
    rights: "Sva prava zadržana.",
  },
};
