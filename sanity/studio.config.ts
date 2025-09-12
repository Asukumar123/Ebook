import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemaTypes"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: "default",
  title: "EduHansa CMS",
  projectId,
  dataset,
  basePath: "/admin/studio",
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Books").child(S.documentTypeList("book").title("Books")),
            S.listItem().title("Blog Posts").child(S.documentTypeList("post").title("Blog Posts")),
            S.listItem().title("Authors").child(S.documentTypeList("author").title("Authors")),
            S.listItem().title("Categories").child(S.documentTypeList("category").title("Categories")),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
