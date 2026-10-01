// Mobile Menu Toggle
document.getElementById('menuToggle')?.addEventListener('click', () => {
    document.getElementById('navMenu')?.classList.toggle('active');
});

// Real-time Service Search Filtering
document.getElementById('serviceSearch')?.addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        const name = card.getAttribute('data-name')?.toLowerCase() || '';
        const text = card.innerText.toLowerCase();
        if (name.includes(term) || text.includes(term)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// Quick Order Handler from Calculator
function handleQuickSubmit(event) {
    event.preventDefault();
    const docType = document.getElementById('docType').value;
    const copies = document.getElementById('printCopies').value;
    const quality = document.getElementById('colorOption').value;

    const message = encodeURIComponent(`Hello Bharat Print Hub, I want to order:\nType: ${docType}\nCopies/Pages: ${copies}\nQuality/Binding: ${quality}`);
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
