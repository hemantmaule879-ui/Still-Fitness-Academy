import { cookies } from 'next/headers';

const SESSION_TOKEN = 'StillFitnessAdminSession2026';

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  return token === SESSION_TOKEN;
}
