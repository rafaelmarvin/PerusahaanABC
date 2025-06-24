// Car data - Updated dengan path gambar yang sesuai struktur folder
const cars = [
  {
    id: 1,
    name: "Toyota Avanza",
    price: 500000,
    image: "asset/avanza.jpg", // Sesuai dengan struktur folder
    description: "Mobil keluarga yang nyaman dan irit bahan bakar",
  },
  {
    id: 2,
    name: "Toyota Kijang Innova",
    price: 700000,
    image: "asset/innova.png", // Sesuai dengan struktur folder
    description: "MPV premium dengan kenyamanan maksimal",
  },
  {
    id: 3,
    name: "Honda HRV",
    price: 600000,
    image: "asset/hrv.jpg", // Sesuai dengan struktur folder
    description: "SUV kompak dengan desain modern",
  },
  {
    id: 4,
    name: "Daihatsu Sigra",
    price: 450000,
    image: "asset/sigra.jpg", // Sesuai dengan struktur folder
    description: "LCGC yang ekonomis dan praktis",
  },
]

// Global variables
let selectedCars = []
let bookings = []
let currentSlide = 0
const totalSlides = 3

// DOM elements
const carsGrid = document.getElementById("carsGrid")
const customerForm = document.getElementById("customerForm")
const calculateBtn = document.getElementById("calculateBtn")
const saveBookingBtn = document.getElementById("saveBookingBtn")
const summaryContainer = document.getElementById("summaryContainer")
const summaryContent = document.getElementById("summaryContent")
const bookingsContainer = document.getElementById("bookingsContainer")
const successModal = document.getElementById("successModal")
const closeModal = document.querySelector(".close")

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  renderCars()
  loadBookings()
  renderBookings()
  setupEventListeners()
  initializeSlider()
  animateStats()
  setupScrollAnimations()
}

function setupEventListeners() {
  calculateBtn.addEventListener("click", calculateTotal)
  saveBookingBtn.addEventListener("click", saveBooking)
  closeModal.addEventListener("click", closeSuccessModal)

  window.addEventListener("click", (event) => {
    if (event.target === successModal) {
      closeSuccessModal()
    }
  })

  // Slider controls
  document.querySelector(".prev-btn").addEventListener("click", prevSlide)
  document.querySelector(".next-btn").addEventListener("click", nextSlide)

  // Indicator controls
  document.querySelectorAll(".indicator").forEach((indicator, index) => {
    indicator.addEventListener("click", () => goToSlide(index))
  })
}

// Slider functionality
function initializeSlider() {
  const slides = document.querySelectorAll(".slide")

  // Set background images
  slides.forEach((slide, index) => {
    const bgImage = slide.getAttribute("data-bg")
    slide.style.backgroundImage = `url(${bgImage})`
  })

  // Auto-play slider
  setInterval(nextSlide, 5000)
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides
  updateSlider()
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
  updateSlider()
}

function goToSlide(index) {
  currentSlide = index
  updateSlider()
}

function updateSlider() {
  const slides = document.querySelectorAll(".slide")
  const indicators = document.querySelectorAll(".indicator")

  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide)
  })

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide)
  })
}

// Stats animation
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = Number.parseInt(entry.target.getAttribute("data-target"))
        animateNumber(entry.target, target)
      }
    })
  })

  statNumbers.forEach((stat) => observer.observe(stat))
}

function animateNumber(element, target) {
  let current = 0
  const increment = target / 50
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    element.textContent = Math.floor(current) + (target === 24 ? "" : "+")
  }, 30)
}

// Scroll animations
function setupScrollAnimations() {
  const animateElements = document.querySelectorAll(".feature-card, .car-card, .booking-card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in")
        }
      })
    },
    { threshold: 0.1 },
  )

  animateElements.forEach((el) => observer.observe(el))
}

function renderCars() {
  carsGrid.innerHTML = ""

  cars.forEach((car) => {
    const carCard = createCarCard(car)
    carsGrid.appendChild(carCard)
  })
}

function createCarCard(car) {
  const cardDiv = document.createElement("div")
  cardDiv.className = "car-card"
  cardDiv.innerHTML = `
        <img src="${car.image}" alt="${car.name}" class="car-image" onerror="this.src='/placeholder.svg?height=250&width=350'">
        <div class="car-info">
            <h3>${car.name}</h3>
            <p class="car-price">Rp ${formatCurrency(car.price)} / hari</p>
            <p style="color: #666; margin-bottom: 1rem; line-height: 1.6;">${car.description}</p>
        </div>
        <div class="car-controls">
            <div class="checkbox-container">
                <input type="checkbox" id="car-${car.id}" data-car-id="${car.id}">
                <label for="car-${car.id}">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem; color: #ff4444;"></i>
                    Pilih mobil ini
                </label>
            </div>
            <div class="date-duration-container" id="controls-${car.id}">
                <div class="form-group">
                    <label for="startDate-${car.id}">
                        <i class="fas fa-calendar-alt" style="margin-right: 0.5rem;"></i>
                        Tanggal Mulai
                    </label>
                    <input type="date" id="startDate-${car.id}" disabled>
                </div>
                <div class="form-group">
                    <label for="duration-${car.id}">
                        <i class="fas fa-clock" style="margin-right: 0.5rem;"></i>
                        Durasi (hari)
                    </label>
                    <input type="number" id="duration-${car.id}" min="1" value="1" disabled>
                </div>
            </div>
        </div>
    `

  // Add event listener for checkbox
  const checkbox = cardDiv.querySelector(`#car-${car.id}`)
  checkbox.addEventListener("change", function () {
    handleCarSelection(car.id, this.checked)
  })

  return cardDiv
}

function handleCarSelection(carId, isSelected) {
  const card = document.querySelector(`#car-${carId}`).closest(".car-card")
  const controls = document.getElementById(`controls-${carId}`)
  const startDateInput = document.getElementById(`startDate-${carId}`)
  const durationInput = document.getElementById(`duration-${carId}`)

  if (isSelected) {
    card.classList.add("selected")
    controls.classList.add("enabled")
    startDateInput.disabled = false
    durationInput.disabled = false

    // Set minimum date to today
    const today = new Date().toISOString().split("T")[0]
    startDateInput.min = today
    startDateInput.value = today

    // Add to selected cars
    const car = cars.find((c) => c.id === carId)
    selectedCars.push({
      ...car,
      startDate: today,
      duration: 1,
    })

    // Add animation
    card.style.transform = "scale(1.02)"
    setTimeout(() => {
      card.style.transform = "scale(1)"
    }, 200)
  } else {
    card.classList.remove("selected")
    controls.classList.remove("enabled")
    startDateInput.disabled = true
    durationInput.disabled = true

    // Remove from selected cars
    selectedCars = selectedCars.filter((car) => car.id !== carId)
  }

  // Add event listeners for date and duration changes
  startDateInput.addEventListener("change", function () {
    updateSelectedCar(carId, "startDate", this.value)
  })

  durationInput.addEventListener("change", function () {
    updateSelectedCar(carId, "duration", Number.parseInt(this.value))
  })

  // Reset summary and save button
  summaryContainer.style.display = "none"
  saveBookingBtn.disabled = true
}

function updateSelectedCar(carId, field, value) {
  const carIndex = selectedCars.findIndex((car) => car.id === carId)
  if (carIndex !== -1) {
    selectedCars[carIndex][field] = value
  }
}

function calculateTotal() {
  const customerName = document.getElementById("customerName").value.trim()

  // Enhanced validation with better UX
  if (!customerName) {
    showNotification("Mohon isi nama pelanggan!", "error")
    document.getElementById("customerName").focus()
    return
  }

  if (selectedCars.length === 0) {
    showNotification("Mohon pilih minimal satu mobil!", "error")
    document.getElementById("cars").scrollIntoView({ behavior: "smooth" })
    return
  }

  // Validate each selected car
  for (const car of selectedCars) {
    if (!car.startDate || car.duration < 1) {
      showNotification(`Mohon lengkapi data untuk ${car.name}!`, "error")
      return
    }
  }

  // Calculate and display summary
  displaySummary()
  saveBookingBtn.disabled = false
  showNotification("Total biaya berhasil dihitung!", "success")
}

function displaySummary() {
  let summaryHTML = ""
  let totalPrice = 0

  selectedCars.forEach((car) => {
    const subtotal = car.price * car.duration
    totalPrice += subtotal

    summaryHTML += `
            <div class="summary-item">
                <div class="summary-details">
                    <h4>
                        <i class="fas fa-car" style="margin-right: 0.5rem; color: #ff4444;"></i>
                        ${car.name}
                    </h4>
                    <p>
                        <i class="fas fa-calendar" style="margin-right: 0.5rem;"></i>
                        Tanggal: ${formatDate(car.startDate)} | Durasi: ${car.duration} hari
                    </p>
                    <p>
                        <i class="fas fa-calculator" style="margin-right: 0.5rem;"></i>
                        Rp ${formatCurrency(car.price)} × ${car.duration} hari
                    </p>
                </div>
                <div class="summary-price">
                    Rp ${formatCurrency(subtotal)}
                </div>
            </div>
        `
  })

  summaryHTML += `
        <div class="summary-item">
            <div class="summary-details">
                <h4>
                    <i class="fas fa-receipt" style="margin-right: 0.5rem; color: #ff4444;"></i>
                    Total Keseluruhan
                </h4>
            </div>
            <div class="summary-price">
                Rp ${formatCurrency(totalPrice)}
            </div>
        </div>
    `

  summaryContent.innerHTML = summaryHTML
  summaryContainer.style.display = "block"
  summaryContainer.classList.add("fade-in")

  // Smooth scroll to summary
  summaryContainer.scrollIntoView({ behavior: "smooth", block: "center" })
}

function saveBooking() {
  const customerName = document.getElementById("customerName").value.trim()

  if (!customerName || selectedCars.length === 0) {
    showNotification("Data tidak lengkap!", "error")
    return
  }

  // Add loading state
  saveBookingBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyimpan...'
  saveBookingBtn.disabled = true

  // Simulate API call delay
  setTimeout(() => {
    // Create booking object
    const booking = {
      id: Date.now(),
      customerName: customerName,
      cars: [...selectedCars],
      totalPrice: selectedCars.reduce((total, car) => total + car.price * car.duration, 0),
      timestamp: new Date().toISOString(),
      createdAt: new Date().toLocaleString("id-ID"),
    }

    // Save to localStorage
    bookings.push(booking)
    localStorage.setItem("carRentalBookings", JSON.stringify(bookings))

    // Show success modal
    showSuccessModal()

    // Reset form
    resetForm()

    // Refresh bookings display
    renderBookings()

    // Reset button
    saveBookingBtn.innerHTML = '<i class="fas fa-save"></i> Simpan Pemesanan'
  }, 1500)
}

function showSuccessModal() {
  successModal.style.display = "block"
  document.body.style.overflow = "hidden"
}

function closeSuccessModal() {
  successModal.style.display = "none"
  document.body.style.overflow = "auto"
}

function resetForm() {
  // Reset customer form
  customerForm.reset()

  // Reset car selections
  selectedCars = []
  document.querySelectorAll(".car-card").forEach((card) => {
    card.classList.remove("selected")
    const checkbox = card.querySelector('input[type="checkbox"]')
    checkbox.checked = false

    const controls = card.querySelector(".date-duration-container")
    controls.classList.remove("enabled")

    const inputs = card.querySelectorAll('input[type="date"], input[type="number"]')
    inputs.forEach((input) => {
      input.disabled = true
      if (input.type === "number") {
        input.value = 1
      }
    })
  })

  // Hide summary
  summaryContainer.style.display = "none"
  saveBookingBtn.disabled = true
}

function loadBookings() {
  const savedBookings = localStorage.getItem("carRentalBookings")
  if (savedBookings) {
    bookings = JSON.parse(savedBookings)
  }
}

function renderBookings() {
  if (bookings.length === 0) {
    bookingsContainer.innerHTML = `
            <div class="no-bookings">
                <i class="fas fa-inbox"></i>
                <h3>Belum ada pemesanan</h3>
                <p>Pemesanan Anda akan muncul di sini setelah disimpan</p>
                <a href="#cars" class="btn btn-primary" style="margin-top: 1rem;">
                    <i class="fas fa-plus"></i>
                    Buat Pemesanan Pertama
                </a>
            </div>
        `
    return
  }

  bookingsContainer.innerHTML = ""

  // Sort bookings by timestamp (newest first)
  const sortedBookings = [...bookings].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

  sortedBookings.forEach((booking, index) => {
    const bookingCard = createBookingCard(booking, index)
    bookingsContainer.appendChild(bookingCard)
  })
}

function createBookingCard(booking, index) {
  const cardDiv = document.createElement("div")
  cardDiv.className = "booking-card fade-in"
  cardDiv.style.animationDelay = `${index * 0.1}s`

  let carsHTML = ""
  booking.cars.forEach((car) => {
    carsHTML += `
            <li>
                <i class="fas fa-car" style="margin-right: 0.5rem; color: #ff4444;"></i>
                ${car.name} - ${car.duration} hari (${formatDate(car.startDate)}) - 
                <strong>Rp ${formatCurrency(car.price * car.duration)}</strong>
            </li>
        `
  })

  cardDiv.innerHTML = `
        <div class="booking-header">
            <div class="booking-info">
                <h4>
                    <i class="fas fa-user" style="margin-right: 0.5rem; color: #ff4444;"></i>
                    ${booking.customerName}
                </h4>
                <p>
                    <i class="fas fa-clock" style="margin-right: 0.5rem;"></i>
                    ${booking.createdAt}
                </p>
            </div>
            <button class="btn btn-danger" onclick="deleteBooking(${booking.id})" title="Hapus pemesanan">
                <i class="fas fa-trash"></i>
                Hapus
            </button>
        </div>
        <div class="booking-cars">
            <h5>
                <i class="fas fa-list" style="margin-right: 0.5rem;"></i>
                Mobil yang disewa:
            </h5>
            <ul>
                ${carsHTML}
            </ul>
        </div>
        <div class="booking-total">
            <i class="fas fa-money-bill-wave" style="margin-right: 0.5rem;"></i>
            Total: Rp ${formatCurrency(booking.totalPrice)}
        </div>
    `

  return cardDiv
}

function deleteBooking(bookingId) {
  if (confirm("Apakah Anda yakin ingin menghapus pemesanan ini?")) {
    bookings = bookings.filter((booking) => booking.id !== bookingId)
    localStorage.setItem("carRentalBookings", JSON.stringify(bookings))
    renderBookings()
    showNotification("Pemesanan berhasil dihapus!", "success")
  }
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
    <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
    ${message}
  `

  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === "success" ? "#28a745" : type === "error" ? "#dc3545" : "#17a2b8"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 2000;
    animation: slideInRight 0.3s ease-out;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    max-width: 300px;
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-out"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Add notification animations to CSS
const notificationStyles = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`

const styleSheet = document.createElement("style")
styleSheet.textContent = notificationStyles
document.head.appendChild(styleSheet)

// Utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID").format(amount)
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Mobile menu functionality
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const nav = document.querySelector(".nav")

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    nav.classList.toggle("active")
  })
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active")
  })
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallax = document.querySelector(".hero-showcase")
  if (parallax) {
    const speed = scrolled * 0.5
    parallax.style.transform = `translateY(${speed}px)`
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})
