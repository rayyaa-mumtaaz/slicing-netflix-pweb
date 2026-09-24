const movies = [
    { title: "Tumbal Proyek", image: "assets/poster-1.webp" },
    { title: "Hantu Dalam Sel", image: "assets/poster-2.webp" },
    { title: "Tunggu Aku Sukses Nanti", image: "assets/poster-3.webp" },
    { title: "Semua Akan Baik Baik Saja", image: "assets/poster-4.webp" },
    { title: "Ayah, Ini Arahnya Kemana, Ya?", image: "assets/poster-5.webp" }
];

const translations = {
    id: {
        start: "Mulai",
        login: "Masuk",
        reload: "Muat ulang",
        email: "Alamat email",
        validEmail: "Masukkan alamat email yang valid.",
        thanks: "Terima kasih! Ini hanya simulasi pendaftaran.",
        soon: "Segera hadir",
        watching: "Menonton"
    },
    en: {
        start: "Get Started",
        login: "Sign In",
        reload: "Refresh",
        email: "Email address",
        validEmail: "Please enter a valid email address.",
        thanks: "Thank you! This is only a registration simulation.",
        soon: "Coming soon",
        watching: "Watching"
    }
};

// Bahasa default
let currentLanguage = "id";

// Mengambil bagian halaman yang akan digunakan oleh JavaScript
const movieList = document.getElementById("movie-list");
const shuffleButton = document.getElementById("shuffle-button");
const loginButton = document.getElementById("login-button");
const languageSelect = document.getElementById("language-select");
const modal = document.getElementById("movie-modal");
const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");
const modalPoster = document.getElementById("modal-poster");
const modalTitle = document.getElementById("modal-title");
const modalWatch = document.getElementById("modal-watch");

// Membuat kartu film dari data yang ada di array
function displayMovies(movieData) {
    movieList.innerHTML = "";

    movieData.forEach(function(movie, index) {
        const card = document.createElement("article");
        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="${movie.image}" alt="Poster ${movie.title}">
            <strong class="movie-rank">${index + 1}</strong>
            <span class="movie-name">${movie.title}</span>
        `;

        card.addEventListener("click", function() {
            openModal(movie);
        });

        movieList.appendChild(card);
    });
}

function openModal(movie) {
    modalPoster.src = movie.image;
    modalPoster.alt = movie.title;
    modalTitle.textContent = movie.title;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

// Tsimulasi film mulai ditonton
modalWatch.addEventListener("click", function() {
    alert(translations[currentLanguage].watching + ": " + modalTitle.textContent);
});

// Menampilkan lima film ketika halaman pertama kali dibuka
displayMovies(movies);

// Menyusun ulang urutan poster ketika tombol refresh ditekan
shuffleButton.addEventListener("click", function() {
    const shuffledMovies = [...movies];

    shuffledMovies.sort(function() {
        return Math.random() - 0.5;
    });

    displayMovies(shuffledMovies);
});

// Membuka satu jawaban FAQ dan menutup jawaban lainnya
 document.querySelectorAll(".faq-question").forEach(function(question) {
    question.addEventListener("click", function() {
        const faqItem = question.parentElement;
        const isOpen = faqItem.classList.contains("open");
        const symbol = question.querySelector("span");

        document.querySelectorAll(".faq-item").forEach(function(item) {
            item.classList.remove("open");
            item.querySelector("span").textContent = "+";
        });

        if (!isOpen) {
            faqItem.classList.add("open");
            symbol.textContent = "−";
        }
    });
});

// Memeriksa email yang dimasukkan pada form
function handleEmailForm(form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const emailInput = form.querySelector("input");
        const email = emailInput.value.trim();
        let message = form.querySelector(".form-message");

        if (!message) {
            message = document.createElement("p");
            message.classList.add("form-message");
            form.appendChild(message);
        }

        if (!email.includes("@")) {
            message.textContent = translations[currentLanguage].validEmail;
            message.style.color = "#ffb400";
        } else {
            message.textContent = translations[currentLanguage].thanks;
            message.style.color = "#7ee787";
        }
    });
}

handleEmailForm(document.getElementById("email-form"));
handleEmailForm(document.getElementById("bottom-email-form"));

// Tombol masuk menampilkan pesan simulasi
loginButton.addEventListener("click", function() {
    loginButton.textContent = translations[currentLanguage].soon;

    setTimeout(function() {
        loginButton.textContent = translations[currentLanguage].login;
    }, 1800);
});

// Mengganti teks halaman sesuai bahasa yang dipilih
function translatePage(language) {
    currentLanguage = language;
    document.documentElement.lang = language;

    document.querySelectorAll("[data-id][data-en]").forEach(function(element) {
        if (element.tagName === "BUTTON" && element.classList.contains("faq-question")) {
            element.firstChild.textContent = element.dataset[language];
        } else {
            element.textContent = element.dataset[language];
        }
    });

    document.querySelectorAll(".email-form input").forEach(function(input) {
        input.placeholder = translations[language].email;
        input.setAttribute("aria-label", translations[language].email);
    });

    loginButton.textContent = translations[language].login;
    shuffleButton.textContent = translations[language].reload;

    document.querySelectorAll(".email-form .button").forEach(function(button) {
        const span = button.querySelector("span");
        button.textContent = translations[language].start + " ";
        button.appendChild(span);
    });

    languageSelect.setAttribute("aria-label", translations[language].email);
}

// Menjalankan perubahan bahasa ketika pilihan dropdown berubah
languageSelect.addEventListener("change", function() {
    translatePage(languageSelect.value);
});
