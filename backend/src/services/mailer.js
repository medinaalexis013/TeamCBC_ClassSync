export async function sendPasswordResetEmail(toEmail, resetLink) {
    console.log(`[DEV EMAIL] To: ${toEmail}\nReset your password using the following link: ${resetLink}`);
    return true;
}