import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface SiteRow {
  id: string;
  user_id: string;
  slug: string;
  template: string;
  name: string;
  config?: Record<string, unknown>;
  updated_at?: string;
}

export async function fetchUserSites(userId: string) {
  const { data, error } = await supabase
    .from("sites")
    .select("id, user_id, slug, template, name, config, updated_at")
    .eq("user_id", userId);
  if (error) throw error;
  return (data || []).map((d: SiteRow) => ({
    id: d.id,
    user_id: d.user_id,
    slug: d.slug,
    template: d.template,
    name: d.name,
    config: d.config ?? {},
    lastEdit: d.updated_at || "-",
  }));
}

export function useUserSites(userId: string | undefined) {
  return useQuery({
    queryKey: ["sites", userId],
    queryFn: () => fetchUserSites(userId!),
    enabled: !!userId,
    refetchInterval: 5000, // 5 detik
  });
}
