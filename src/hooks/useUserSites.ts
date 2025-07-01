import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export async function fetchUserSites(userId: string) {
  const { data, error } = await supabase
    .from("sites")
    .select("id, user_id, slug, template, name, config, updated_at")
    .eq("user_id", userId);
  if (error) throw error;
  return (data || []).map((d: any) => ({
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
