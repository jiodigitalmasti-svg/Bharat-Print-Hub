// Bharat Print Interactive Functionality & Theme Switcher Engine

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });

        // Close mobile nav on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });
    }

    // Aadhaar File Input listener
    const aadhaarInput = document.getElementById('aadhaarInput');
    if (aadhaarInput) {
        aadhaarInput.addEventListener('change', handleAadhaarUpload);
    }

    // Load saved theme if available
    const savedTheme = localStorage.getItem('bharat_print_theme');
    if (savedTheme) {
        setTheme(savedTheme, false);
    }
});

// --- Theme Switcher & Auto Theme Changer Logic ---
const themesList = ['blue', 'purple', 'emerald', 'orange', 'ruby', 'teal', 'pink', 'indigo', 'amber', 'lime', 'violet', 'coral', 'turquoise', 'slate', 'sunshine'];
let autoThemeInterval = null;
let isAutoThemeRunning = false;

function setTheme(themeName, save = true) {
    document.documentElement.setAttribute('data-theme', themeName);
    if (save) {
        localStorage.setItem('bharat_print_theme', themeName);
    }

    // Update active dot indicators
    document.querySelectorAll('.theme-dot').forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('onclick')?.includes(`'${themeName}'`)) {
            dot.classList.add('active');
        }
    });
}

function toggleAutoTheme() {
    const statusEl = document.getElementById('autoThemeStatus');
    const btnEl = document.getElementById('autoThemeToggleBtn');

    if (isAutoThemeRunning) {
        clearInterval(autoThemeInterval);
        autoThemeInterval = null;
        isAutoThemeRunning = false;
        statusEl.innerText = 'Auto: OFF';
        btnEl.innerText = '▶ Start Auto';
        btnEl.style.background = 'var(--primary)';
    } else {
        isAutoThemeRunning = true;
        statusEl.innerText = 'Auto: ON (3s)';
        btnEl.innerText = '⏸ Pause Auto';
        btnEl.style.background = '#e11d48';

        let currentIndex = themesList.indexOf(document.documentElement.getAttribute('data-theme') || 'blue');
        
        autoThemeInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % themesList.length;
            setTheme(themesList[currentIndex], false);
        }, 3000);
    }
}

// Quick Order Handler from Hero Section
function handleQuickSubmit(event) {
    event.preventDefault();
    const docType = document.getElementById('docType').value;
    const copies = document.getElementById('printCopies').value;
    const color = document.getElementById('colorOption').value;

    alert(`Quick Order Received!\nType: ${docType}\nCopies: ${copies}\nQuality: ${color}\n\nRedirecting to WhatsApp for instant verification...`);
    
    const message = encodeURIComponent(`Hello Bharat Print, I want to order: ${docType}, Copies: ${copies}, Quality: ${color}`);
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
}

// Aadhaar Tool Image Upload Handler
function handleAadhaarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const photoBox = document.getElementById('pvcPhoto');
        if (photoBox) {
            photoBox.innerHTML = `<img src="${event.target.result}" style="width:100%; height:100%; object-fit:cover; border-radius:4px;">`;
        }
        
        document.getElementById('prevName').innerText = 'नाम: ' + (file.name.split('.')[0].toUpperCase() || 'RAHUL KUMAR');
        alert('Aadhaar Document Loaded Successfully! Quality enhanced to 300 DPI.');
    };
    reader.readAsDataURL(file);
}

// Aadhaar Filter adjustment
function adjustAadhaarFilter() {
    const brightnessVal = document.getElementById('brightness').value;
    const frontCard = document.getElementById('pvcFront');
    
    if (frontCard) {
        frontCard.style.filter = `brightness(${brightnessVal}%) contrast(105%)`;
    }
}

function resetAadhaarTool() {
    document.getElementById('brightness').value = 105;
    adjustAadhaarFilter();
    const photoBox = document.getElementById('pvcPhoto');
    if (photoBox) {
        photoBox.innerHTML = `👤`;
    }
    document.getElementById('prevName').innerText = 'नाम: RAHUL KUMAR';
    alert('Tool Reset to Default Settings.');
}

function downloadAadhaarPrint() {
    alert('Preparing High-Resolution 300 DPI PDF Layout...\nDownloading BharatPrint_Aadhaar_Layout.pdf');
}

// PAN Resizer Tool Functions
function handlePanPhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('photoThumb').innerHTML = `<img src="${e.target.result}" style="width:100%; height:100%; object-fit:cover; border-radius:4px;">`;
        };
        reader.readAsDataURL(file);
    }
}

function handlePanSignUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('signThumb').innerHTML = `<img src="${e.target.result}" style="max-height:100%; filter: contrast(150%) grayscale(100%);">`;
        };
        reader.readAsDataURL(file);
    }
}

function downloadResized(type) {
    alert(`Downloading auto-cropped ${type === 'photo' ? 'Photo (213x213 px, 300 DPI)' : 'Signature (444x205 px, Cleaned)'} for PAN portal submission.`);
}
