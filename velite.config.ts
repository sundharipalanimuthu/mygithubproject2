import { defineCollection, defineConfig, s } from "velite";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

const computedFields = <T extends { link: string }>(data: T) => ({
  ...data,
  slugAsParams: data.link.split("/").slice(1).join("/"),
});

const blogs = defineCollection({
  name: "Blog",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
        link: s.path(), 

        tag: s.string(),
        title: s.string().max(99),
        discription: s.string().max(999), 
        date: s.isodate(),
        published: s.boolean().default(true),
        thumbnail: s.string().max(99),
        author: s.string(),
        body: s.mdx(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: "./content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[text]",
    clean: true,
  },
  collections: { blogs },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, {
        theme: "dracula",
        defaultLang: "ts",
        keepBackground: true,
        grid: true,
      }],

    ],
  },
});
