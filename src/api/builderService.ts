import { supabase } from '@/lib/supabase';

export interface SiteConfig {
  hero: string;
  features: string;
  contact: string;
  // Tambahkan field lain jika ada struktur baru
}

export async function getSiteConfig(siteId: string): Promise<SiteConfig> {
  const { data, error } = await supabase.from('sites').select('config').eq('id', siteId).single();
  if (error) throw error;
  // Jika config null, fallback ke struktur kosong
  return data?.config || { hero: '', features: '', contact: '' };
}

export async function updateSiteConfig(siteId: string, config: SiteConfig): Promise<void> {
  const { error } = await supabase.from('sites').update({ config }).eq('id', siteId);
  if (error) throw error;
}
