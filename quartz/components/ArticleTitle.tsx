import { ArticleTitle as CommunityArticleTitle } from "@quartz-community/article-title";
import { classNames } from "../util/lang";
import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "./types";

const Title = CommunityArticleTitle() as QuartzComponent;

const ArticleTitle: QuartzComponent = (props: QuartzComponentProps) => {
  const { title, aliases = [] } = props.fileData.frontmatter ?? {};
  if (!title) return null;

  const slug = props.fileData.slug;
  const isIndex = slug === "index" || slug?.endsWith("/index");
  const titleWithoutQualifier = title.replace(/\s*\([^()]*\)\s*$/, "").trim();
  const otherNames = isIndex
    ? []
    : [...new Set(aliases.map((alias) => alias.trim()))].filter(
        (alias) =>
          alias && alias !== title.trim() && alias !== titleWithoutQualifier,
      );

  return (
    <>
      <Title {...props} />
      {otherNames.length > 0 && (
        <p class={classNames(props.displayClass, "article-aliases")}>
          Інші назви: {otherNames.join(", ")}
        </p>
      )}
    </>
  );
};

ArticleTitle.css = `${Title.css ?? ""}
.article-aliases {
  margin: 0.5rem 0 0;
  color: color-mix(in srgb, var(--darkgray) 80%, var(--light));
  line-height: 1.5;
  overflow-wrap: anywhere;
}
`;

export default (() => ArticleTitle) satisfies QuartzComponentConstructor;
