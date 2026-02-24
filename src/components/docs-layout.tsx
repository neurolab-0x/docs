import { DocsSidebar } from "@/components/docs-sidebar"
import { SiteHeader } from "@/components/site-header"

interface DocsLayoutProps {
  children: React.ReactNode
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex-1">
        <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <DocsSidebar />
          <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
            <div className="mx-auto w-full min-w-0">
              {children}
            </div>
            <div className="hidden text-sm xl:block">
              <div className="sticky top-16 -mt-10 pt-4">
                <div className="space-y-2">
                  <p className="font-medium">On This Page</p>
                  {/* Table of contents will be generated here */}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
