import { ImageResponse } from "next/og";
import { getProject, getProjects } from "@/lib/content";

export const runtime = "nodejs";
export const alt = "Hoskey Production Case Study";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  const title = project?.title ?? "Case Study — Hoskey Production";
  const category = project?.categories.join(" · ") ?? "Broadcast & Media Production";
  const year = project?.date ? project.date.slice(0, 4) : "2025";
  const client = project?.clientVisible && project?.client ? `Client: ${project.client}` : "Hoskey Production Archive";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "rgb(10, 11, 16)",
          color: "rgb(250, 248, 245)",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top Header: Logo lockup + Category */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "12px",
                height: "12px",
                borderRadius: "6px",
                backgroundColor: "rgb(204, 30, 39)",
                marginRight: "12px",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: "24px",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "rgb(250, 248, 245)",
              }}
            >
              HOSKEY
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "14px",
                fontFamily: "monospace",
                letterSpacing: "0.28em",
                color: "rgba(250,248,245,0.6)",
                marginLeft: "8px",
              }}
            >
              PRODUCTION
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: "monospace",
              fontSize: "16px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgb(204, 30, 39)",
              fontWeight: 700,
            }}
          >
            {category}
          </div>
        </div>

        {/* Center: Case Study Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "950px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "monospace",
              fontSize: "16px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(250,248,245,0.6)",
              marginBottom: "16px",
            }}
          >
            {client} · {year}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "56px",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "rgb(250, 248, 245)",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom Footer: Location & Tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "monospace",
              fontSize: "15px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(250,248,245,0.7)",
            }}
          >
            Broadcast · Documentary · Commercial · Ghana
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: "monospace",
              fontSize: "15px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgb(204, 30, 39)",
            }}
          >
            hoskeyproduction.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
