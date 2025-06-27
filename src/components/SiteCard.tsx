import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";
import type { Site } from "@/api/site";

export default function SiteCard({ site }: { site: Site & { lastEdit?: string } }) {
  return (
    <div className="bg-muted rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-dashed border-primary/30">
      <div className="flex-1">
        <div className="font-semibold text-primary mb-1 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          {site.name} <span className="text-xs bg-green-100 text-green-700 rounded px-2 py-0.5 ml-2">Online</span>
        </div>
        <div className="text-sm text-muted-foreground mb-1">URL: <span className="font-mono text-primary">{site.slug ? `siapluncur.id/${site.slug}` : ''}</span></div>
        <div className="text-xs text-muted-foreground">Dibuat: {site.created_at ? new Date(site.created_at).toLocaleDateString() : '-'}</div>
        <div className="text-xs text-muted-foreground">Terakhir diedit: {site.lastEdit ?? '-'}</div>
      </div>
      <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:items-center md:justify-end">
        <Link href={`/builder/${site.id}`}>
          <Button size="sm" variant="outline" className="border-cyan-600 text-cyan-700 mr-0 md:mr-2 flex items-center gap-1">
            <Pencil size={16} /> Edit
          </Button>
        </Link>
        <Link href={`/preview/${site.slug}`} target="_blank">
          <Button size="sm" className="bg-gradient-to-r from-primary to-blue-500 text-white font-semibold ml-0 md:ml-2 flex items-center gap-1">
            <Eye size={16} /> Preview
          </Button>
        </Link>
      </div>
    </div>
  );
}
