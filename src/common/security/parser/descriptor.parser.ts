export function parseDescriptor(role: number, access: Record<string, string>): string[] {
  return Object.values(access)
    .map((perm, k) => (role & 2**k) ? perm : '')
    .filter(entry => entry);
}

export function createDescriptor(roles: string[], access: Record<string, string>): number {
  return roles.map(v => {
    const k = Object.values(access).indexOf(v.toLowerCase());
    return k == -1 ? 0 : 2**k;
  }).reduce((a, b) => a + b);
}
