import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://portfolio-ivory-phi-92.vercel.app/";

  const routes = ["", "/about", "/projects", "/reviews", "/contact"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  const locales = ["uk", "en"]; // ваші локалі
  const localizedRoutes = locales.flatMap((locale) =>
    ["", "/about", "/projects", "/reviews", "/contact"].map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 0.9 : 0.7,
    }))
  );

  return [...routes, ...localizedRoutes];
}
