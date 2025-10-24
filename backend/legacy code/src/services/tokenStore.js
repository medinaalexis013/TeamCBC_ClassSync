const tokens = new Map();

export function saveResetToken(token, userId, ttlMinutes = 30) {
    const expiresAt = Date.now() + ttlMinutes * 60 * 1000;
    tokens.set(token, {userID, expiresAt, used: false});

}

export function useResetToken(token) {
    const rec = tokens.get(token);
    if (!rec) return {ok: false, reason: 'invalid'};
    if (rec.used) return {ok: false, reason: 'already used'};
    if (Date.now() > rec.expiresAt()) {
        tokens.delete(token);
        return {ok: false, reason: 'expired'};
    }

    rec.used = true;
    tokens.set(token, rec);
    return {ok: true, userId: rec.userId};
}

export function peekToken(token) {
    const rec = tokens.get(token);
    if (!rec) return {ok: false, reason: 'invalid'};
    if (rec.used) return {ok: false, reason: 'already used'};
    if (Date.now() > rec.expiresAt) return {ok: false, reason: 'expired'};
    return {ok: true};
}