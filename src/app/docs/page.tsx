import type { Metadata } from "next"
import IntroductionContent from "./introduction.mdx"

export const metadata: Metadata = {
  title: "Introduction - NeuroLab Documentation",
  description: "Welcome to the NeuroLab documentation. Learn how to build powerful neurotechnology applications.",
}

export default function DocsPage() {
  return <IntroductionContent />
}
