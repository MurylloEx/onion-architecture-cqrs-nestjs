export function getPermissionsFromNumber(role: number, keys: string[]): string[] {
  return keys
    .map((perm, k) => (role & 2**k) ? perm : '')
    .filter(entry => entry);
}

export function getNumberFromPermissions(roles: string[], keys: string[]): number {
  return roles.map(v => {
    const k = keys.indexOf(v.toLowerCase());
    return k == -1 ? 0 : 2**k;
  }).reduce((a, b) => a + b);
}
